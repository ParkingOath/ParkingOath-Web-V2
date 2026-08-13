#!/usr/bin/env node

if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  throw new Error("Refusing to seed without both Firestore and Auth emulator hosts.");
}

const { initializeApp } = await import("firebase-admin/app");
const { getAuth } = await import("firebase-admin/auth");
const { getFirestore, Timestamp } = await import("firebase-admin/firestore");

initializeApp({ projectId: process.env.GCLOUD_PROJECT || "demo-parkingoath-ambassadors" });
const auth = getAuth(); const db = getFirestore();
const identities = [
  ["fixture-admin", "admin@example.test", { admin: true }],
  ["fixture-ambassador-a", "ambassador-a@example.test", {}],
  ["fixture-ambassador-b", "ambassador-b@example.test", {}],
  ["fixture-pending", "pending@example.test", {}],
  ["fixture-user", "user@example.test", {}],
];
for (const [uid, email, claims] of identities) {
  try { await auth.getUser(uid); } catch { await auth.createUser({ uid, email, emailVerified: true }); }
  await auth.setCustomUserClaims(uid, claims);
}

const now = Timestamp.fromDate(new Date("2026-08-01T00:00:00Z"));
const batch = db.batch();
for (const [id, data] of [
  ["ambassador-a", { displayName: "Ambassador A", email: "ambassador-a@example.test", authUid: "fixture-ambassador-a", status: "active", referralCode: "AMB-A", referralLink: "https://parkingoath.com.au/r/AMB-A", payoutsEnabled: true, createdAt: now }],
  ["ambassador-b", { displayName: "Ambassador B", email: "ambassador-b@example.test", authUid: "fixture-ambassador-b", status: "active", referralCode: "AMB-B", referralLink: "https://parkingoath.com.au/r/AMB-B", payoutsEnabled: false, createdAt: now }],
  ["pending-ambassador", { displayName: "Pending Ambassador", email: "pending@example.test", authUid: null, status: "pending", referralCode: null, referralLink: null, payoutsEnabled: false, createdAt: now }],
]) batch.set(db.collection("ambassadors").doc(id), data);
batch.set(db.doc("ambassadorAuthUids/fixture-ambassador-a"), { ambassadorId: "ambassador-a", authUid: "fixture-ambassador-a", createdAt: now });
batch.set(db.doc("ambassadorAuthUids/fixture-ambassador-b"), { ambassadorId: "ambassador-b", authUid: "fixture-ambassador-b", createdAt: now });
batch.set(db.doc("ambassadorReferralCodes/AMB-A"), { ambassadorId: "ambassador-a", referralCode: "AMB-A", createdAt: now });
batch.set(db.doc("ambassadorReferralCodes/AMB-B"), { ambassadorId: "ambassador-b", referralCode: "AMB-B", createdAt: now });
batch.set(db.doc("users/fixture-host-a"), { referredByAmbassadorId: "ambassador-a", paidBookingCount: 3, ambassadorOnboardingFeeAccrued: true });
for (const [id, amountCents, type] of [["service-fixture", 336, "service_fee"], ["onboarding-fixture", 2000, "onboarding_fee"], ["refund-fixture", -100, "service_fee"]]) {
  batch.set(db.collection("ledgerEntries").doc(id), { ambassadorId: "ambassador-a", amountCents, currency: "AUD", type, status: "accrued", payoutRunId: "fixture-pending-run", periodMonth: "2026-07", sourceHostId: "fixture-host-a", sourceBookingId: "fixture-booking", createdAt: now });
}
batch.set(db.doc("payoutRuns/fixture-pending-run"), { ambassadorId: "ambassador-a", periodMonth: "2026-07", totalAmountCents: 2236, entryIds: ["service-fixture", "onboarding-fixture", "refund-fixture"], paymentMethod: "manual_bank_transfer", paymentReference: null, paidByAdminUid: null, paidAt: null, status: "pending", createdAt: now });
batch.set(db.doc("payoutRuns/fixture-paid-run"), { ambassadorId: "ambassador-a", periodMonth: "2026-06", totalAmountCents: 1200, entryIds: [], paymentMethod: "manual_bank_transfer", paymentReference: "FAKE-PAID-REFERENCE", paidByAdminUid: "fixture-admin", paidAt: now, status: "paid", createdAt: now });
batch.set(db.doc("payoutRuns/fixture-b-run"), { ambassadorId: "ambassador-b", periodMonth: "2026-07", totalAmountCents: 1000, entryIds: [], paymentMethod: "manual_bank_transfer", paymentReference: null, paidByAdminUid: null, paidAt: null, status: "pending", createdAt: now });
batch.set(db.doc("ambassadors/ambassador-a/private/payout"), { accountName: "Synthetic Test Account", bsb: "123456", accountNumber: "12345678", method: "manual_bank_transfer", collectedByAdminUid: "fixture-admin", collectedAt: now });
await batch.commit();
process.stdout.write("Seeded local Auth and Firestore Ambassador fixtures.\n");
