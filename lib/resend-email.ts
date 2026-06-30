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

const WELCOME_EMAIL_FROM = "Arch, Bhavya, Akshat & Adam (ParkingOath) <noreply@parkingoath.com.au>";
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
    "We're Arch, Bhavya, Akshat and Adam, the four of us behind ParkingOath.",
    "",
    "Thanks for putting your trust in something this early. We're rolling ParkingOath out suburb by suburb, and you're now part of that from the very start.",
    "",
    "P.S. What brought you here? Hit reply and let us know, we read every reply.",
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
      <p>We're Arch, Bhavya, Akshat and Adam, the four of us behind ParkingOath.</p>
      <p>Thanks for putting your trust in something this early. We're rolling ParkingOath out suburb by suburb, and you're now part of that from the very start.</p>
      <p><strong>P.S.</strong> What brought you here? Hit reply and let us know, we read every reply.</p>
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
