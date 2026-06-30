import { NextResponse } from "next/server";

import { sendLeadEmail, sendLeadWelcomeEmail } from "@/lib/resend-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pageName = typeof body.pageName === "string" && body.pageName.length > 0
      ? body.pageName
      : "General enquiry";
    const fullName = [body.firstName, body.lastName]
      .filter((value) => typeof value === "string" && value.trim().length > 0)
      .join(" ");

    const emailResponse = await sendLeadEmail({
      subject: `New ${pageName}${fullName ? ` - ${fullName}` : ""}`,
      rows: [
        ["Source", pageName],
        ["First name", body.firstName],
        ["Last name", body.lastName],
        ["Email", body.email],
        ["Phone", body.phone],
        ["Message", body.message],
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }
}
