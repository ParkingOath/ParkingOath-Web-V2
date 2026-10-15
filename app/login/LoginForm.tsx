"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink, type User } from "firebase/auth";

import { getClientAuth } from "@/lib/firebase-client";

import { clearLoginEmail, createEmailLinkCompletion, loginErrorMessage, PartnerLoginError, readLoginEmail, saveLoginEmail } from "@/lib/partner-login-client";

async function redeemEmailLink(address: string, link: string): Promise<User> {
  const auth = getClientAuth();
  try { return (await signInWithEmailLink(auth, address, link)).user; }
  catch (error) {
    // A reload after session creation failed can revisit an already consumed
    // link. Recover only the same recently authenticated Firebase user; the
    // server still verifies revocation, auth_time and portal authorization.
    if ((error as { code?: string }).code === "auth/invalid-action-code") {
      await auth.authStateReady();
      const user = auth.currentUser;
      if (user?.email?.toLowerCase() === address.toLowerCase()) {
        const token = await user.getIdTokenResult();
        const age = Date.now() - Date.parse(token.authTime);
        if (age >= 0 && age < 5 * 60_000) return user;
      }
    }
    throw error;
  }
}

async function readSession() {
  const response = await fetch("/api/auth/session", {
    credentials: "same-origin", cache: "no-store", signal: AbortSignal.timeout(20_000),
  });
  const body = await response.json() as { destination?: string; uid?: string; error?: string };
  return { response, body };
}

async function createSession(user: User): Promise<string> {
  const response = await fetch("/api/auth/session", {
    method: "POST", credentials: "same-origin", cache: "no-store",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idToken: await user.getIdToken() }),
    signal: AbortSignal.timeout(20_000),
  });
  const body = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) throw new PartnerLoginError(body.error || "Could not finish signing in. Please try again.", `session-${response.status}`);
  // Confirm the browser retained the HttpOnly cookie instead of sending it
  // into a redirect loop when cookies are blocked.
  const session = await readSession();
  if (session.response.status === 401) throw new PartnerLoginError("Your browser did not retain the sign-in session. Allow cookies for this site, or open this link in your usual browser, then try again.", "cookies-blocked");
  if (!session.response.ok || session.body.uid !== user.uid) throw new PartnerLoginError("Your email was verified, but the portal could not confirm your session. Please try Complete sign in again.", "session-unavailable");
  return session.body.destination === "/admin" ? "/admin" : "/partners";
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(true);
  const [hasEmailLink, setHasEmailLink] = useState(false);
  const initialized = useRef(false);
  const completing = useRef<ReturnType<typeof createEmailLinkCompletion<User>> | null>(null);
  if (!completing.current) completing.current = createEmailLinkCompletion(
    redeemEmailLink,
    createSession,
  );

  async function complete(emailAddress: string) {
    const destination = await completing.current!(emailAddress, window.location.href);
    clearLoginEmail();
    // A fresh document request observes the new cookie, bypassing any cached
    // logged-out redirect in Next's client router.
    window.location.replace(destination);
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void (async () => {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get("mode") !== "signIn") {
          const session = await readSession();
          if (session.response.ok && (session.body.destination === "/admin" || session.body.destination === "/partners")) {
            window.location.replace(session.body.destination);
            return;
          }
          if (session.response.status >= 500) setMessage(session.body.error || "Sign-in is temporarily unavailable. Please try again shortly.");
          return;
        }
        if (!isSignInWithEmailLink(getClientAuth(), window.location.href)) {
          setMessage("This sign-in link is incomplete. Request a new link below.");
          return;
        }
        setHasEmailLink(true);
        const savedEmail = readLoginEmail();
        if (!savedEmail) {
          setMessage("Enter the email address that received this sign-in link to continue.");
          return;
        }
        setEmail(savedEmail);
        await complete(savedEmail);
      } catch (error) { setMessage(loginErrorMessage(error)); }
      finally { setBusy(false); }
    })();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const emailAddress = email.trim().toLowerCase();
      if (hasEmailLink) {
        await complete(emailAddress);
        return;
      }
      const response = await fetch("/api/auth/email-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: emailAddress }),
        signal: AbortSignal.timeout(20_000),
      });
      const body = await response.json().catch(() => ({})) as { error?: string; message?: string };
      if (!response.ok) throw new PartnerLoginError(body.error || "We could not send a sign-in link. Please try again shortly.", "email-unavailable");
      saveLoginEmail(emailAddress);
      setMessage(body.message || "Check your email for your secure ParkingOath sign-in link.");
    } catch (error) {
      setMessage(loginErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="mt-8 space-y-4">
    <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Email address</label>
    <input id="email" type="email" required disabled={busy} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3" />
    <button disabled={busy} className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Please wait…" : hasEmailLink ? "Complete sign in" : "Email me a sign-in link"}</button>
    {hasEmailLink ? <a href="/login" className="block text-sm font-semibold text-brand underline">Request a new sign-in link</a> : null}
    {message ? <p className="text-sm text-slate-600" role="status">{message}</p> : null}
  </form>;
}
