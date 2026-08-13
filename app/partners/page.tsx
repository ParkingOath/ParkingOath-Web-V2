import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { requireAmbassador } from "@/lib/auth-session";
import { aud, displayDate, getPartnerDashboard } from "@/lib/partner-data";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PartnersPage() {
  const identity = await requireAmbassador();
  const dashboard = await getPartnerDashboard(identity.ambassadorId);
  if (!dashboard) notFound();
  const service = dashboard.entries.filter((entry) => entry.type === "service_fee" && (entry.amountCents as number) >= 0).reduce((sum, entry) => sum + (entry.amountCents as number), 0);
  const onboarding = dashboard.entries.filter((entry) => entry.type === "onboarding_fee").reduce((sum, entry) => sum + (entry.amountCents as number), 0);
  const adjustments = dashboard.entries.filter((entry) => (entry.amountCents as number) < 0);
  return <main className="min-h-screen bg-slate-50 py-12"><Container className="space-y-10"><div><p className="text-sm font-semibold text-brand">Ambassador portal</p><H1>Welcome, {dashboard.ambassador.displayName}</H1></div>
    <section className="rounded-3xl bg-white p-8 shadow-sm"><H2>My referral link</H2><p className="mt-4 break-all font-mono text-sm">{dashboard.ambassador.referralLink ?? "Referral link pending"}</p><p className="mt-2 text-sm text-slate-500">Code: {dashboard.ambassador.referralCode || "—"}</p></section>
    <section className="rounded-3xl bg-white p-8 shadow-sm"><H2>My earning terms</H2><p className="mt-4 text-slate-600">You earn a 20% ongoing Ambassador service fee from a referred host’s first paid booking, plus a one-time $20 reward when that host reaches their third paid booking.</p></section>
    <section className="grid gap-4 md:grid-cols-4">{[["This month", aud(dashboard.thisMonthCents)],["Lifetime", aud(dashboard.lifetimeCents)],["Service fees", aud(service)],["Onboarding", aud(onboarding)]].map(([label,value]) => <div key={label} className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</section>
    {adjustments.length ? <section className="rounded-3xl bg-white p-8 shadow-sm"><H2>Adjustments</H2>{adjustments.map((entry) => <p key={entry.id} className="mt-3 flex justify-between"><span>Refund adjustment</span><span>{aud(entry.amountCents as number)}</span></p>)}</section> : null}
    <section className="rounded-3xl bg-white p-8 shadow-sm"><H2>My hosts</H2><div className="mt-4 divide-y">{dashboard.hosts.length ? dashboard.hosts.map((host) => <div key={host.id} className="flex flex-wrap justify-between gap-3 py-4"><span>{host.id}</span><span>{host.paidBookingCount} paid bookings</span><span>{host.activated ? `Activated ${displayDate(host.activatedAt)}` : "Not yet activated"}</span></div>) : <p className="mt-4 text-slate-500">No attributed hosts yet.</p>}</div></section>
    <section className="rounded-3xl bg-white p-8 shadow-sm"><H2>Payout history</H2><div className="mt-4 divide-y">{dashboard.payouts.length ? dashboard.payouts.map((run) => <Link key={run.id} href={`/partners/payouts/${encodeURIComponent(run.id)}`} className="flex justify-between py-4"><span>{run.periodMonth as string}</span><span>{aud(run.totalAmountCents as number)} · {run.status as string}</span></Link>) : <p className="mt-4 text-slate-500">No payout runs yet.</p>}</div></section>
  </Container></main>;
}
