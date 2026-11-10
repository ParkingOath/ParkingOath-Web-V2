import "server-only";

import { Timestamp } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";
import { createAmbassadorReferralUrl } from "@/lib/ambassador-referrals";

type FirestoreRow = { id: string } & Record<string, any>;
type HostDocRow = { uid: string; data: Record<string, any> };
type ListingSummary = {
  id: string;
  title: string;
  address: string;
  paidBookingCount: number;
  earningsCents: number;
  latestBookingAt: unknown;
};
type HostSummary = {
  id: string;
  uid: string;
  name: string;
  paidBookingCount: number;
  activated: boolean;
  activatedAt: unknown;
  attributedAt: unknown;
  earningsCents: number;
  listings: ListingSummary[];
};
type EnrichedLedgerEntry = FirestoreRow & {
  hostLabel: string;
  listingLabel: string;
  listingAddress: string;
  bookingLabel: string;
};

export function aud(cents: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);
}

export function displayDate(value: unknown) {
  if (value instanceof Timestamp) return value.toDate().toLocaleDateString("en-AU");
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toLocaleDateString("en-AU");
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toLocaleDateString("en-AU");
  }
  return "—";
}

function timestampMillis(value: unknown) {
  if (value instanceof Timestamp) return value.toMillis();
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.getTime();
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === "object" ? value as Record<string, any> : {};
}

function asText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function asCents(value: unknown) {
  return Number.isSafeInteger(value) ? value as number : 0;
}

function uniqueTexts(values: unknown[]) {
  return [...new Set(values.map(asText).filter(Boolean))];
}

function hostDisplayName(data: Record<string, any>, uid: string) {
  const profile = asRecord(data.profile);
  return (
    asText(profile.name) ||
    asText(data.displayName) ||
    asText(data.name) ||
    asText(profile.displayName) ||
    `Host …${uid.slice(-6)}`
  );
}

function listingTitle(data: Record<string, any>, bookingData: Record<string, any>) {
  return (
    asText(data.spaceName) ||
    asText(data.title) ||
    asText(bookingData.title) ||
    "Hosted parking"
  );
}

