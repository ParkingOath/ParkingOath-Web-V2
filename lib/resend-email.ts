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

export type PartnerSignInEmailPurpose = "approval" | "login";

type PartnerSignInEmailInput = {
  to: string;
  displayName?: string;
  signInLink: string;
  purpose: PartnerSignInEmailPurpose;
  referralLink?: string;
  idempotencyKey?: string;
};

function buildPartnerSignInTextBody({
  displayName,
  signInLink,
  purpose,
  referralLink,
}: Omit<PartnerSignInEmailInput, "to" | "idempotencyKey">) {
  const greetingName = displayName?.trim() || "there";
  const lines = [
    `Hi ${greetingName},`,
    "",
    purpose === "approval"
      ? "Your ParkingOath Ambassador application has been approved."
      : "Use the secure link below to sign in to your ParkingOath partner portal.",
    "",
    `Sign in: ${signInLink}`,
  ];

  if (purpose === "approval" && referralLink) {
    lines.push("", `Your referral link: ${referralLink}`);
  }

  lines.push(
    "",
    "If the sign-in link has expired, request another one from the Partner sign-in page.",
    "",
    "Thanks,",
    "ParkingOath",
  );
  return lines.join("\n");
}

function buildPartnerSignInHtmlBody({
  displayName,
  signInLink,
  purpose,
  referralLink,
}: Omit<PartnerSignInEmailInput, "to" | "idempotencyKey">) {
  const greetingName = escapeHtml(displayName?.trim() || "there");
  const safeSignInLink = escapeHtml(signInLink);
  const referralParagraph = purpose === "approval" && referralLink
    ? `<p>Your referral link:<br><a href="${escapeHtml(referralLink)}">${escapeHtml(referralLink)}</a></p>`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1e293b;">
      <p>Hi ${greetingName},</p>
      <p>${purpose === "approval"
        ? "Your ParkingOath Ambassador application has been approved."
        : "Use the secure link below to sign in to your ParkingOath partner portal."}</p>
      <p><a href="${safeSignInLink}" style="display:inline-block;border-radius:8px;background:#2443c3;color:#fff;padding:12px 18px;text-decoration:none;font-weight:600;">Sign in to ParkingOath</a></p>
      ${referralParagraph}
      <p style="color:#64748b;font-size:13px;">If the sign-in link has expired, request another one from the Partner sign-in page.</p>
      <p>Thanks,<br>ParkingOath</p>
    </div>
  `;
}

export async function sendPartnerSignInEmail(input: PartnerSignInEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = formatEnvValue(process.env.RESEND_FROM_EMAIL, DEFAULT_LEADS_EMAIL_FROM);
  const to = input.to.trim();

  if (!apiKey || !to || !input.signInLink) {
    return { ok: false as const, status: 500, message: "Partner sign-in email configuration is missing" };
  }

  const response = await fetch(RESEND_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: WELCOME_EMAIL_REPLY_TO,
      subject: input.purpose === "approval"
        ? "Your ParkingOath Ambassador account is approved"
        : "Your ParkingOath partner sign-in link",
      html: buildPartnerSignInHtmlBody(input),
      text: buildPartnerSignInTextBody(input),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = typeof errorBody?.message === "string"
      ? errorBody.message
      : "Partner sign-in email failed";
    return { ok: false as const, status: response.status, message };
  }

  return { ok: true as const };
}
