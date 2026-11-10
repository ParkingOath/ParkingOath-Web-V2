import { NextRequest, NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE, AUTH_SESSION_MAX_AGE_SECONDS, resolveWebsiteIdentity, websiteIdentityForToken } from "@/lib/auth-session";
import { getAdminAuth } from "@/lib/firebase-admin";
import { authFailureCode, isRejectedAuthCredential } from "@/lib/auth-errors";

const noStore = { "Cache-Control": "private, no-store" };

export async function GET() {
  try {
    const identity = await resolveWebsiteIdentity();
    if (!identity) return NextResponse.json({ error: "Please sign in." }, { status: 401, headers: noStore });
    return NextResponse.json({ ok: true, uid: identity.uid, destination: identity.kind === "admin" ? "/admin" : "/partners" }, { headers: noStore });
  } catch {
    return NextResponse.json({ error: "Sign-in is temporarily unavailable. Please try again shortly." }, { status: 503, headers: noStore });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { idToken?: unknown };
    if (typeof body.idToken !== "string" || !body.idToken) {
      return NextResponse.json({ error: "A Firebase ID token is required." }, { status: 400 });
    }
    const auth = await getAdminAuth();
    const decoded = await auth.verifyIdToken(body.idToken, true);
    if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
      return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
    }
    const identity = await websiteIdentityForToken(decoded);
    if (!identity) return NextResponse.json({ error: "This account does not have access to an active partner portal. Please contact ParkingOath support." }, { status: 403, headers: noStore });
    const session = await auth.createSessionCookie(body.idToken, {
      expiresIn: AUTH_SESSION_MAX_AGE_SECONDS * 1000,
    });
    const response = NextResponse.json({ ok: true, destination: identity.kind === "admin" ? "/admin" : "/partners" }, { headers: noStore });
    response.cookies.set(AUTH_SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error) {
    console.error("Unable to create Firebase Admin session", {
      code: authFailureCode(error),
    });
    const rejected = isRejectedAuthCredential(error);
    return NextResponse.json({ error: rejected ? "Please request a new sign-in link." : "Your email was verified, but the portal could not finish signing you in. Please try Complete sign in again." }, { status: rejected ? 401 : 503, headers: noStore });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true }, { headers: noStore });
  response.cookies.set(AUTH_SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" });
  return response;
}
