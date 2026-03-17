import { NextResponse } from "next/server";

const HUBSPOT_PORTAL_ID = "442272651";
const HUBSPOT_FORM_ID = "ce44dfa1-4c8f-4750-994b-2dcf3bc425d2";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fields = [
      { name: "firstname", value: body.firstName },
      { name: "lastname", value: body.lastName },
      { name: "email", value: body.email },
      { name: "mobilephone", value: body.phone },
      { name: "location__suburb", value: body.location },
      { name: "frequency", value: body.frequency },
    ].filter((field) => field.value);

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }
}
