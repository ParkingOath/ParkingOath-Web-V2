import { createHash } from "node:crypto";

const META_PIXEL_ID = "1627247404879975";
const META_API_VERSION = process.env.META_GRAPH_API_VERSION ?? "v22.0";

type UserDataInput = {
  clientIpAddress?: string;
  clientUserAgent?: string;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
};

type MetaServerEventInput = {
  customData?: Record<string, unknown>;
  eventId: string;
  eventName: "PageView" | "Lead";
  eventSourceUrl: string;
  eventTime?: number;
  userData?: UserDataInput;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function buildHashedIdentifiers(userData?: UserDataInput) {
  if (!userData) {
    return {};
  }

  const hashedEmail = userData.email ? sha256(normalizeEmail(userData.email)) : undefined;
  const hashedPhone = userData.phone ? sha256(normalizePhone(userData.phone)) : undefined;

  return {
    ...(hashedEmail ? { em: hashedEmail } : {}),
    ...(hashedPhone ? { ph: hashedPhone } : {}),
  };
}

export function getCookieValue(request: Request, cookieName: string) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return undefined;
  }

  const cookie = cookieHeader
    .split("; ")
    .find((entry) => entry.startsWith(`${cookieName}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : undefined;
}

export function getClientIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
}

export async function sendMetaServerEvent({
  customData,
  eventId,
  eventName,
  eventSourceUrl,
  eventTime = Math.floor(Date.now() / 1000),
  userData,
}: MetaServerEventInput) {
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

  if (!accessToken) {
    return { ok: false as const, skipped: true as const, reason: "missing_access_token" };
  }

  const payload = {
    data: [
      {
        action_source: "website",
        ...(customData ? { custom_data: customData } : {}),
        event_id: eventId,
        event_name: eventName,
        event_source_url: eventSourceUrl,
        event_time: eventTime,
        user_data: {
          ...(userData?.clientIpAddress
            ? { client_ip_address: userData.clientIpAddress }
            : {}),
          ...(userData?.clientUserAgent
            ? { client_user_agent: userData.clientUserAgent }
            : {}),
          ...buildHashedIdentifiers(userData),
          ...(userData?.fbp ? { fbp: userData.fbp } : {}),
          ...(userData?.fbc ? { fbc: userData.fbc } : {}),
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const response = await fetch(
    `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${accessToken}`,
    {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Meta Conversions API request failed (${response.status}): ${responseText}`);
  }

  const result = await response.json().catch(() => ({}));

  return { ok: true as const, result };
}
