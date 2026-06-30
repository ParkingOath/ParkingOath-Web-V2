import { NextResponse } from "next/server";

import {
  getClientIpAddress,
  getCookieValue,
  sendMetaServerEvent,
} from "@/lib/meta-conversions-api";
import { sendLeadEmail, sendLeadWelcomeEmail } from "@/lib/resend-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pageName = typeof body.pageName === "string" && body.pageName.length > 0
      ? body.pageName
      : "Early Access";
    const fullName = [body.firstName, body.lastName]
      .filter((value) => typeof value === "string" && value.trim().length > 0)
      .join(" ");

    const emailResponse = await sendLeadEmail({
      subject: `New ${pageName} signup${fullName ? ` - ${fullName}` : ""}`,
      rows: [
        ["Source", pageName],
        ["First name", body.firstName],
        ["Last name", body.lastName],
        ["Email", body.email],
        ["Location", body.location],
        ["Frequency", body.frequency],
        ["Page URL", request.headers.get("referer")],
      ],
    });

    if (!emailResponse.ok) {
      return NextResponse.json(
        { message: emailResponse.message },
        { status: emailResponse.status }
      );
    }

    if (typeof body.email === "string" && body.email.trim().length > 0) {
      try {
        await sendLeadWelcomeEmail({ to: body.email, firstName: body.firstName });
      } catch (welcomeError) {
        console.error("Welcome email failed", welcomeError);
      }
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
