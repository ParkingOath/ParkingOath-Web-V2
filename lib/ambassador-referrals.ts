import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { getAdminDb } from "@/lib/firebase-admin";

export const AMBASSADOR_REFERRAL_COOKIE = "parkingoath_referral";
export const AMBASSADOR_REFERRAL_ORIGIN = "https://parkingoath.com.au";
export const REFERRAL_TOKEN_VERSION = 1;
export const REFERRAL_TOKEN_LIFETIME_SECONDS = 30 * 24 * 60 * 60;

export type ReferralTokenPayload = {
  ambassadorId: string;
  referralCode: string;
  issuedAt: number;
  expiresAt: number;
  tokenVersion: typeof REFERRAL_TOKEN_VERSION;
};

function getSigningSecret(): string {
  const secret = process.env.AMBASSADOR_REFERRAL_SIGNING_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error(
      "AMBASSADOR_REFERRAL_SIGNING_SECRET must contain at least 32 characters"
    );
  }
  return secret;
}

export function normalizeReferralCode(value: string): string | null {
  const normalized = value.trim().toUpperCase();
  return /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(normalized) && normalized.length <= 40
    ? normalized
    : null;
}

export function createAmbassadorReferralUrl(value: string): string | null {
  const referralCode = normalizeReferralCode(value);
  return referralCode
    ? new URL(`/r/${encodeURIComponent(referralCode)}`, AMBASSADOR_REFERRAL_ORIGIN).toString()
    : null;
}

function signEncodedPayload(encodedPayload: string): string {
  return createHmac("sha256", getSigningSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createReferralToken(
  ambassadorId: string,
  referralCode: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): string {
  const payload: ReferralTokenPayload = {
    ambassadorId,
    referralCode,
    issuedAt: nowSeconds,
    expiresAt: nowSeconds + REFERRAL_TOKEN_LIFETIME_SECONDS,
    tokenVersion: REFERRAL_TOKEN_VERSION,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${signEncodedPayload(encodedPayload)}`;
}

export function verifyReferralToken(
  token: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): ReferralTokenPayload | null {
  const [encodedPayload, suppliedSignature, extraPart] = token.split(".");
  if (!encodedPayload || !suppliedSignature || extraPart) return null;

  const expectedSignature = signEncodedPayload(encodedPayload);
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<ReferralTokenPayload>;
    const referralCode =
      typeof payload.referralCode === "string"
        ? normalizeReferralCode(payload.referralCode)
        : null;
    if (
      payload.tokenVersion !== REFERRAL_TOKEN_VERSION ||
      typeof payload.ambassadorId !== "string" ||
      payload.ambassadorId.length === 0 ||
      !referralCode ||
      typeof payload.issuedAt !== "number" ||
      typeof payload.expiresAt !== "number" ||
      payload.issuedAt > nowSeconds + 60 ||
      payload.expiresAt <= nowSeconds
    ) {
      return null;
    }

    return {
      ambassadorId: payload.ambassadorId,
      referralCode,
      issuedAt: payload.issuedAt,
      expiresAt: payload.expiresAt,
      tokenVersion: REFERRAL_TOKEN_VERSION,
    };
  } catch {
    return null;
  }
}

export async function resolveActiveAmbassadorByCode(
  rawCode: string
): Promise<{ ambassadorId: string; referralCode: string } | null> {
  const referralCode = normalizeReferralCode(rawCode);
  if (!referralCode) return null;

  const db = getAdminDb();
  const reservation = await db
    .collection("ambassadorReferralCodes")
    .doc(referralCode)
    .get();
  if (!reservation.exists) return null;
  const ambassadorId = reservation.data()?.ambassadorId;
  if (typeof ambassadorId !== "string" || !ambassadorId) return null;

  const ambassador = await db.collection("ambassadors").doc(ambassadorId).get();
  if (
    !ambassador.exists ||
    ambassador.data()?.status !== "active" ||
    normalizeReferralCode(ambassador.data()?.referralCode ?? "") !== referralCode
  ) {
    return null;
  }
  return { ambassadorId, referralCode };
}
