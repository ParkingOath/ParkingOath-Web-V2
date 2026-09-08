#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { initializeApp as initializeAdmin } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, deleteApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";

for (const name of ["FIREBASE_AUTH_EMULATOR_HOST", "FIRESTORE_EMULATOR_HOST", "FUNCTIONS_EMULATOR_HOST"]) {
  if (!process.env[name]) throw new Error(`${name} is required; refusing non-emulator integration testing.`);
}
const projectId = process.env.GCLOUD_PROJECT || "demo-parkingoath-ambassadors";
const website = process.env.WEBSITE_TEST_URL || "http://127.0.0.1:3100";
const password = "Synthetic-only-password-123!";
const adminApp = initializeAdmin({ projectId }, `website-integration-${Date.now()}`);
const adminAuth = getAdminAuth(adminApp);
const db = getFirestore(adminApp);
const clientApps = [];
let passed = 0;

async function check(name, action) {
  await action();
  passed += 1;
  process.stdout.write(`ok ${passed} - ${name}\n`);
}

async function client(uid, email, claims = {}) {
  try { await adminAuth.getUser(uid); await adminAuth.updateUser(uid, { password, email, emailVerified: true }); }
  catch { await adminAuth.createUser({ uid, email, password, emailVerified: true }); }
  await adminAuth.setCustomUserClaims(uid, claims);
  const app = initializeApp({ apiKey: "fake-api-key", authDomain: "localhost", projectId }, `website-client-${uid}-${Date.now()}`);
  clientApps.push(app);
  const auth = getAuth(app);
  connectAuthEmulator(auth, `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`, { disableWarnings: true });
  await signInWithEmailAndPassword(auth, email, password);
  await auth.currentUser.getIdToken(true);
  const functions = getFunctions(app, "us-central1");
  const [host, port] = process.env.FUNCTIONS_EMULATOR_HOST.split(":");
  connectFunctionsEmulator(functions, host, Number(port));
  return { auth, call: (name, data) => httpsCallable(functions, name)(data) };
}

async function websiteSession(auth) {
  const response = await fetch(`${website}/api/auth/session`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ idToken: await auth.currentUser.getIdToken(true) }),
  });
  assert.equal(response.status, 200);
  const cookie = response.headers.get("set-cookie");
  assert.match(cookie || "", /parkingoath_partner_session=/);
  return cookie.split(";")[0];
}

async function page(path, cookie) {
  return fetch(`${website}${path}`, { headers: cookie ? { cookie } : {}, redirect: "manual" });
}

