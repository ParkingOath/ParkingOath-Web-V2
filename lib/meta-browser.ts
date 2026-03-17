const RANDOM_SUFFIX_LENGTH = 12;

function createRandomSuffix() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, RANDOM_SUFFIX_LENGTH);
  }

  return Math.random().toString(36).slice(2, 2 + RANDOM_SUFFIX_LENGTH);
}

export function createMetaEventId(prefix: "pv" | "lead") {
  return `${prefix}_${Date.now()}_${createRandomSuffix()}`;
}

export function getBrowserCookie(name: string) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : undefined;
}
