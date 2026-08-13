"use client";

import { FormEvent, useEffect, useState } from "react";
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

import { getClientAuth } from "@/lib/firebase-client";

const EMAIL_KEY = "parkingoath_partner_email";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const auth = getClientAuth();
    if (!isSignInWithEmailLink(auth, window.location.href)) return;
    const savedEmail = window.localStorage.getItem(EMAIL_KEY);
    if (!savedEmail) {
      setMessage("Enter the email address that received this sign-in link to continue.");
      return;
    }
    setBusy(true);
    signInWithEmailLink(auth, savedEmail, window.location.href)
      .then((credential) => credential.user.getIdToken())
      .then((idToken) => fetch("/api/auth/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      }))
      .then(async (response) => {
        if (!response.ok) throw new Error("Session creation failed");
        window.localStorage.removeItem(EMAIL_KEY);
        router.replace("/partners");
        router.refresh();
      })
      .catch(() => setMessage("This sign-in link is invalid or expired. Request a new one."))
      .finally(() => setBusy(false));
  }, [router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const auth = getClientAuth();
      await sendSignInLinkToEmail(auth, email.trim(), {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem(EMAIL_KEY, email.trim());
      setMessage("Check your email for your secure ParkingOath sign-in link.");
    } catch {
      setMessage("We could not send a sign-in link. Check the address and try again.");
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="mt-8 space-y-4">
    <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Email address</label>
    <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3" />
    <button disabled={busy} className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Please wait…" : "Email me a sign-in link"}</button>
    {message ? <p className="text-sm text-slate-600" role="status">{message}</p> : null}
  </form>;
}
