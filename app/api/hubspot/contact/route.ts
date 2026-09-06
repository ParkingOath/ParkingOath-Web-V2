import { NextResponse } from "next/server";

import {
  createPendingAmbassadorApplication,
  normalizeAmbassadorApplication,
} from "@/lib/ambassador-applications";
import { sendLeadEmail, sendLeadWelcomeEmail } from "@/lib/resend-email";

const AMBASSADOR_APPLICATION_PAGE = "Ambassador interest";

function isLocalFirebaseEmulator(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return /^(localhost|127\.0\.0\.1):\d+$/.test(
    process.env.FIRESTORE_EMULATOR_HOST || "",
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pageName = typeof body.pageName === "string" && body.pageName.length > 0
      ? body.pageName
      : "General enquiry";
    const fullName = [body.firstName, body.lastName]
      .filter((value) => typeof value === "string" && value.trim().length > 0)
      .join(" ");
    const ambassadorApplication =
      pageName === AMBASSADOR_APPLICATION_PAGE
        ? normalizeAmbassadorApplication(body)
        : null;

    const emailResponse = isLocalFirebaseEmulator()
      ? { ok: true as const }
      : await sendLeadEmail({
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

    if (ambassadorApplication) {
      await createPendingAmbassadorApplication(ambassadorApplication);
    }

    if (
      !isLocalFirebaseEmulator() &&
      typeof body.email === "string" &&
      body.email.trim().length > 0
    ) {
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
