import { NextResponse } from "next/server";

import {
  getClientIpAddress,
  getCookieValue,
  sendMetaServerEvent,
} from "@/lib/meta-conversions-api";

export async function POST(request: Request) {
  try {
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    const hubspotFormId = process.env.HUBSPOT_EARLY_ACCESS_FORM_ID;

    if (!hubspotPortalId || !hubspotFormId) {
      return NextResponse.json(
        { message: "HubSpot configuration is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const fields = [
      { name: "firstname", value: body.firstName },
      { name: "lastname", value: body.lastName },
      { name: "email", value: body.email },
      { name: "location__suburb", value: body.location },
      { name: "frequency", value: body.frequency },
      { name: "_early_access_completed", value: "yes" },
    ].filter((field) => field.value);

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: request.headers.get("referer") ?? undefined,
          pageName: body.pageName || "Early Access",
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorBody?.message ?? "HubSpot submission failed" },
        { status: response.status }
      );
    }

    if (typeof body.metaEventId === "string" && body.metaEventId.length > 0) {
      try {
        await sendMetaServerEvent({
          eventId: body.metaEventId,
          eventName: "Lead",
          eventSourceUrl:
            typeof body.eventSourceUrl === "string" && body.eventSourceUrl.length > 0
              ? body.eventSourceUrl
              : request.headers.get("referer") ?? "https://www.parkingoath.com/thank-you",
          userData: {
            clientIpAddress: getClientIpAddress(request),
            clientUserAgent: request.headers.get("user-agent") ?? undefined,
            email: body.email,
            fbc:
              typeof body.fbc === "string" && body.fbc.length > 0
                ? body.fbc
                : getCookieValue(request, "_fbc"),
            fbp:
              typeof body.fbp === "string" && body.fbp.length > 0
                ? body.fbp
                : getCookieValue(request, "_fbp"),
          },
        });
      } catch (metaError) {
        console.error("Meta Lead failed", metaError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }
}
