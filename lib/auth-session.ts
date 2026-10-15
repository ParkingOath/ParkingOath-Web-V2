import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { authFailureCode, isRejectedAuthCredential } from "@/lib/auth-errors";
import type { DecodedIdToken } from "firebase-admin/auth";

export const AUTH_SESSION_COOKIE = "parkingoath_partner_session";
export const AUTH_SESSION_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

export type WebsiteIdentity =
  | { kind: "admin"; uid: string; email: string | null }
  | { kind: "ambassador"; uid: string; email: string | null; ambassadorId: string };

export async function resolveWebsiteIdentity(): Promise<WebsiteIdentity | null> {
  const value = (await cookies()).get(AUTH_SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const decoded = await (await getAdminAuth()).verifySessionCookie(value, true);
    return await websiteIdentityForToken(decoded);
  } catch (error) {
    if (isRejectedAuthCredential(error)) return null;
    console.error("Partner session verification unavailable", { code: authFailureCode(error) });
    throw error;
  }
}

export async function websiteIdentityForToken(decoded: DecodedIdToken): Promise<WebsiteIdentity | null> {
    if (decoded.admin === true) {
      return { kind: "admin", uid: decoded.uid, email: decoded.email ?? null };
    }
    const db = await getAdminDb();
    const mapping = await db.collection("ambassadorAuthUids").doc(decoded.uid).get();
    const ambassadorId = mapping.data()?.ambassadorId;
    if (typeof ambassadorId !== "string" || !ambassadorId) return null;
    const ambassador = await db.collection("ambassadors").doc(ambassadorId).get();
    if (!ambassador.exists || ambassador.data()?.status !== "active") return null;
    return { kind: "ambassador", uid: decoded.uid, email: decoded.email ?? null, ambassadorId };
}

async function identityForPage() {
  try { return await resolveWebsiteIdentity(); }
  catch { redirect("/login?error=service_unavailable"); }
}

export async function requireAmbassador() {
  const identity = await identityForPage();
  if (!identity) redirect("/login");
  if (identity.kind === "admin") redirect("/admin");
  return identity;
}

export async function requireAdmin() {
  const identity = await identityForPage();
  if (!identity) redirect("/login");
  if (identity.kind !== "admin") redirect("/partners");
  return identity;
}