async function adminApi(action, input, cookie) {
  const response = await fetch(`${website}/api/admin/ambassador-actions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify({ action, input }),
  });
  const body = await response.json();
  return { response, body };
}

const admin = await client("fixture-admin", "admin@example.test", { admin: true });
const user = await client("fixture-user", "user@example.test", {});
const ambassador = await client("fixture-ambassador-a", "ambassador-a@example.test", {});
const unmapped = await client("fixture-unmapped", "unmapped@example.test", {});
const adminCookie = await websiteSession(admin.auth);
const userCookie = await websiteSession(user.auth);
const ambassadorCookie = await websiteSession(ambassador.auth);
const unmappedCookie = await websiteSession(unmapped.auth);

await check("website Ambassador form creates one pending application per email", async () => {
  const invalidResponse = await fetch(`${website}/api/hubspot/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pageName: "Ambassador interest", email: "invalid" }),
  });
  assert.equal(invalidResponse.status, 400);
  const payload = {
    firstName: "Website",
    lastName: "Applicant",
    email: "website-applicant@example.test",
    phone: "+61 400 000 000",
    message: "Synthetic emulator application",
    pageName: "Ambassador interest",
  };
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(`${website}/api/hubspot/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(response.status, 200);
  }
  const applications = await db.collection("ambassadors")
    .where("email", "==", "website-applicant@example.test")
    .get();
  assert.equal(applications.size, 1);
  const application = applications.docs[0].data();
  assert.equal(application.displayName, "Website Applicant");
  assert.equal(application.status, "pending");
  assert.equal(application.referralCode, null);
  assert.equal(application.applicationSource, "website_ambassador_interest");
});

await check("unauthenticated private pages redirect", async () => {
  assert.equal((await page("/admin")).status, 307);
  assert.equal((await page("/partners")).status, 307);
});
await check("admin session loads admin", async () => assert.equal((await page("/admin", adminCookie)).status, 200));
await check("normal user is denied admin and partners", async () => {
  assert.equal((await page("/admin", userCookie)).status, 307);
  assert.equal((await page("/partners", userCookie)).status, 307);
});
await check("active Ambassador loads own dashboard and not admin", async () => {
  const response = await page("/partners", ambassadorCookie);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AMB-A/);
  assert.match(html, /3(?:<!-- -->)? paid bookings/);
  assert.match(html, /Refund adjustment/);
  assert.match(html, /\$22\.36/);
  assert.equal((await page("/admin", ambassadorCookie)).status, 307);
});
await check("unmapped authenticated user has no private access", async () => {
  assert.equal((await page("/partners", unmappedCookie)).status, 307);
  assert.equal((await page("/admin", unmappedCookie)).status, 307);
});
await check("partner sign-in email endpoint is generic and restricted to approved users", async () => {
  for (const email of ["ambassador-a@example.test", "unknown@example.test"]) {
    const response = await fetch(`${website}/api/auth/email-link`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
  }
  const approvedHash = createHash("sha256").update("ambassador-a@example.test").digest("hex");
  const unknownHash = createHash("sha256").update("unknown@example.test").digest("hex");
  assert.equal((await db.doc(`partnerLoginEmailRequests/${approvedHash}`).get()).exists, true);
  assert.equal((await db.doc(`partnerLoginEmailRequests/${unknownHash}`).get()).exists, false);
});
await check("payout statement ownership is enforced", async () => {
  const own = await page("/partners/payouts/fixture-pending-run", ambassadorCookie);
  assert.equal(own.status, 200);
  const html = await own.text();
  assert.match(html, /Refund adjustment/);
  assert.match(html, /-\$1\.00/);
  assert.equal((await page("/partners/payouts/fixture-b-run", ambassadorCookie)).status, 404);
});
await check("referral route captures an active code and preserves first touch", async () => {
  const first = await page("/r/AMB-A");
  assert.equal(first.status, 303);
  assert.equal(new URL(first.headers.get("location")).pathname, "/hosts");
  const setCookie = first.headers.get("set-cookie") || "";
  assert.match(setCookie, /parkingoath_referral=/);
  assert.match(setCookie, /HttpOnly/i);
  const referralCookie = setCookie.split(";")[0];
  const second = await page("/r/AMB-B", referralCookie);
  assert.equal(second.status, 303);
  assert.equal(second.headers.get("set-cookie"), null);
});
await check("unknown and malformed referral codes redirect without attribution", async () => {
  for (const code of ["UNKNOWN", "%20%20%20"]) {
    const response = await page(`/r/${code}`);
    assert.equal(response.status, 303);
    assert.equal(new URL(response.headers.get("location")).pathname, "/hosts");
    assert.equal(response.headers.get("set-cookie"), null);
  }
});
await check("normal and Ambassador tokens are rejected by every admin callable", async () => {
  for (const actor of [user, ambassador]) for (const [name, data] of [
    ["approveAmbassador", { ambassadorId: "pending-ambassador" }],
    ["setAmbassadorPayoutDetails", { ambassadorId: "ambassador-a", accountName: "Test", bsb: "123456", accountNumber: "12345678" }],
    ["markAmbassadorPayoutPaid", { payoutRunId: "fixture-pending-run", paymentReference: "DENIED" }],
  ]) await assert.rejects(actor.call(name, data), (error) => error?.code === "functions/permission-denied");
});
await check("website admin API rejects missing, normal-user and Ambassador sessions", async () => {
  for (const cookie of [undefined, userCookie, ambassadorCookie]) {
    const { response } = await adminApi(
      "approveAmbassador",
      { ambassadorId: "pending-ambassador" },
      cookie,
    );
    assert.equal(response.status, 403);
  }
});
await check("website admin approval is canonical and idempotent", async () => {
  const firstResponse = await adminApi(
    "approveAmbassador",
    { ambassadorId: "pending-ambassador" },
    adminCookie,
  );
  const secondResponse = await adminApi(
    "approveAmbassador",
    { ambassadorId: "pending-ambassador" },
    adminCookie,
  );
  assert.equal(firstResponse.response.status, 200);
  assert.equal(secondResponse.response.status, 200);
  const first = firstResponse.body.result;
  const second = secondResponse.body.result;
  assert.equal(first.status, "active"); assert.equal(second.referralCode, first.referralCode);
  assert.equal(first.signInEmailSent, true); assert.equal(second.signInEmailSent, true);
  assert.match(first.referralLink, /^https:\/\/parkingoath\.com\.au\/r\//);
  const approved = (await db.doc("ambassadors/pending-ambassador").get()).data();
  assert.equal((await db.doc(`ambassadorAuthUids/${approved.authUid}`).get()).data().ambassadorId, "pending-ambassador");
  assert.equal((await adminAuth.getUserByEmail("pending@example.test")).uid, approved.authUid);
});
await check("website admin stores synthetic payout details without response leakage", async () => {
  const action = await adminApi(
    "setAmbassadorPayoutDetails",
    { ambassadorId: "ambassador-b", accountName: "Test Ambassador", bsb: "123-456", accountNumber: "12345678" },
    adminCookie,
  );
  assert.equal(action.response.status, 200);
  const result = action.body.result;
  assert.equal(result.payoutsEnabled, true); assert.equal("accountNumber" in result, false);
  assert.equal((await db.doc("ambassadors/ambassador-b/private/payout").get()).data().accountNumber, "12345678");
  assert.equal((await db.doc("ambassadors/ambassador-b").get()).data().payoutsEnabled, true);
});
await check("website admin marks payout paid without changing amounts and retry is idempotent", async () => {
  const before = await Promise.all(["service-fixture", "onboarding-fixture", "refund-fixture"].map((id) => db.doc(`ledgerEntries/${id}`).get()));
  const firstResponse = await adminApi(
    "markAmbassadorPayoutPaid",
    { payoutRunId: "fixture-pending-run", paymentReference: "FAKE-WEBSITE-PAID" },
    adminCookie,
  );
  const secondResponse = await adminApi(
    "markAmbassadorPayoutPaid",
    { payoutRunId: "fixture-pending-run", paymentReference: "FAKE-WEBSITE-PAID" },
    adminCookie,
  );
  assert.equal(firstResponse.response.status, 200);
  assert.equal(secondResponse.response.status, 200);
  const first = firstResponse.body.result;
  const second = secondResponse.body.result;
  assert.equal(first.idempotent, false); assert.equal(second.idempotent, true);
  const run = (await db.doc("payoutRuns/fixture-pending-run").get()).data();
  assert.equal(run.status, "paid"); assert.equal(run.paymentReference, "FAKE-WEBSITE-PAID"); assert.equal(run.paidByAdminUid, "fixture-admin"); assert.ok(run.paidAt);
  const after = await Promise.all(before.map((entry) => db.doc(`ledgerEntries/${entry.id}`).get()));
  after.forEach((entry, index) => { assert.equal(entry.data().status, "paid"); assert.equal(entry.data().amountCents, before[index].data().amountCents); assert.equal(entry.data().payoutRunId, "fixture-pending-run"); });
});
await check("malformed sessions remain denied", async () => {
  assert.equal((await page("/admin", "parkingoath_partner_session=malformed")).status, 307);
});
await check("revoked admin sessions are rejected", async () => {
  const revokedAdmin = await client("fixture-revoked-admin", "revoked-admin@example.test", { admin: true });
  const cookie = await websiteSession(revokedAdmin.auth);
  assert.equal((await page("/admin", cookie)).status, 200);
  await new Promise((resolve) => setTimeout(resolve, 1100));
  await adminAuth.revokeRefreshTokens("fixture-revoked-admin");
  assert.equal((await page("/admin", cookie)).status, 307);
});

await Promise.all(clientApps.map(deleteApp));
process.stdout.write(`1..${passed}\n${passed} website/emulator integration checks passed.\n`);
