import { NextResponse } from "next/server";

import {
  getClientIpAddress,
  getCookieValue,
  sendMetaServerEvent,
} from "@/lib/meta-conversions-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventId =
      typeof body.eventId === "string" && body.eventId.length > 0 ? body.eventId : undefined;
    const eventSourceUrl =
      typeof body.eventSourceUrl === "string" && body.eventSourceUrl.length > 0
        ? body.eventSourceUrl
        : undefined;

    if (!eventId || !eventSourceUrl) {
      return NextResponse.json(
        { message: "eventId and eventSourceUrl are required" },
        { status: 400 }
      );
    }

    const result = await sendMetaServerEvent({
      eventId,
      eventName: "PageView",
      eventSourceUrl,
      userData: {
        clientIpAddress: getClientIpAddress(request),
        clientUserAgent: request.headers.get("user-agent") ?? undefined,
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

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send PageView";
    console.error("Meta PageView failed", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
