import "server-only";

import { randomBytes } from "node:crypto";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { sendWebsiteSignInLink } from "@/lib/partner-sign-in";

const REFERRAL_BASE_URL = "https://parkingoath.com.au";
const MAX_REFERRAL_CODE_ATTEMPTS = 8;
const MAX_PAYOUT_ENTRIES = 450;

function asNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function normalizeReferralCode(value: unknown): string {
  const normalized = asNonEmptyString(value).toUpperCase();
  return /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(normalized) && normalized.length <= 40
    ? normalized
    : "";
}

function generateReferralCode(displayName: unknown): string {
  const base =
    asNonEmptyString(displayName).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) ||
    "AMB";
  return `${base}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

async function linkAmbassadorAuthUid(ambassadorId: string, authUid: string) {
  const db = await getAdminDb();
  const ambassadorRef = db.collection("ambassadors").doc(ambassadorId);
  const authUidRef = db.collection("ambassadorAuthUids").doc(authUid);
  await db.runTransaction(async (transaction) => {
    const [ambassador, reservation] = await Promise.all([
      transaction.get(ambassadorRef),
      transaction.get(authUidRef),
    ]);
    if (!ambassador.exists) throw new Error("Ambassador was not found.");

    const currentAuthUid = asNonEmptyString(ambassador.data()?.authUid);
    if (currentAuthUid && currentAuthUid !== authUid) {
      throw new Error("Ambassador is already linked to another Auth UID.");
    }
    if (reservation.exists && reservation.data()?.ambassadorId !== ambassadorId) {
      throw new Error("Auth UID is already linked to another Ambassador.");
    }
    if (!reservation.exists) {
      transaction.create(authUidRef, {
        ambassadorId,
        authUid,
        createdAt: FieldValue.serverTimestamp(),
      });
    }
    if (!currentAuthUid) transaction.update(ambassadorRef, { authUid });
  });
}

async function issueReferralCode(ambassadorId: string, adminUid: string) {
  const db = await getAdminDb();
  const ambassadorRef = db.collection("ambassadors").doc(ambassadorId);

  for (let attempt = 0; attempt < MAX_REFERRAL_CODE_ATTEMPTS; attempt += 1) {
    const initial = await ambassadorRef.get();
    if (!initial.exists) throw new Error("Ambassador was not found.");
    const initialData = initial.data() ?? {};
    const existingCode = normalizeReferralCode(initialData.referralCode);
    if (initialData.status === "active" && existingCode) return existingCode;
    if (initialData.status !== "pending") {
      throw new Error(
        `Ambassador status ${asNonEmptyString(initialData.status) || "unknown"} cannot be approved.`,
      );
    }

    const candidate = generateReferralCode(initialData.displayName);
    const codeRef = db.collection("ambassadorReferralCodes").doc(candidate);
    const reserved = await db.runTransaction(async (transaction) => {
      const [freshAmbassador, codeReservation] = await Promise.all([
        transaction.get(ambassadorRef),
        transaction.get(codeRef),
      ]);
      if (!freshAmbassador.exists) throw new Error("Ambassador was not found.");
      const freshData = freshAmbassador.data() ?? {};
      const freshCode = normalizeReferralCode(freshData.referralCode);
      if (freshData.status === "active" && freshCode) return freshCode;
      if (freshData.status !== "pending") {
        throw new Error(
          `Ambassador status ${asNonEmptyString(freshData.status) || "unknown"} cannot be approved.`,
        );
      }
      if (codeReservation.exists) return null;

      transaction.create(codeRef, {
        ambassadorId,
        referralCode: candidate,
        createdAt: FieldValue.serverTimestamp(),
      });
      transaction.update(ambassadorRef, {
        status: "active",
        referralCode: candidate,
        referralLink: `${REFERRAL_BASE_URL}/r/${candidate}`,
        approvedAt: FieldValue.serverTimestamp(),
        approvedByAdminUid: adminUid,
      });
      return candidate;
    });
    if (reserved) return reserved;
  }

  throw new Error(
    `Unable to issue a unique referral code after ${MAX_REFERRAL_CODE_ATTEMPTS} attempts.`,
  );
}

export async function approveAmbassador(ambassadorIdValue: unknown, adminUid: string) {
  const ambassadorId = asNonEmptyString(ambassadorIdValue);
  if (!ambassadorId) throw new Error("Ambassador ID is required.");

  const db = await getAdminDb();
  const auth = await getAdminAuth();
  const ambassadorRef = db.collection("ambassadors").doc(ambassadorId);
  const ambassador = await ambassadorRef.get();
  if (!ambassador.exists) throw new Error("Ambassador was not found.");
  const email = asNonEmptyString(ambassador.data()?.email).toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Ambassador email is invalid.");

  let authUser;
  try {
    authUser = await auth.getUserByEmail(email);
  } catch (error) {
    if ((error as { code?: string }).code !== "auth/user-not-found") throw error;
    authUser = await auth.createUser({
      email,
      emailVerified: false,
      disabled: false,
    });
  }

  await linkAmbassadorAuthUid(ambassadorId, authUser.uid);
  const referralCode = await issueReferralCode(ambassadorId, adminUid);
  const approved = await ambassadorRef.get();
  const approvedData = approved.data();
  const referralLink = asNonEmptyString(approvedData?.referralLink);
  let signInEmailSent = false;
  try {
    const emailResult = await sendWebsiteSignInLink({
      auth,
      email,
      displayName: asNonEmptyString(approvedData?.displayName),
      purpose: "approval",
      referralLink,
      idempotencyKey: `ambassador-approval-${ambassadorId}`,
    });
    signInEmailSent = emailResult.ok;
    if (!emailResult.ok) {
      console.error("Ambassador was approved but the sign-in email was rejected", {
        ambassadorId,
        status: emailResult.status,
        message: emailResult.message,
      });
    }
  } catch (error) {
    console.error("Ambassador was approved but the sign-in email could not be generated", {
      ambassadorId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
  return {
    ambassadorId,
    status: asNonEmptyString(approvedData?.status),
    referralCode,
    referralLink,
    signInEmailSent,
  };
}

function normalizePayoutDetails(input: Record<string, unknown>) {
  const accountName = asNonEmptyString(input.accountName);
  const bsb = asNonEmptyString(input.bsb).replace(/[\s-]/g, "");
  const accountNumber = asNonEmptyString(input.accountNumber).replace(/[\s-]/g, "");
  if (!accountName || accountName.length > 100) {
    throw new Error("Account name must contain between 1 and 100 characters.");
  }
  if (!/^\d{6}$/.test(bsb)) throw new Error("BSB must contain exactly 6 digits.");
  if (!/^\d{5,10}$/.test(accountNumber)) {
    throw new Error("Account number must contain between 5 and 10 digits.");
  }
  return { accountName, bsb, accountNumber };
}

export async function setAmbassadorPayoutDetails(
  input: Record<string, unknown>,
  adminUid: string,
) {
  const ambassadorId = asNonEmptyString(input.ambassadorId);
  if (!ambassadorId) throw new Error("Ambassador ID is required.");
  const details = normalizePayoutDetails(input);
  const db = await getAdminDb();
  const ambassadorRef = db.collection("ambassadors").doc(ambassadorId);
  const payoutRef = ambassadorRef.collection("private").doc("payout");

  await db.runTransaction(async (transaction) => {
    const ambassador = await transaction.get(ambassadorRef);
    if (!ambassador.exists) throw new Error("Ambassador was not found.");
    transaction.set(payoutRef, {
      ...details,
      method: "manual_bank_transfer",
      collectedByAdminUid: adminUid,
      collectedAt: FieldValue.serverTimestamp(),
    });
    transaction.update(ambassadorRef, { payoutsEnabled: true });
  });

  return { ambassadorId, payoutsEnabled: true, method: "manual_bank_transfer" };
}

export async function markAmbassadorPayoutPaid(
  input: Record<string, unknown>,
  adminUid: string,
) {
  const payoutRunId = asNonEmptyString(input.payoutRunId);
  const paymentReference = asNonEmptyString(input.paymentReference);
  if (!payoutRunId) throw new Error("Payout run ID is required.");
  if (!paymentReference || paymentReference.length > 120) {
    throw new Error("Payment reference must contain between 1 and 120 characters.");
  }

  const db = await getAdminDb();
  const runRef = db.collection("payoutRuns").doc(payoutRunId);
  return db.runTransaction(async (transaction) => {
    const run = await transaction.get(runRef);
    if (!run.exists) throw new Error("Payout run was not found.");
    const runData = run.data() ?? {};
    if (runData.status === "paid") {
      return { paid: true, idempotent: true, payoutRunId };
    }
    if (runData.status !== "pending" || !asNonEmptyString(runData.ambassadorId)) {
      throw new Error("Payout run is not in a payable state.");
    }
    if (!Array.isArray(runData.entryIds) || runData.entryIds.length === 0) {
      throw new Error("Payout run has no ledger entries.");
    }
    if (runData.entryIds.length > MAX_PAYOUT_ENTRIES) {
      throw new Error("Payout run requires manual review.");
    }

    const entryIds = [...new Set(runData.entryIds.map(asNonEmptyString))];
    if (entryIds.length !== runData.entryIds.length || entryIds.some((id) => !id)) {
      throw new Error("Payout run contains invalid ledger entry IDs.");
    }
    const entries = await Promise.all(
      entryIds.map((id) => transaction.get(db.collection("ledgerEntries").doc(id))),
    );
    for (const entry of entries) {
      const data = entry.data() ?? {};
      if (
        !entry.exists ||
        data.ambassadorId !== runData.ambassadorId ||
        data.payoutRunId !== payoutRunId ||
        data.status !== "accrued"
      ) {
        throw new Error("Payout run ledger consistency check failed.");
      }
    }

    transaction.update(runRef, {
      status: "paid",
      paymentReference,
      paidByAdminUid: adminUid,
      paidAt: FieldValue.serverTimestamp(),
    });
    entries.forEach((entry) => transaction.update(entry.ref, { status: "paid" }));
    return { paid: true, idempotent: false, payoutRunId };
  });
}
