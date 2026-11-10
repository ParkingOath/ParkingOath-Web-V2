import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { requireAdmin } from "@/lib/auth-session";
import { createAmbassadorReferralUrl } from "@/lib/ambassador-referrals";
import { aud, displayDate, getAdminDashboard } from "@/lib/partner-data";
import { PartnerPortalControls } from "@/components/PartnerPortalControls";
import { AdminActions } from "./AdminActions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  await requireAdmin();
  const dashboard = await getAdminDashboard();
  const pending = dashboard.ambassadors.filter((item) => item.status === "pending");
  const active = dashboard.ambassadors.filter((item) => item.status === "active");
  const pendingRuns = dashboard.runs.filter((item) => item.status === "pending");
  const paidRuns = dashboard.runs.filter((item) => item.status === "paid");
  const ambassadorNames = new Map(dashboard.ambassadors.map((item) => [item.id, String(item.displayName || "Ambassador")]));
  const activeAmbassadors = active.map((item) => {
    const referralCode = String(item.referralCode || "");
    return {
      id: item.id,
      displayName: String(item.displayName || "Ambassador"),
      status: String(item.status || ""),
      referralCode,
      referralLink: createAmbassadorReferralUrl(referralCode) || "",
      payoutsEnabled: item.payoutsEnabled === true,
    };
  });
  return <main className="min-h-screen bg-slate-50 py-12"><Container reveal={false} size="wide" className="space-y-10"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-sm font-semibold text-brand">Internal only</p><H1>Ambassador administration</H1></div><PartnerPortalControls portal="admin" /></div>
    <section className="grid gap-4 md:grid-cols-5">{[["Accrued liability",dashboard.unpaidCents],["Paid",dashboard.paidCents],["Onboarding",dashboard.onboardingCents],["Service fees",dashboard.serviceCents],["Adjustments",dashboard.adjustmentCents]].map(([label,value]) => <div key={label as string} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-xl font-bold">{aud(value as number)}</p></div>)}</section>
    <AdminActions
      pending={pending.map((item) => ({ id: item.id, displayName: String(item.displayName || "Applicant"), email: String(item.email || ""), applicationDate: displayDate(item.createdAt) }))}
      ambassadors={activeAmbassadors}
      pendingRuns={pendingRuns.map((run) => ({ id: run.id, ambassadorName: ambassadorNames.get(String(run.ambassadorId)) || "Ambassador", periodMonth: String(run.periodMonth || ""), totalAmountCents: Number(run.totalAmountCents || 0), entryCount: Array.isArray(run.entryIds) ? run.entryIds.length : 0, paymentMethod: String(run.paymentMethod || "manual_bank_transfer") }))}
    />
    <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-8"><H2>Payment history</H2><div className="mt-4 divide-y">{paidRuns.length ? paidRuns.map((run) => <div key={run.id} className="grid gap-2 py-4 sm:grid-cols-2 lg:grid-cols-4"><span><span className="block text-xs text-slate-500">Period</span>{run.periodMonth as string}</span><span><span className="block text-xs text-slate-500">Amount</span>{aud(run.totalAmountCents as number)}</span><span><span className="block text-xs text-slate-500">Paid</span>{displayDate(run.paidAt)}</span><span className="break-words"><span className="block text-xs text-slate-500">Reference</span>{(run.paymentReference as string) || "—"}</span></div>) : <p className="py-4 text-slate-500">No completed payout runs.</p>}</div></section>
  </Container></main>;
}
