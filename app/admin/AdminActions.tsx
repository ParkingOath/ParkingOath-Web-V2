"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { approveAmbassador, markPayoutPaid, savePayoutDetails } from "@/lib/ambassador-admin-actions";

type PendingAmbassador = { id: string; displayName: string; email: string; applicationDate: string };
type Ambassador = { id: string; displayName: string; status: string; referralCode: string; referralLink: string; payoutsEnabled: boolean };
type PayoutRun = { id: string; ambassadorName: string; periodMonth: string; totalAmountCents: number; entryCount: number; paymentMethod: string };

const aud = (cents: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);

export function AdminActions({ pending, ambassadors, pendingRuns }: {
  pending: PendingAmbassador[]; ambassadors: Ambassador[]; pendingRuns: PayoutRun[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  async function run<T>(key: string, action: () => Promise<T>, success: string | ((result: T) => string)): Promise<boolean> {
    setBusy(key); setMessage("");
    try { const result = await action(); setMessage(typeof success === "function" ? success(result) : success); router.refresh(); return true; }
    catch (error) { setMessage(error instanceof Error ? error.message : "The operation could not be completed."); return false; }
    finally { setBusy(""); }
  }

  return <div className="space-y-10">
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">Pending applications</h2>
      <div className="mt-4 divide-y">{pending.length ? pending.map((item) =>
        <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div><p className="font-semibold">{item.displayName}</p><p className="text-sm text-slate-600">{item.email} · {item.applicationDate}</p></div>
          <button type="button" disabled={Boolean(busy)} onClick={() => run(`approve-${item.id}`, () => approveAmbassador(item.id), (result) => result.signInEmailSent ? `${item.displayName} approved and their sign-in email was sent.` : `${item.displayName} was approved, but the sign-in email could not be sent. They can request another from the Partner sign-in page.`)} className="rounded-xl bg-brand px-4 py-2 font-semibold text-white disabled:opacity-50">
            {busy === `approve-${item.id}` ? "Approving…" : "Approve"}
          </button>
        </div>) : <p className="py-4 text-slate-500">No pending applications.</p>}</div>
    </section>

    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">Ambassadors</h2>
      <div className="mt-4 divide-y">{ambassadors.map((item) =>
        <div key={item.id} className="py-5">
          <div className="flex flex-wrap justify-between gap-3"><span className="font-semibold">{item.displayName}</span><span>{item.status}</span><span>{item.referralCode || "No code"}</span><span>{item.payoutsEnabled ? "Payout details on file" : "Payout setup required"}</span></div>
          {item.referralLink ? <p className="mt-1 text-sm text-slate-500">{item.referralLink}</p> : null}
          <PayoutDetailsForm ambassador={item} busy={busy} run={run} />
        </div>)}</div>
    </section>

    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">Pending payout runs</h2>
      <div className="mt-4 divide-y">{pendingRuns.length ? pendingRuns.map((runItem) =>
        <MarkPaidForm key={runItem.id} runItem={runItem} busy={busy} run={run} />
      ) : <p className="py-4 text-slate-500">No pending payout runs.</p>}</div>
    </section>
    {message ? <p role="status" className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700">{message}</p> : null}
  </div>;
}

function PayoutDetailsForm({ ambassador, busy, run }: { ambassador: Ambassador; busy: string; run: <T>(key: string, action: () => Promise<T>, success: string | ((result: T) => string)) => Promise<boolean> }) {
  const [accountName, setAccountName] = useState(""); const [bsb, setBsb] = useState(""); const [accountNumber, setAccountNumber] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (await run(`payout-${ambassador.id}`, () => savePayoutDetails({ ambassadorId: ambassador.id, accountName, bsb, accountNumber }), "Payout details saved.")) {
      setAccountName(""); setBsb(""); setAccountNumber("");
    }
  }
  return <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-4">
    <input aria-label="Account name" required maxLength={100} value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Account name" className="rounded-xl border border-slate-300 px-3 py-2" />
    <input aria-label="BSB" required inputMode="numeric" value={bsb} onChange={(e) => setBsb(e.target.value)} placeholder="123-456" className="rounded-xl border border-slate-300 px-3 py-2" />
    <input aria-label="Account number" required inputMode="numeric" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account number" className="rounded-xl border border-slate-300 px-3 py-2" />
    <button disabled={Boolean(busy)} className="rounded-xl border border-brand px-3 py-2 font-semibold text-brand disabled:opacity-50">{busy === `payout-${ambassador.id}` ? "Saving…" : ambassador.payoutsEnabled ? "Replace payout details" : "Save payout details"}</button>
  </form>;
}

function MarkPaidForm({ runItem, busy, run }: { runItem: PayoutRun; busy: string; run: <T>(key: string, action: () => Promise<T>, success: string | ((result: T) => string)) => Promise<boolean> }) {
  const [reference, setReference] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!window.confirm(`You are confirming that ${aud(runItem.totalAmountCents)} has already been transferred manually.`)) return;
    await run(`paid-${runItem.id}`, () => markPayoutPaid({ payoutRunId: runItem.id, paymentReference: reference }), "Payout marked paid.");
  }
  return <form onSubmit={submit} className="grid gap-3 py-4 md:grid-cols-7 md:items-center">
    <span>{runItem.ambassadorName}</span><span>{runItem.periodMonth}</span><span>{aud(runItem.totalAmountCents)}</span><span>{runItem.entryCount} entries</span><span>{runItem.paymentMethod}</span>
    <input aria-label="Payment reference" required maxLength={120} value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Payment reference" className="rounded-xl border border-slate-300 px-3 py-2" />
    <button disabled={Boolean(busy)} className="rounded-xl bg-brand px-3 py-2 font-semibold text-white disabled:opacity-50">{busy === `paid-${runItem.id}` ? "Recording…" : "Mark paid"}</button>
  </form>;
}
