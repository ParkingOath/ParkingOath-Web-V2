// Browser storage is an optional convenience, never a prerequisite for login.
const EMAIL_KEY = "parkingoath_partner_email";

export function readLoginEmail(): string {
  try { return window.localStorage.getItem(EMAIL_KEY) || ""; } catch { return ""; }
}

export function saveLoginEmail(email: string): void {
  try { window.localStorage.setItem(EMAIL_KEY, email); } catch { /* Ask for it on the callback. */ }
}

export function clearLoginEmail(): void {
  try { window.localStorage.removeItem(EMAIL_KEY); } catch { /* Login already succeeded. */ }
}

export class PartnerLoginError extends Error {
  readonly code: string;
  constructor(message: string, code: string) { super(message); this.code = code; }
}

export function loginErrorMessage(error: unknown): string {
  if (error instanceof PartnerLoginError) return error.message;
  const code = (error as { code?: string })?.code;
  if (code === "auth/invalid-action-code" || code === "auth/expired-action-code") {
    return "This link has expired or has already been used. Request a new sign-in link below.";
  }
  if (code === "auth/invalid-email" || code === "auth/invalid-credential") {
    return "Enter the email address that received this sign-in link, or request a new link.";
  }
  if (code === "auth/network-request-failed") return "Could not connect to sign in. Check your connection and try again.";
  if (code === "auth/too-many-requests") return "Too many sign-in attempts. Please wait a few minutes and try again.";
  return "Sign-in is temporarily unavailable. Please try again shortly.";
}

// Firebase email links are single-use. Keep the verified user for session
// retries, and share simultaneous completions instead of redeeming twice.
export function createEmailLinkCompletion<User>(
  redeem: (email: string, link: string) => Promise<User>,
  createSession: (user: User) => Promise<string>,
) {
  let verified: { email: string; link: string; user: User } | undefined;
  let inFlight: Promise<string> | undefined;
  return (email: string, link: string): Promise<string> => {
    if (inFlight) return inFlight;
    inFlight = (async () => {
      if (!verified || verified.email !== email || verified.link !== link) {
        verified = { email, link, user: await redeem(email, link) };
      }
      return createSession(verified.user);
    })().finally(() => { inFlight = undefined; });
    return inFlight;
  };
}
