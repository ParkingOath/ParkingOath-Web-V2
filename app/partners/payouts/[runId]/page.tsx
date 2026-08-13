import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { requireAmbassador } from "@/lib/auth-session";
import { aud, displayDate, getPartnerPayout } from "@/lib/partner-data";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PayoutPage({ params }: { params: Promise<{ runId: string }> }) {
  const identity = await requireAmbassador();
  const { runId } = await params;
  const payout = await getPartnerPayout(identity.ambassadorId, runId);
  if (!payout) notFound();
  return <main className="min-h-screen bg-slate-50 py-12"><Container><div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm"><H1>Payout statement</H1><dl className="mt-6 grid gap-3 sm:grid-cols-2"><div><dt className="text-sm text-slate-500">Period</dt><dd>{payout.periodMonth as string}</dd></div><div><dt className="text-sm text-slate-500">Total</dt><dd>{aud(payout.totalAmountCents as number)}</dd></div><div><dt className="text-sm text-slate-500">Status</dt><dd>{payout.status as string}</dd></div><div><dt className="text-sm text-slate-500">Paid date</dt><dd>{displayDate(payout.paidAt)}</dd></div><div><dt className="text-sm text-slate-500">Payment reference</dt><dd>{(payout.paymentReference as string) || "—"}</dd></div></dl><div className="mt-8 divide-y">{payout.entries.map((entry) => <div key={entry.id} className="flex justify-between py-3"><span>{(entry.amountCents as number) < 0 ? "Refund adjustment" : entry.type === "onboarding_fee" ? "$20 onboarding reward" : "Ongoing service fee"}</span><span>{aud(entry.amountCents as number)}</span></div>)}</div></div></Container></main>;
}
