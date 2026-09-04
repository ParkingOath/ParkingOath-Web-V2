import { NextRequest, NextResponse } from "next/server";

import {
  approveAmbassador,
  markAmbassadorPayoutPaid,
  setAmbassadorPayoutDetails,
} from "@/lib/ambassador-admin-server";
import { resolveWebsiteIdentity } from "@/lib/auth-session";

function isAllowedBrowserOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = new Set([
    request.nextUrl.origin,
    "https://parkingoath.com.au",
    "https://www.parkingoath.com.au",
  ]);
  const configuredSite = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredSite) {
    try {
      allowed.add(new URL(configuredSite).origin);
    } catch {
      // A malformed optional public URL must not broaden the origin allowlist.
    }
  }
  return allowed.has(origin);
}

export async function POST(request: NextRequest) {
  if (!isAllowedBrowserOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  const identity = await resolveWebsiteIdentity();
  if (!identity || identity.kind !== "admin") {
    return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  }

  let action = "unknown";
  try {
    const body = (await request.json()) as {
      action?: unknown;
      input?: unknown;
    };
    action = asAction(body.action);
    const input = asInput(body.input);
    let result;
    switch (action) {
      case "approveAmbassador":
        result = await approveAmbassador(input.ambassadorId, identity.uid);
        break;
      case "setAmbassadorPayoutDetails":
        result = await setAmbassadorPayoutDetails(input, identity.uid);
        break;
      case "markAmbassadorPayoutPaid":
        result = await markAmbassadorPayoutPaid(input, identity.uid);
        break;
    }
    return NextResponse.json(
      { result },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    // Never log request bodies because payout actions can contain bank details.
    console.error("Ambassador admin action failed", {
      action,
      adminUid: identity.uid,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The operation could not be completed." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function asAction(value: unknown) {
  if (
    value === "approveAmbassador" ||
    value === "setAmbassadorPayoutDetails" ||
    value === "markAmbassadorPayoutPaid"
  ) {
    return value;
  }
  throw new Error("A supported Ambassador admin action is required.");
}

function asInput(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("A valid action input is required.");
  }
  return value as Record<string, unknown>;
}
