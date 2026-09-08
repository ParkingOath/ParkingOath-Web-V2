import { NextResponse } from "next/server";

import {
  claimLoginEmailRequest,
  findApprovedWebsiteRecipient,
  normalizePartnerEmail,
  recordLoginEmailResult,
  sendWebsiteSignInLink,
} from "@/lib/partner-sign-in";

const GENERIC_SUCCESS = {
  ok: true,
  message: "If that email belongs to an approved ParkingOath partner, a sign-in link has been sent.",
};

export async function POST(request: Request) {
  let normalizedEmail: string | null = null;
  try {
    const body = await request.json() as { email?: unknown };
    normalizedEmail = normalizePartnerEmail(body.email);
    if (!normalizedEmail) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const recipient = await findApprovedWebsiteRecipient(normalizedEmail);
    if (!recipient) {
      return NextResponse.json(GENERIC_SUCCESS, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    const maySend = await claimLoginEmailRequest(normalizedEmail);
    if (!maySend) {
      return NextResponse.json(GENERIC_SUCCESS, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    const result = await sendWebsiteSignInLink({
      email: normalizedEmail,
      displayName: recipient.displayName,
      purpose: "login",
      idempotencyKey: `partner-login-${Date.now()}-${createRequestSuffix(normalizedEmail)}`,
    });
    await recordLoginEmailResult(normalizedEmail, result.ok);
    if (!result.ok) {
      console.error("Partner sign-in email provider rejected the request", {
        status: result.status,
        message: result.message,
      });
      return NextResponse.json(
        { error: "We could not send a sign-in link right now. Please try again shortly." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(GENERIC_SUCCESS, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (normalizedEmail) {
      await recordLoginEmailResult(normalizedEmail, false).catch(() => undefined);
    }
    console.error("Unable to issue partner sign-in email", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "We could not send a sign-in link right now. Please try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function createRequestSuffix(email: string): string {
  let hash = 0;
  for (let index = 0; index < email.length; index += 1) {
    hash = (hash * 31 + email.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}
