import { NextRequest, NextResponse } from "next/server";

import {
  AMBASSADOR_REFERRAL_COOKIE,
  createReferralToken,
  REFERRAL_TOKEN_LIFETIME_SECONDS,
  resolveActiveAmbassadorByCode,
  verifyReferralToken,
} from "@/lib/ambassador-referrals";

function hostsDestination(request: NextRequest): URL {
  return new URL("/hosts", request.url);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const existingToken = request.cookies.get(AMBASSADOR_REFERRAL_COOKIE)?.value;
  if (existingToken) {
    try {
      const existingReferral = verifyReferralToken(existingToken);
      if (existingReferral) {
        return NextResponse.redirect(hostsDestination(request), 303);
      }
    } catch {
      // Treat unverifiable cookies as absent and continue with the supplied code.
    }
  }

  const { code } = await context.params;
  try {
    const referral = await resolveActiveAmbassadorByCode(code);
    if (!referral) {
      return NextResponse.redirect(hostsDestination(request), 303);
    }

    const response = NextResponse.redirect(hostsDestination(request), 303);
    response.cookies.set({
      name: AMBASSADOR_REFERRAL_COOKIE,
      value: createReferralToken(referral.ambassadorId, referral.referralCode),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFERRAL_TOKEN_LIFETIME_SECONDS,
    });
    return response;
  } catch (error) {
    console.error("Ambassador referral validation failed", {
      codeProvided: Boolean(code),
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.redirect(hostsDestination(request), 303);
  }
}
