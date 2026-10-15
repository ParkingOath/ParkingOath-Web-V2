"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "firebase/auth";

import { getClientAuth } from "@/lib/firebase-client";

export function PartnerPortalControls({ portal }: { portal: "admin" | "partner" }) {
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/session", {
        method: "DELETE",
        credentials: "same-origin",
        cache: "no-store",
      });
      await signOut(getClientAuth()).catch(() => undefined);
    } finally {
      window.location.replace("/login");
    }
  }

  return (
    <nav aria-label="Portal navigation" className="flex flex-wrap items-center gap-3">
      {portal === "partner" ? (
        <>
          <a href="#my-hosts" className="text-sm font-semibold text-brand hover:underline">My hosts</a>
          <a href="#earnings" className="text-sm font-semibold text-brand hover:underline">Earnings</a>
          <a href="#payouts" className="text-sm font-semibold text-brand hover:underline">Payouts</a>
        </>
      ) : null}
      <Link href="/" className="text-sm font-semibold text-brand hover:underline">ParkingOath website</Link>
      <button
        type="button"
        disabled={signingOut}
        onClick={() => void handleSignOut()}
        className="rounded-xl border border-brand px-3 py-2 text-sm font-semibold text-brand disabled:opacity-50"
      >
        {signingOut ? "Signing out…" : "Sign out"}
      </button>
    </nav>
  );
}

export function ReferralLinkActions({ href, compact = false }: { href: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`flex min-w-0 flex-col ${compact ? "gap-1" : "gap-3"}`}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`break-all text-brand underline underline-offset-2 ${compact ? "text-sm" : "font-mono text-sm"}`}
      >
        {href}
      </a>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void copyLink()}
          className="w-fit rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="w-fit rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Test link
        </a>
      </div>
    </div>
  );
}
