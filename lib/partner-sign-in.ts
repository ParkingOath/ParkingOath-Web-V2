import "server-only";

import { createHash } from "node:crypto";

import type { Auth } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";

import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import {
  sendPartnerSignInEmail,
  type PartnerSignInEmailPurpose,
} from "@/lib/resend-email";

const DEFAULT_WEBSITE_ORIGIN = "https://www.parkingoath.com.au";
const PRODUCTION_WEBSITE_ORIGINS = new Set([
  "https://parkingoath.com.au",
  "https://www.parkingoath.com.au",
]);
const LOGIN_EMAIL_REQUEST_COLLECTION = "partnerLoginEmailRequests";
const LOGIN_EMAIL_COOLDOWN_MS = 60_000;

export type ApprovedWebsiteRecipient = {
  email: string;
  displayName: string;
  kind: "admin" | "ambassador";
};

export function normalizePartnerEmail(value: unknown): string | null {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }
  return email;
}

function getPartnerLoginUrl(): string {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_WEBSITE_ORIGIN;
  const url = new URL(configuredOrigin);
  if (process.env.NODE_ENV === "production" && !PRODUCTION_WEBSITE_ORIGINS.has(url.origin)) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not an approved ParkingOath website origin.");
  }
  return new URL("/login", url.origin).toString();
}

function isLocalAuthEmulator(): boolean {
  return process.env.NODE_ENV !== "production" && /^(localhost|127\.0\.0\.1):\d+$/.test(
    process.env.FIREBASE_AUTH_EMULATOR_HOST || "",
  );
}

export async function findApprovedWebsiteRecipient(
  email: string,
): Promise<ApprovedWebsiteRecipient | null> {
  const auth = await getAdminAuth();
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (error) {
    if ((error as { code?: string }).code === "auth/user-not-found") return null;
    throw error;
  }

  if (user.disabled) return null;
  if (user.customClaims?.admin === true) {
    return {
      email,
      displayName: user.displayName?.trim() || "there",
      kind: "admin",
    };
  }

  const db = await getAdminDb();
  const mapping = await db.collection("ambassadorAuthUids").doc(user.uid).get();
  const ambassadorId = mapping.data()?.ambassadorId;
  if (typeof ambassadorId !== "string" || !ambassadorId) return null;

  const ambassador = await db.collection("ambassadors").doc(ambassadorId).get();
  const data = ambassador.data();
  if (
    !ambassador.exists ||
    data?.status !== "active" ||
    normalizePartnerEmail(data?.email) !== email
  ) {
    return null;
  }

  return {
    email,
    displayName: typeof data?.displayName === "string" ? data.displayName.trim() : "there",
    kind: "ambassador",
  };
}

export async function sendWebsiteSignInLink({
  auth,
  email,
  displayName,
  purpose,
  referralLink,
  idempotencyKey,
}: {
  auth?: Auth;
  email: string;
  displayName?: string;
  purpose: PartnerSignInEmailPurpose;
  referralLink?: string;
  idempotencyKey?: string;
}) {
  if (isLocalAuthEmulator()) {
    return { ok: true as const, simulated: true as const, providerMessageId: null };
  }

  const firebaseAuth = auth ?? await getAdminAuth();
  const signInLink = await firebaseAuth.generateSignInWithEmailLink(email, {
    url: getPartnerLoginUrl(),
    handleCodeInApp: true,
  });
  return sendPartnerSignInEmail({
    to: email,
    displayName,
    signInLink,
    purpose,
    referralLink,
    idempotencyKey,
  });
}

function loginRequestId(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

export async function claimLoginEmailRequest(email: string): Promise<boolean> {
  const db = await getAdminDb();
  const requestRef = db.collection(LOGIN_EMAIL_REQUEST_COLLECTION).doc(loginRequestId(email));
  const now = Timestamp.now();
  return db.runTransaction(async (transaction) => {
    const existing = await transaction.get(requestRef);
    const previous = existing.data()?.lastRequestedAt;
    if (previous instanceof Timestamp && now.toMillis() - previous.toMillis() < LOGIN_EMAIL_COOLDOWN_MS) {
      return false;
    }
    transaction.set(requestRef, {
      emailHash: requestRef.id,
      lastRequestedAt: now,
      status: "pending",
    }, { merge: true });
    return true;
  });
}

export async function recordLoginEmailResult(email: string, sent: boolean) {
  const db = await getAdminDb();
  await db.collection(LOGIN_EMAIL_REQUEST_COLLECTION).doc(loginRequestId(email)).set({
    status: sent ? "sent" : "failed",
    lastCompletedAt: Timestamp.now(),
  }, { merge: true });
}
