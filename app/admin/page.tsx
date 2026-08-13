import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { requireAdmin } from "@/lib/auth-session";
import { aud, displayDate, getAdminDashboard } from "@/lib/partner-data";
import { AdminActions } from "./AdminActions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  await requireAdmin();
  const dashboard = await getAdminDashboard();
  const pending = dashboard.ambassadors.filter((item) => item.status === "pending");
  const pendingRuns = dashboard.runs.filter((item) => item.status === "pending");
  const ambassadorNames = new Map(dashboard.ambassadors.map((item) => [item.id, String(item.displayName || "Ambassador")]));
  return <main className="min-h-screen bg-slate-50 py-12"><Container className="space-y-10"><div><p className="text-sm font-semibold text-brand">Internal only</p><H1>Ambassador administration</H1></div>
    <section className="grid gap-4 md:grid-cols-5">{[["Accrued liability",dashboard.unpaidCents],["Paid",dashboard.paidCents],["Onboarding",dashboard.onboardingCents],["Service fees",dashboard.serviceCents],["Adjustments",dashboard.adjustmentCents]].map(([label,value]) => <div key={label as string} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-xl font-bold">{aud(value as number)}</p></div>)}</section>
    <AdminActions
      pending={pending.map((item) => ({ id: item.id, displayName: String(item.displayName || "Applicant"), email: String(item.email || ""), applicationDate: displayDate(item.createdAt) }))}
      ambassadors={dashboard.ambassadors.map((item) => ({ id: item.id, displayName: String(item.displayName || "Ambassador"), status: String(item.status || ""), referralCode: String(item.referralCode || ""), referralLink: String(item.referralLink || ""), payoutsEnabled: item.payoutsEnabled === true }))}
      pendingRuns={pendingRuns.map((run) => ({ id: run.id, ambassadorName: ambassadorNames.get(String(run.ambassadorId)) || "Ambassador", periodMonth: String(run.periodMonth || ""), totalAmountCents: Number(run.totalAmountCents || 0), entryCount: Array.isArray(run.entryIds) ? run.entryIds.length : 0, paymentMethod: String(run.paymentMethod || "manual_bank_transfer") }))}
    />
    <section className="rounded-3xl bg-white p-8 shadow-sm"><H2>Payment history</H2><div className="mt-4 divide-y">{dashboard.runs.filter((run) => run.status === "paid").map((run) => <div key={run.id} className="flex flex-wrap justify-between gap-3 py-4"><span>{run.periodMonth as string}</span><span>{aud(run.totalAmountCents as number)}</span><span>{displayDate(run.paidAt)}</span><span>{run.paymentReference as string}</span></div>)}</div></section>
  </Container></main>;
}
