// Only credential rejection means "signed out". Network, IAM, configuration
// and Firestore failures must remain distinguishable from an invalid session.
export function isRejectedAuthCredential(error: unknown): boolean {
  return new Set([
    "auth/argument-error", "auth/invalid-id-token", "auth/id-token-expired",
    "auth/id-token-revoked", "auth/invalid-session-cookie",
    "auth/session-cookie-expired", "auth/session-cookie-revoked",
    "auth/user-disabled", "auth/user-not-found",
  ]).has((error as { code?: string })?.code || "");
}

export function authFailureCode(error: unknown): string {
  const code = (error as { code?: unknown })?.code;
  return typeof code === "string" && /^[a-z0-9_/-]{1,80}$/i.test(code) ? code : "service-unavailable";
}
