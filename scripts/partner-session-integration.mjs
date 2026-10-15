import assert from "node:assert/strict";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = "demo-parkingoath-ambassadors";
const website = process.env.WEBSITE_TEST_URL || "http://127.0.0.1:3100";
for (const name of ["FIREBASE_AUTH_EMULATOR_HOST", "FIRESTORE_EMULATOR_HOST"]) {
  if (!/^(127\.0\.0\.1|localhost):\d+$/.test(process.env[name] || "")) throw new Error("Local emulators required");
}
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(website)) throw new Error("Local website required");
const app = initializeApp({ projectId }, "portal-login-integration");
const auth = getAuth(app);
const db = getFirestore(app);
const password = "Local-only-test-password-123!";
let passed = 0;
async function check(label, run) { await run(); console.log(`ok ${++passed} - ${label}`); }
async function identity(uid, email, admin = false) {
  try { await auth.getUser(uid); await auth.updateUser(uid, { password, disabled: false }); }
  catch { await auth.createUser({ uid, email, password, emailVerified: true }); }
  await auth.setCustomUserClaims(uid, admin ? { admin: true } : {});
  const r = await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-key`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const body = await r.json();
  assert.equal(r.status, 200);
  return body.idToken;
}
async function session(token) {
  return fetch(`${website}/api/auth/session`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ idToken: token }) });
}
async function get(path, cookie) { return fetch(website + path, { redirect: "manual", headers: cookie ? { cookie } : {} }); }
const adminToken = await identity("portal-admin", "portal-admin@example.test", true);
const partnerToken = await identity("portal-partner", "portal-partner@example.test");
const ordinaryToken = await identity("portal-ordinary", "portal-ordinary@example.test");
await db.doc("ambassadorAuthUids/portal-partner").set({ ambassadorId: "portal-ambassador" });
await db.doc("ambassadors/portal-ambassador").set({ status: "active", displayName: "Portal Test", email: "portal-partner@example.test", referralCode: "PORTAL-TEST" });
await check("missing website cookie is 401 and never cached", async () => {
  const r = await get("/api/auth/session"); assert.equal(r.status, 401); assert.match(r.headers.get("cache-control"), /no-store/);
});
await check("malformed token is rejected", async () => { assert.equal((await session("invalid")).status, 401); });
await check("missing token is 400", async () => { assert.equal((await session(null)).status, 400); });
await check("unapproved user is 403, without a cookie", async () => {
  const r = await session(ordinaryToken); assert.equal(r.status, 403); assert.equal(r.headers.get("set-cookie"), null);
});
let adminCookie, partnerCookie;
for (const [name, token, destination] of [["admin", adminToken, "/admin"], ["partner", partnerToken, "/partners"]]) {
  await check(`${name} login sets secure session properties and correct destination`, async () => {
    const r = await session(token); assert.equal(r.status, 200);
    assert.equal((await r.json()).destination, destination);
    const header = r.headers.get("set-cookie"); assert.match(header, /HttpOnly/i); assert.match(header, /SameSite=lax/i);
    const cookie = header.split(";")[0];
    if (name === "admin") adminCookie = cookie; else partnerCookie = cookie;
    const verified = await get("/api/auth/session", cookie); assert.equal(verified.status, 200);
    assert.equal((await verified.json()).destination, destination);
    const page = await get(destination, cookie); assert.equal(page.status, 200);
    assert.doesNotMatch(await page.text(), /NEXT_HTTP_ERROR_FALLBACK|Unable to load your portal/);
  });
}
await check("Ambassador cannot enter admin dashboard", async () => {
  const r = await get("/admin", partnerCookie); assert.equal(r.status, 307); assert.equal(r.headers.get("location"), "/partners");
});
await check("tampered session does not authenticate", async () => {
  assert.equal((await get("/api/auth/session", adminCookie + "tampered")).status, 401);
});
await check("deactivated Ambassador is denied even with an existing cookie", async () => {
  await db.doc("ambassadors/portal-ambassador").update({ status: "paused" });
  assert.equal((await get("/api/auth/session", partnerCookie)).status, 401);
});
await check("disabled admin is denied even with an existing cookie", async () => {
  await auth.updateUser("portal-admin", { disabled: true });
  assert.equal((await get("/api/auth/session", adminCookie)).status, 401);
});
console.log(`${passed} portal integration checks passed; local emulator data only.`);
await db.terminate();
