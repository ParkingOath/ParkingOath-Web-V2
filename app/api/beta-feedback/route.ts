import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/resend-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = typeof body.role === "string" ? body.role : "";

    const rows: Array<[string, unknown]> = [["Tester role", role]];

    if (role === "Driver only" || role === "Both") {
      rows.push(
        ["--- DRIVER EXPERIENCE ---", ""],
        ["Find parking ease (1-5)", body.driverFindEase],
        ["Booking clarity (1-5)", body.driverBookingClarity],
        ["Map usefulness (1-5)", body.driverMapUsefulness],
        ["Overall driver rating (1-5)", body.driverOverall]
      );
    }

    if (role === "Host only" || role === "Both") {
      rows.push(
        ["--- HOST EXPERIENCE ---", ""],
        ["List space ease (1-5)", body.hostListEase],
        ["Availability instructions clarity (1-5)", body.hostAvailabilityClarity],
        ["Earnings display confidence (1-5)", body.hostEarningsConfidence],
        ["Overall host rating (1-5)", body.hostOverall]
      );
    }

    rows.push(
      ["--- VOICE SEARCH ---", ""],
      ["Find voice search feature (1-5)", body.voiceFindEase],
      ["Voice understanding accuracy (1-5)", body.voiceUnderstanding],
      ["Voice vs typing usefulness (1-5)", body.voiceVsTyping],
      ["Would use voice search again", body.voiceUseAgain],
      ["--- USAGE PATTERNS ---", ""],
      ["When they'd use ParkingOath", Array.isArray(body.whenUse) ? body.whenUse.join(", ") : body.whenUse],
      ["Expected price per hour", body.expectedPrice],
      ["Why choose ParkingOath over alternatives", body.whyChoose],
      ["What would make them recommend", body.referralReason],
      ["What would stop them using it", body.churnReason],
      ["--- COMPETITIVE CONTEXT ---", ""],
      ["Other parking apps used", body.otherApps],
      ["How ParkingOath compares", body.comparison],
      ["--- FINAL THOUGHTS ---", ""],
      ["One thing they would change", body.changeOne],
      ["One thing they would add", body.addOne],
      ["--- NPS ---", ""],
      ["Likelihood to recommend (0-10)", body.nps]
    );

    const emailResponse = await sendLeadEmail({
      subject: `Beta Feedback${role ? ` - ${role}` : ""}`,
      rows,
    });

    if (!emailResponse.ok) {
      return NextResponse.json(
        { message: emailResponse.message },
        { status: emailResponse.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Beta feedback submission error", error);
    return NextResponse.json({ message: "Submission failed" }, { status: 500 });
  }
}
