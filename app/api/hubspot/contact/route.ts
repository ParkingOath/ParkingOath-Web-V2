import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    const hubspotFormId = process.env.HUBSPOT_CONTACT_FORM_ID;

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
      { name: "phone", value: body.phone },
      { name: "message", value: body.message },
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
          pageName: "Contact",
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
