import { NextRequest, NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE, AUTH_SESSION_MAX_AGE_SECONDS } from "@/lib/auth-session";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { idToken?: unknown };
    if (typeof body.idToken !== "string" || !body.idToken) {
      return NextResponse.json({ error: "A Firebase ID token is required." }, { status: 400 });
    }
    const decoded = await getAdminAuth().verifyIdToken(body.idToken);
    if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
      return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
    }
    const session = await getAdminAuth().createSessionCookie(body.idToken, {
      expiresIn: AUTH_SESSION_MAX_AGE_SECONDS * 1000,
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(AUTH_SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: AUTH_SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to create a session." }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" });
  return response;
}