function listingAddress(data: Record<string, any>, bookingData: Record<string, any>) {
  return (
    asText(data.publicAddress) ||
    asText(data.publicLocationName) ||
    asText(bookingData.publicAddress) ||
    asText(bookingData.publicLocationName) ||
    "Address unavailable"
  );
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

async function buildHostAndEntryDetails({
  db,
  hostRows,
  entries,
}: {
  db: Awaited<ReturnType<typeof getAdminDb>>;
  hostRows: HostDocRow[];
  entries: FirestoreRow[];
}) {
  const hostUidsFromEntries = uniqueTexts(entries.map((entry) => entry.sourceHostId));
  const knownHostUids = new Set(hostRows.map((host) => host.uid));
  const missingHostRows = await Promise.all(
    hostUidsFromEntries
      .filter((uid) => !knownHostUids.has(uid))
      .map(async (uid) => {
        const doc = await db.collection("users").doc(uid).get();
        return doc.exists ? { uid, data: doc.data() ?? {} } : { uid, data: {} };
      })
  );
  const allHostRows = [...hostRows, ...missingHostRows];
  const hostByUid = new Map(allHostRows.map((host) => [host.uid, host]));

  const bookingIds = uniqueTexts(entries
    .filter((entry) => !asText(entry.sourceListingId))
    .map((entry) => entry.sourceBookingId));
  const bookingSnaps = await Promise.all(bookingIds.map((id) => db.collection("bookings").doc(id).get()));
  const bookingsById = new Map(
    bookingSnaps
      .filter((doc) => doc.exists)
      .map((doc) => [doc.id, doc.data() ?? {}])
  );

  const hostedByHost = await Promise.all(
    allHostRows.map(async (host) => ({
      uid: host.uid,
      listings: await db.collection("hosted").where("hostUid", "==", host.uid).get(),
    }))
  );
  const publicListingById = new Map<string, Record<string, any>>();
  const listingIdsByHost = new Map<string, Set<string>>();
  const rememberListing = (hostUid: string, listingId: string) => {
    if (!hostUid || !listingId) return;
    if (!listingIdsByHost.has(hostUid)) listingIdsByHost.set(hostUid, new Set());
    listingIdsByHost.get(hostUid)!.add(listingId);
  };

  hostedByHost.forEach(({ uid, listings }) => {
    listings.docs.forEach((doc) => {
      publicListingById.set(doc.id, doc.data() ?? {});
      rememberListing(uid, doc.id);
    });
  });

  entries.forEach((entry) => {
    const hostUid = asText(entry.sourceHostId);
    const sourceListingId = asText(entry.sourceListingId);
    const bookingData = sourceListingId ? {} : asRecord(bookingsById.get(asText(entry.sourceBookingId)));
    const listingId = sourceListingId || asText(bookingData.spotId);
    rememberListing(hostUid, listingId);
  });

  bookingsById.forEach((bookingData) => {
    rememberListing(asText(bookingData.hostUid), asText(bookingData.spotId));
  });

  const listingEarnings = new Map<string, { bookingIds: Set<string>; earningsCents: number; latestBookingAt: unknown }>();
  const hostEarnings = new Map<string, number>();
  entries.forEach((entry) => {
    const hostUid = asText(entry.sourceHostId);
    if (!hostUid) return;
    hostEarnings.set(hostUid, (hostEarnings.get(hostUid) ?? 0) + asCents(entry.amountCents));

    const bookingId = asText(entry.sourceBookingId);
    const sourceListingId = asText(entry.sourceListingId);
    const bookingData = sourceListingId ? {} : asRecord(bookingsById.get(bookingId));
    const listingId = sourceListingId || asText(bookingData.spotId);
    if (entry.type !== "service_fee" || asCents(entry.amountCents) < 0 || !listingId) return;
    const key = `${hostUid}/${listingId}`;
    const current = listingEarnings.get(key) ?? {
      bookingIds: new Set<string>(),
      earningsCents: 0,
      latestBookingAt: null,
    };
    if (bookingId) current.bookingIds.add(bookingId);
    current.earningsCents += asCents(entry.amountCents);
    const bookingTime = bookingData.createdAt ?? entry.createdAt ?? null;
    if (timestampMillis(bookingTime) > timestampMillis(current.latestBookingAt)) {
      current.latestBookingAt = bookingTime;
    }
    listingEarnings.set(key, current);
  });

  const hosts: HostSummary[] = allHostRows
    .filter((host) => hostRows.some((row) => row.uid === host.uid))
    .map((host) => {
      const count = Number.isSafeInteger(host.data.paidBookingCount) ? host.data.paidBookingCount as number : 0;
      const listingIds = [...(listingIdsByHost.get(host.uid) ?? new Set<string>())];
      const listings: ListingSummary[] = listingIds.map((listingId) => {
        const publicListing = publicListingById.get(listingId) ?? {};
        const bookingData = [...bookingsById.values()].find((booking) =>
          asText(booking.hostUid) === host.uid && asText(booking.spotId) === listingId
        ) ?? {};
        const earnings = listingEarnings.get(`${host.uid}/${listingId}`);
        return {
          id: listingId,
          title: listingTitle(publicListing, asRecord(bookingData)),
          address: listingAddress(publicListing, asRecord(bookingData)),
          paidBookingCount: earnings?.bookingIds.size ?? 0,
          earningsCents: earnings?.earningsCents ?? 0,
          latestBookingAt: earnings?.latestBookingAt ?? null,
        };
      }).sort((left, right) =>
        right.earningsCents - left.earningsCents ||
        timestampMillis(right.latestBookingAt) - timestampMillis(left.latestBookingAt)
      );

      return {
        id: `Host …${host.uid.slice(-6)}`,
        uid: host.uid,
        name: hostDisplayName(host.data, host.uid),
        paidBookingCount: count,
        activated: count >= 3,
        activatedAt: host.data.ambassadorActivatedAt,
        attributedAt: host.data.ambassadorReferralAttributedAt,
        earningsCents: hostEarnings.get(host.uid) ?? 0,
        listings,
      };
    })
    .sort((left, right) => right.earningsCents - left.earningsCents || right.paidBookingCount - left.paidBookingCount);

  const enrichedEntries: EnrichedLedgerEntry[] = entries.map((entry): EnrichedLedgerEntry => {
    const hostUid = asText(entry.sourceHostId);
    const bookingId = asText(entry.sourceBookingId);
    const sourceListingId = asText(entry.sourceListingId);
    const bookingData = sourceListingId ? {} : asRecord(bookingsById.get(bookingId));
    const listingId = sourceListingId || asText(bookingData.spotId);
    const publicListing = listingId ? publicListingById.get(listingId) ?? {} : {};
    const host = hostByUid.get(hostUid);
    return {
      ...entry,
      hostLabel: host ? hostDisplayName(host.data, host.uid) : hostUid ? `Host …${hostUid.slice(-6)}` : "Unknown host",
      listingLabel: listingId ? listingTitle(publicListing, bookingData) : "Host-level reward",
      listingAddress: listingId ? listingAddress(publicListing, bookingData) : "—",
      bookingLabel: bookingId ? `Booking …${bookingId.slice(-6)}` : "—",
    };
  });
  enrichedEntries.sort((left, right) => timestampMillis(right["createdAt"]) - timestampMillis(left["createdAt"]));

  return { hosts, entries: enrichedEntries };
}

export async function getPartnerDashboard(ambassadorId: string) {
  const db = await getAdminDb();
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
  const hostRows = hosts.docs.map((doc) => ({ uid: doc.id, data: doc.data() ?? {} }));
  const details = await buildHostAndEntryDetails({ db, hostRows, entries });
  const currentMonth = sydneyPeriodMonth();
  const sum = (items: typeof entries) => items.reduce((total, item) => total + (Number.isSafeInteger(item.amountCents) ? item.amountCents as number : 0), 0);
  return {
    ambassador: {
      displayName: typeof data.displayName === "string" ? data.displayName : "Ambassador",
      referralCode: typeof data.referralCode === "string" ? data.referralCode : "",
      referralLink: typeof data.referralCode === "string" ? createAmbassadorReferralUrl(data.referralCode) : null,
    },
    hosts: details.hosts,
    entries: details.entries,
    activity: details.entries.slice(0, 25),
    thisMonthCents: sum(entries.filter((entry) => entry.periodMonth === currentMonth)),
    lifetimeCents: sum(entries),
    payouts: payouts.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FirestoreRow[],
  };
}

export async function getPartnerPayout(ambassadorId: string, runId: string) {
  const db = await getAdminDb();
  const run = await db.collection("payoutRuns").doc(runId).get();
  if (!run.exists || run.data()?.ambassadorId !== ambassadorId) return null;
  const entryIds: string[] = Array.isArray(run.data()?.entryIds) ? run.data()!.entryIds.filter((id: unknown): id is string => typeof id === "string") : [];
  const entries = await Promise.all(entryIds.map((id) => db.collection("ledgerEntries").doc(id).get()));
  const entryRows = entries.filter((entry) => entry.exists).map((entry) => ({ id: entry.id, ...entry.data() }));
  const details = await buildHostAndEntryDetails({ db, hostRows: [], entries: entryRows });
  return { id: run.id, ...run.data(), entries: details.entries } as FirestoreRow & { entries: EnrichedLedgerEntry[] };
}

export async function getAdminDashboard() {
  const db = await getAdminDb();
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
