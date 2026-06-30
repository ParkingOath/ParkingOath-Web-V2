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
