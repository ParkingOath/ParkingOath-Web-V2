"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

import { getClientAuth } from "@/lib/firebase-client";

const EMAIL_KEY = "parkingoath_partner_email";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasEmailLink, setHasEmailLink] = useState(false);

  const completeEmailLink = useCallback(async (emailAddress: string) => {
    const auth = getClientAuth();
    const credential = await signInWithEmailLink(
      auth,
      emailAddress,
      window.location.href,
    );
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken: await credential.user.getIdToken() }),
    });
    if (!response.ok) throw new Error("Session creation failed");
    window.localStorage.removeItem(EMAIL_KEY);
    router.replace("/partners");
    router.refresh();
  }, [router]);

  useEffect(() => {
    try {
      const auth = getClientAuth();
      if (!isSignInWithEmailLink(auth, window.location.href)) return;
      setHasEmailLink(true);
      const savedEmail = window.localStorage.getItem(EMAIL_KEY);
      if (!savedEmail) {
        setMessage("Enter the email address that received this sign-in link to continue.");
        return;
      }
      setBusy(true);
      completeEmailLink(savedEmail)
        .catch(() => setMessage("This sign-in link is invalid or expired. Request a new one."))
        .finally(() => setBusy(false));
    } catch {
      setMessage("Sign-in is temporarily unavailable. Refresh the page and try again.");
    }
  }, [completeEmailLink]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const auth = getClientAuth();
      const emailAddress = email.trim();
      const completingExistingLink = isSignInWithEmailLink(auth, window.location.href);
      if (completingExistingLink) {
        await completeEmailLink(emailAddress);
        return;
      }
      const response = await fetch("/api/auth/email-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: emailAddress }),
      });
      const body = await response.json().catch(() => ({})) as { error?: string; message?: string };
      if (!response.ok) throw new Error(body.error || "Sign-in email failed");
      window.localStorage.setItem(EMAIL_KEY, emailAddress);
      setMessage(body.message || "Check your email for your secure ParkingOath sign-in link.");
    } catch {
      setMessage(
        hasEmailLink
          ? "This sign-in link is invalid or does not match that email address."
          : "We could not send a sign-in link. Check the address and try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="mt-8 space-y-4">
    <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Email address</label>
    <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3" />
    <button disabled={busy} className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Please wait…" : hasEmailLink ? "Complete sign in" : "Email me a sign-in link"}</button>
    {message ? <p className="text-sm text-slate-600" role="status">{message}</p> : null}
  </form>;
}
