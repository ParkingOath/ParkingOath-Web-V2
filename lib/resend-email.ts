const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_LEADS_EMAIL_TO = "apps@parkingoath.com";
const DEFAULT_LEADS_EMAIL_FROM = "ParkingOath Website <noreply@parkingoath.com.au>";

type LeadEmailInput = {
  subject: string;
  rows: Array<[label: string, value: unknown]>;
};

function formatValue(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function formatEnvValue(value: string | undefined, fallback: string) {
  const rawValue = value?.trim() || fallback;

  return rawValue.replace(/^["']|["']$/g, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildTextBody(rows: LeadEmailInput["rows"]) {
  return rows
    .map(([label, value]) => `${label}: ${formatValue(value) || "-"}`)
    .join("\n");
}

function buildHtmlBody(rows: LeadEmailInput["rows"]) {
  const items = rows
    .map(([label, value]) => {
      const displayValue = formatValue(value) || "-";

      return `<tr><th align="left" style="padding:6px 12px 6px 0;">${escapeHtml(
        label
      )}</th><td style="padding:6px 0;">${escapeHtml(displayValue).replace(
        /\n/g,
        "<br>"
      )}</td></tr>`;
    })
    .join("");

  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">${items}</table>`;
}

export async function sendLeadEmail({ subject, rows }: LeadEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = formatEnvValue(process.env.RESEND_FROM_EMAIL, DEFAULT_LEADS_EMAIL_FROM);
  const to = formatEnvValue(process.env.LEADS_EMAIL_TO, DEFAULT_LEADS_EMAIL_TO);

  if (!apiKey) {
    return { ok: false as const, status: 500, message: "Resend configuration is missing" };
  }

  const response = await fetch(RESEND_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html: buildHtmlBody(rows),
      text: buildTextBody(rows),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      typeof errorBody?.message === "string" ? errorBody.message : "Email submission failed";

    return { ok: false as const, status: response.status, message };
  }

  return { ok: true as const };
}

const WELCOME_EMAIL_FROM = "Arch, Bhavya, Akshat & Adam (ParkingOath) <team@parkingoath.com.au>";
const WELCOME_EMAIL_REPLY_TO = "apps@parkingoath.com";

type WelcomeEmailInput = {
  to: string;
  firstName?: string;
};

function buildWelcomeTextBody(firstName?: string) {
  const greetingName = firstName?.trim() ? firstName.trim() : "there";

  return [
    `Hey ${greetingName},`,
    "",
    "Thanks for reaching out to ParkingOath, we mean that. We're Arch, Bhavya, Akshat and Adam, the four people who got sick of circling the block looking for a park, so we decided to build something about it. We'll be in touch about your enquiry really soon, but we wanted to send this one ourselves first.",
    "",
    "Here's the part that actually matters to us. Every parking app out there makes you guess and book a spot hours ahead, for a trip you haven't even planned yet. That never made sense to us. Parking is something you need right now, not something you pre-book like a dinner reservation. So we're building ParkingOath to show real spaces, free right now, the moment you actually need one.",
    "",
    "That's the bet we're making, and it's a big one. Honestly, we've started calling it Australia's biggest social experiment: can a whole community make parking better for itself, suburb by suburb, without a single new car park being built? You just joined it.",
    "",
    "We're starting small and building trust the slow way instead of the loud way, and you're now part of that from day one.",
    "",
    "P.S. What brought you here? Hit reply and let us know, we read every single one.",
    "",
    "Cheers,",
    "Arch, Bhavya, Akshat & Adam",
  ].join("\n");
}

function buildWelcomeHtmlBody(firstName?: string) {
  const greetingName = firstName?.trim() ? escapeHtml(firstName.trim()) : "there";

  return `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1e293b;">
      <p>Hey ${greetingName},</p>
      <p>Thanks for reaching out to ParkingOath, we mean that. We're Arch, Bhavya, Akshat and Adam, the four people who got sick of circling the block looking for a park, so we decided to build something about it. We'll be in touch about your enquiry really soon, but we wanted to send this one ourselves first.</p>
      <p>Here's the part that actually matters to us. Every parking app out there makes you guess and book a spot hours ahead, for a trip you haven't even planned yet. That never made sense to us. Parking is something you need right now, not something you pre-book like a dinner reservation. So we're building ParkingOath to show real spaces, free right now, the moment you actually need one.</p>
      <p>That's the bet we're making, and it's a big one. Honestly, we've started calling it Australia's biggest social experiment: can a whole community make parking better for itself, suburb by suburb, without a single new car park being built? You just joined it.</p>
      <p>We're starting small and building trust the slow way instead of the loud way, and you're now part of that from day one.</p>
      <p><strong>P.S.</strong> What brought you here? Hit reply and let us know, we read every single one.</p>
      <p>Cheers,<br>Arch, Bhavya, Akshat &amp; Adam</p>
    </div>
  `;
}

export async function sendLeadWelcomeEmail({ to, firstName }: WelcomeEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to || !to.trim()) {
    return { ok: false as const, status: 500, message: "Resend configuration is missing" };
  }

  const response = await fetch(RESEND_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: WELCOME_EMAIL_FROM,
      to,
      reply_to: WELCOME_EMAIL_REPLY_TO,
      subject: "Welcome to ParkingOath",
      html: buildWelcomeHtmlBody(firstName),
      text: buildWelcomeTextBody(firstName),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      typeof errorBody?.message === "string" ? errorBody.message : "Welcome email failed";

    return { ok: false as const, status: response.status, message };
  }

  return { ok: true as const };
}
