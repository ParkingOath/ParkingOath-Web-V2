import "server-only";

import { Timestamp } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";
import { createAmbassadorReferralUrl } from "@/lib/ambassador-referrals";

type FirestoreRow = { id: string } & Record<string, any>;

export function aud(cents: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);
}

export function displayDate(value: unknown) {
  return value instanceof Timestamp ? value.toDate().toLocaleDateString("en-AU") : "—";
}

function sydneyPeriodMonth(value = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(value);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  if (!year || !month) throw new Error("Unable to resolve the Sydney reporting month.");
  return `${year}-${month}`;
}

export async function getPartnerDashboard(ambassadorId: string) {
  const db = getAdminDb();
  const ambassadorRef = db.collection("ambassadors").doc(ambassadorId);
  const [ambassador, hosts, ledger, payouts] = await Promise.all([
    ambassadorRef.get(),
    db.collection("users").where("referredByAmbassadorId", "==", ambassadorId).get(),
    db.collection("ledgerEntries").where("ambassadorId", "==", ambassadorId).get(),
    db.collection("payoutRuns").where("ambassadorId", "==", ambassadorId).get(),
  ]);
  if (!ambassador.exists || ambassador.data()?.status !== "active") return null;
  const data = ambassador.data()!;
  const entries: FirestoreRow[] = ledger.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const currentMonth = sydneyPeriodMonth();
  const sum = (items: typeof entries) => items.reduce((total, item) => total + (Number.isSafeInteger(item.amountCents) ? item.amountCents as number : 0), 0);
  return {
    ambassador: {
      displayName: typeof data.displayName === "string" ? data.displayName : "Ambassador",
      referralCode: typeof data.referralCode === "string" ? data.referralCode : "",
      referralLink: typeof data.referralCode === "string" ? createAmbassadorReferralUrl(data.referralCode) : null,
    },
    hosts: hosts.docs.map((doc) => {
      const host = doc.data();
      const count = Number.isSafeInteger(host.paidBookingCount) ? host.paidBookingCount : 0;
      return { id: `Host …${doc.id.slice(-6)}`, paidBookingCount: count, activated: count >= 3, activatedAt: host.ambassadorActivatedAt };
    }),
    entries,
    thisMonthCents: sum(entries.filter((entry) => entry.periodMonth === currentMonth)),
    lifetimeCents: sum(entries),
    payouts: payouts.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreRow[],
  };
}

export async function getPartnerPayout(ambassadorId: string, runId: string) {
  const db = getAdminDb();
  const run = await db.collection("payoutRuns").doc(runId).get();
  if (!run.exists || run.data()?.ambassadorId !== ambassadorId) return null;
  const entryIds: string[] = Array.isArray(run.data()?.entryIds) ? run.data()!.entryIds.filter((id: unknown): id is string => typeof id === "string") : [];
  const entries = await Promise.all(entryIds.map((id) => db.collection("ledgerEntries").doc(id).get()));
  return { id: run.id, ...run.data(), entries: entries.filter((entry) => entry.exists).map((entry) => ({ id: entry.id, ...entry.data() })) } as FirestoreRow & { entries: FirestoreRow[] };
}

export async function getAdminDashboard() {
  const db = getAdminDb();
  const [ambassadors, ledger, payouts] = await Promise.all([
    db.collection("ambassadors").get(), db.collection("ledgerEntries").get(), db.collection("payoutRuns").get(),
  ]);
  const entries: FirestoreRow[] = ledger.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const runs: FirestoreRow[] = payouts.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const sum = (items: typeof entries) => items.reduce((total, item) => total + (Number.isSafeInteger(item.amountCents) ? item.amountCents as number : 0), 0);
  return {
    ambassadors: ambassadors.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreRow[], entries, runs,
    unpaidCents: sum(entries.filter((entry) => entry.status === "accrued")),
    paidCents: sum(entries.filter((entry) => entry.status === "paid")),
    onboardingCents: sum(entries.filter((entry) => entry.type === "onboarding_fee")),
    serviceCents: sum(entries.filter((entry) => entry.type === "service_fee" && (entry.amountCents as number) >= 0)),
    adjustmentCents: sum(entries.filter((entry) => (entry.amountCents as number) < 0)),
  };
}
