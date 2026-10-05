import crypto from "node:crypto";

import { GoogleAuth } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { FieldValue, type DocumentReference, type Firestore } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRIPE_REQUEST_COLLECTION = "stripe_payment_sheet_requests";
const STRIPE_WEBHOOK_EVENT_COLLECTION = "stripe_webhook_events";
const STRIPE_CONNECTED_ACCOUNT_COLLECTION = "stripe_connected_accounts";
const BOOKINGS_COLLECTION = "bookings";
const USERS_COLLECTION = "users";

type StripeWebhookSource = "platform" | "connect";

type StripeEvent = {
  id?: unknown;
  type?: unknown;
  livemode?: unknown;
  account?: unknown;
  data?: {
    object?: Record<string, unknown>;
  };
};

type StripeSignatureVerification = {
  event: StripeEvent;
  source: StripeWebhookSource;
};

type StripeSignatureCandidate = {
  source: StripeWebhookSource;
  secret: string;
};

type SecretManagerAccessResponse = {
  payload?: {
    data?: string;
  };
};

let webhookSecretCandidatesPromise: Promise<StripeSignatureCandidate[]> | null = null;

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function asStripeObjectId(value: unknown): string {
  if (typeof value === "string") return asText(value);
  if (value && typeof value === "object" && "id" in value) {
    return asText((value as { id?: unknown }).id);
  }
  return "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asNestedRecord(
  value: Record<string, unknown>,
  key: string,
): Record<string, unknown> {
  return asRecord(value[key]);
}

function extractChargeIdFromPaymentIntent(paymentIntent: Record<string, unknown>): string {
  const latestCharge = asStripeObjectId(paymentIntent.latest_charge);
  if (latestCharge) return latestCharge;
  const charges = asNestedRecord(paymentIntent, "charges");
  const chargesData = Array.isArray(charges.data) ? charges.data : [];
  return asStripeObjectId(chargesData[0]);
}

function extractPaymentMethodIdFromPaymentIntent(paymentIntent: Record<string, unknown>): string {
  const paymentMethod = asStripeObjectId(paymentIntent.payment_method);
  if (paymentMethod) return paymentMethod;
  const latestCharge = asRecord(paymentIntent.latest_charge);
  return asStripeObjectId(latestCharge.payment_method);
}

function parseStripeSignatureHeader(header: string): { timestamp: string; signatures: string[] } {
  const parts = header.split(",").map((part) => part.trim()).filter(Boolean);
  const timestamp = parts
    .map((part) => part.split("=", 2))
    .find(([key]) => key === "t")?.[1];
  const signatures = parts
    .map((part) => part.split("=", 2))
    .filter(([key, value]) => key === "v1" && Boolean(value))
    .map(([, value]) => value);

  if (!timestamp || signatures.length === 0) {
    throw new Error("Invalid Stripe signature header.");
  }

  return { timestamp, signatures };
}

function safeEqualHex(a: string, b: string): boolean {
  const first = Buffer.from(a, "hex");
  const second = Buffer.from(b, "hex");
  if (first.length !== second.length) return false;
  return crypto.timingSafeEqual(first, second);
}

function verifyStripeSignature({
  rawBody,
  signatureHeader,
  secret,
}: {
  rawBody: string;
  signatureHeader: string;
  secret: string;
}): void {
  const { timestamp, signatures } = parseStripeSignatureHeader(signatureHeader);
  const timestampSeconds = Number(timestamp);
  if (!Number.isSafeInteger(timestampSeconds)) {
    throw new Error("Invalid Stripe signature timestamp.");
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestampSeconds) > 5 * 60) {
    throw new Error("Stripe signature timestamp is outside the allowed tolerance.");
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");
  if (!signatures.some((signature) => safeEqualHex(signature, expected))) {
    throw new Error("Stripe webhook signature verification failed.");
  }
}

async function accessSecretManagerValue(secretId: string): Promise<string> {
  const projectId =
    asText(process.env.GCP_PROJECT_NUMBER) ||
    asText(process.env.GCP_PROJECT_ID) ||
    asText(process.env.FIREBASE_PROJECT_ID);
  if (!projectId) {
    throw new Error("GCP project ID is not configured.");
  }
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();
  const response = await client.request({
    url:
      `https://secretmanager.googleapis.com/v1/projects/${encodeURIComponent(projectId)}` +
      `/secrets/${encodeURIComponent(secretId)}/versions/latest:access`,
  });
  const body = response.data as SecretManagerAccessResponse;
  const encoded = asText(body.payload?.data);
  if (!encoded) {
    throw new Error(`Secret Manager did not return ${secretId}.`);
  }
  return Buffer.from(encoded, "base64").toString("utf8").trim();
}

async function loadWebhookSecretCandidates(): Promise<StripeSignatureCandidate[]> {
  const [platformSecret, connectSecret] = await Promise.all([
    asText(process.env.STRIPE_WEBHOOK_SECRET) ||
      accessSecretManagerValue("STRIPE_WEBHOOK_SECRET"),
    asText(process.env.STRIPE_CONNECT_WEBHOOK_SECRET) ||
      accessSecretManagerValue("STRIPE_CONNECT_WEBHOOK_SECRET"),
  ]);
  const candidates: StripeSignatureCandidate[] = [];
  if (platformSecret) candidates.push({ source: "platform", secret: platformSecret });
  if (connectSecret) candidates.push({ source: "connect", secret: connectSecret });
  if (candidates.length === 0) {
    throw new Error("Stripe webhook signing secrets are not configured.");
  }
  return candidates;
}

function getWebhookSecretCandidates(): Promise<StripeSignatureCandidate[]> {
  webhookSecretCandidatesPromise ??= loadWebhookSecretCandidates().catch((error) => {
    webhookSecretCandidatesPromise = null;
    throw error;
  });
  return webhookSecretCandidatesPromise;
}

async function verifyAndParseStripeEvent({
  rawBody,
  signatureHeader,
}: {
  rawBody: string;
  signatureHeader: string | null;
}): Promise<StripeSignatureVerification> {
  if (!signatureHeader) {
    throw new Error("Missing Stripe signature header.");
  }

  const candidates = await getWebhookSecretCandidates();
  let lastError: Error | null = null;
  for (const candidate of candidates) {
    try {
      verifyStripeSignature({
        rawBody,
        signatureHeader,
        secret: candidate.secret,
      });
      const parsed = JSON.parse(rawBody) as StripeEvent;
      return { event: parsed, source: candidate.source };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Stripe signature verification failed.");
    }
  }
  throw lastError ?? new Error("Stripe signature verification failed.");
}

async function markStripeWebhookEventStarted({
  db,
  event,
  source,
}: {
  db: Firestore;
  event: StripeEvent;
  source: StripeWebhookSource;
}): Promise<{ shouldProcess: boolean; eventRef?: DocumentReference }> {
  const eventId = asText(event.id);
  if (!eventId) return { shouldProcess: true };

  const eventRef = db.collection(STRIPE_WEBHOOK_EVENT_COLLECTION).doc(eventId);
  try {
    await eventRef.create({
      id: eventId,
      type: asText(event.type),
      livemode: event.livemode === true,
      source,
      sourceAccount: asText(event.account) || null,
      status: "processing",
      receivedBy: "vercel-webhook",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { shouldProcess: true, eventRef };
  } catch (error) {
    const code = typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";
    const message = error instanceof Error ? error.message : "";
    if (code === "6" || code === "already-exists" || /already exists/i.test(message)) {
      return { shouldProcess: false, eventRef };
    }
    throw error;
  }
}

async function markStripeWebhookEventFinished({
  eventRef,
  status,
  error,
}: {
  eventRef?: DocumentReference;
  status: "processed" | "ignored" | "error";
  error?: unknown;
}) {
  if (!eventRef) return;
  await eventRef.set(
    {
      status,
      ...(error ? { error: asText(error instanceof Error ? error.message : error).slice(0, 500) } : {}),
      updatedAt: FieldValue.serverTimestamp(),
      processedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

async function findBookingByPaymentIntentId({
  db,
  paymentIntentId,
}: {
  db: Firestore;
  paymentIntentId: string;
}) {
  const intentId = asText(paymentIntentId);
  if (!intentId) return null;
  const snapshot = await db
    .collection(BOOKINGS_COLLECTION)
    .where("paymentIntentId", "==", intentId)
    .limit(1)
    .get();
  return snapshot.docs[0] ?? null;
}

async function bookingRefFromStripeObject({
  db,
  stripeObject,
}: {
  db: Firestore;
  stripeObject: Record<string, unknown>;
}): Promise<DocumentReference | null> {
  const metadata = asNestedRecord(stripeObject, "metadata");
  const bookingId =
    asText(metadata.bookingId) ||
    asText(metadata.requestId) ||
    asText(stripeObject.transfer_group);
  if (bookingId) {
    const directRef = db.collection(BOOKINGS_COLLECTION).doc(bookingId);
    const directSnap = await directRef.get();
    if (directSnap.exists) return directSnap.ref;
  }

  const paymentIntentId =
    asStripeObjectId(stripeObject.payment_intent) ||
    asText(stripeObject.id);
  const bookingDoc = await findBookingByPaymentIntentId({ db, paymentIntentId });
  return bookingDoc?.ref ?? null;
}

function normalizeStripeRequirements(value: unknown) {
  const requirements = asRecord(value);
  const normalizeList = (list: unknown) =>
    Array.isArray(list)
      ? list.map(asText).filter(Boolean).sort()
      : [];
  return {
    currentlyDue: normalizeList(requirements.currently_due),
    eventuallyDue: normalizeList(requirements.eventually_due),
    pastDue: normalizeList(requirements.past_due),
    pendingVerification: normalizeList(requirements.pending_verification),
    disabledReason: asText(requirements.disabled_reason) || null,
  };
}

function normalizeExternalAccount(value: unknown) {
  const externalAccount = asRecord(value);
  if (!Object.keys(externalAccount).length) return null;
  const availablePayoutMethods = Array.isArray(externalAccount.available_payout_methods)
    ? externalAccount.available_payout_methods.map(asText).filter(Boolean)
    : [];
  return {
    id: asText(externalAccount.id) || null,
    object: asText(externalAccount.object) || null,
    brand: asText(externalAccount.brand) || asText(externalAccount.bank_name) || null,
    country: asText(externalAccount.country) || null,
    currency: asText(externalAccount.currency).toLowerCase() || null,
    last4: asText(externalAccount.last4) || null,
    defaultForCurrency: externalAccount.default_for_currency === true,
    availablePayoutMethods,
  };
}

function defaultPayoutExternalAccount(account: Record<string, unknown>) {
  const externalAccounts = asNestedRecord(account, "external_accounts");
  const data = Array.isArray(externalAccounts.data) ? externalAccounts.data : [];
  const audAccounts = data
    .map(asRecord)
    .filter((item) => asText(item.currency).toLowerCase() === "aud");
  return (
    audAccounts.find((item) => item.default_for_currency === true) ||
    audAccounts[0] ||
    null
  );
}

function summarizeStripeConnectedAccount(account: Record<string, unknown>) {
  const externalAccount = normalizeExternalAccount(defaultPayoutExternalAccount(account));
  const capabilities = asNestedRecord(account, "capabilities");
  return {
    accountId: asText(account.id) || null,
    country: asText(account.country) || "AU",
    businessType: asText(account.business_type) || null,
    chargesEnabled: account.charges_enabled === true,
    payoutsEnabled: account.payouts_enabled === true,
    detailsSubmitted: account.details_submitted === true,
    transfersCapability: asText(capabilities.transfers).toLowerCase() || null,
    requirements: normalizeStripeRequirements(account.requirements),
    futureRequirements: normalizeStripeRequirements(account.future_requirements),
    defaultPayoutExternalAccount: externalAccount,
    availablePayoutMethods: externalAccount?.availablePayoutMethods ?? [],
    updatedAt: FieldValue.serverTimestamp(),
  };
}

async function updateHostStripeAccountState({
  db,
  hostUid,
  account,
}: {
  db: Firestore;
  hostUid: string;
  account: Record<string, unknown>;
}) {
  const normalizedHostUid = asText(hostUid) || asText(asNestedRecord(account, "metadata").hostUid);
  const accountId = asText(account.id);
  if (!normalizedHostUid || !accountId) return;

  const summary = summarizeStripeConnectedAccount(account);
  const timestamp = FieldValue.serverTimestamp();
  await Promise.all([
    db.collection(USERS_COLLECTION).doc(normalizedHostUid).set(
      {
        hostStripe: summary,
        stripeConnectAccountId: accountId,
        updatedAt: timestamp,
      },
      { merge: true },
    ),
    db.collection(STRIPE_CONNECTED_ACCOUNT_COLLECTION).doc(accountId).set(
      {
        accountId,
        hostUid: normalizedHostUid,
        country: summary.country,
        transfersCapability: summary.transfersCapability,
        payoutsEnabled: summary.payoutsEnabled,
        detailsSubmitted: summary.detailsSubmitted,
        requirements: summary.requirements,
        futureRequirements: summary.futureRequirements,
        updatedAt: timestamp,
      },
      { merge: true },
    ),
  ]);
}

async function handleStripePlatformEvent({
  db,
  event,
}: {
  db: Firestore;
  event: StripeEvent;
}) {
  const eventType = asText(event.type);
  const object = asRecord(event.data?.object);

  switch (eventType) {
    case "payment_intent.succeeded": {
      const metadata = asNestedRecord(object, "metadata");
      const bookingId = asText(metadata.bookingId) || asText(metadata.requestId);
      const chargeId = extractChargeIdFromPaymentIntent(object);
      const paymentMethodId = extractPaymentMethodIdFromPaymentIntent(object);
      const update = {
        paymentStatus: "succeeded",
        paymentIntentId: asText(object.id),
        ...(chargeId ? { stripeChargeId: chargeId } : {}),
        ...(paymentMethodId ? { savedPaymentMethodId: paymentMethodId } : {}),
        stripeCustomerId: asStripeObjectId(object.customer) || null,
        stripeTransferGroup: asText(object.transfer_group) || bookingId || null,
        stripePaymentSucceededAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (bookingId) {
        const requestRef = db.collection(STRIPE_REQUEST_COLLECTION).doc(bookingId);
        const bookingRef = db.collection(BOOKINGS_COLLECTION).doc(bookingId);
        const [requestSnap, bookingSnap] = await Promise.all([
          requestRef.get(),
          bookingRef.get(),
        ]);
        const requestStatus = asText(requestSnap.data()?.status);
        const shouldTriggerServerFinalization =
          requestSnap.exists &&
          !bookingSnap.exists &&
          !["client_completed", "completed"].includes(requestStatus);
        await requestRef.set(
          {
            ...update,
            ...(shouldTriggerServerFinalization
              ? {
                  status: "client_completed",
                  clientCompletedAt: FieldValue.serverTimestamp(),
                  serverReconciledClientCompletionAt: FieldValue.serverTimestamp(),
                }
              : {}),
          },
          { merge: true },
        );
        if (bookingSnap.exists) {
          await bookingRef.set(update, { merge: true });
        }
      }
      return { handled: true };
    }

    case "payment_intent.payment_failed": {
      const metadata = asNestedRecord(object, "metadata");
      const requestId = asText(metadata.requestId) || asText(metadata.bookingId);
      if (requestId) {
        await db.collection(STRIPE_REQUEST_COLLECTION).doc(requestId).set(
          {
            paymentStatus: "failed",
            error: asText(asNestedRecord(object, "last_payment_error").message) || "Payment failed.",
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
      return { handled: true };
    }

    case "charge.refunded": {
      const bookingRef = await bookingRefFromStripeObject({ db, stripeObject: object });
      if (bookingRef) {
        await bookingRef.set(
          {
            refundStatus: object.refunded === true ? "refunded" : "partial_refund",
            stripeRefundedChargeId: asText(object.id) || null,
            refundedAmountCents: Number.isSafeInteger(object.amount_refunded)
              ? object.amount_refunded
              : null,
            refundUpdatedAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
      return { handled: true };
    }

    case "charge.dispute.created": {
      const bookingRef = await bookingRefFromStripeObject({ db, stripeObject: object });
      if (bookingRef) {
        await bookingRef.set(
          {
            disputeStatus: asText(object.status) || "needs_response",
            stripeDisputeId: asText(object.id) || null,
            disputeAmountCents: Number.isSafeInteger(object.amount) ? object.amount : null,
            disputeCreatedAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
      return { handled: true };
    }

    case "transfer.created":
    case "transfer.updated":
    case "transfer.reversed": {
      const bookingRef = await bookingRefFromStripeObject({ db, stripeObject: object });
      if (bookingRef) {
        const bookingSnap = await bookingRef.get();
        const currentStatus = asText(bookingSnap.data()?.hostSettlement?.status);
        const finalStatuses = new Set(["payout_created", "paid", "no_host_payable"]);
        const shouldPreserveStatus = finalStatuses.has(currentStatus);
        await bookingRef.set(
          {
            stripeTransferId: asText(object.id) || null,
            hostSettlement: {
              status: shouldPreserveStatus
                ? currentStatus
                : eventType === "transfer.reversed"
                  ? "transfer_reversed_manual_review"
                  : "transfer_created",
              transferId: asText(object.id) || null,
              transferAmountCents: Number.isSafeInteger(object.amount) ? object.amount : null,
              transferGroup: asText(object.transfer_group) || null,
              transferEventType: eventType,
              updatedAt: FieldValue.serverTimestamp(),
            },
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
      return { handled: true };
    }

    default:
      return { handled: false, reason: "ignored-event-type" };
  }
}

async function handleStripeConnectEvent({
  db,
  event,
}: {
  db: Firestore;
  event: StripeEvent;
}) {
  const eventType = asText(event.type);
  const object = asRecord(event.data?.object);

  switch (eventType) {
    case "account.updated": {
      const accountId = asText(object.id);
      let hostUid = asText(asNestedRecord(object, "metadata").hostUid);
      if (!hostUid && accountId) {
        const mapping = await db.collection(STRIPE_CONNECTED_ACCOUNT_COLLECTION).doc(accountId).get();
        hostUid = asText(mapping.data()?.hostUid);
      }
      if (hostUid && accountId) {
        await updateHostStripeAccountState({ db, hostUid, account: object });
      }
      return { handled: true };
    }

    case "account.external_account.created":
    case "account.external_account.updated":
    case "account.external_account.deleted": {
      const accountId = asText(event.account);
      if (accountId) {
        const mapping = await db.collection(STRIPE_CONNECTED_ACCOUNT_COLLECTION).doc(accountId).get();
        const hostUid = asText(mapping.data()?.hostUid);
        if (hostUid) {
          await db.collection(USERS_COLLECTION).doc(hostUid).set(
            {
              hostStripe: {
                payoutExternalAccountChangedAt: FieldValue.serverTimestamp(),
                payoutExternalAccountEventType: eventType,
              },
            },
            { merge: true },
          );
        }
      }
      return { handled: true };
    }

    case "payout.created":
    case "payout.updated":
    case "payout.paid":
    case "payout.failed": {
      const bookingRef = await bookingRefFromStripeObject({ db, stripeObject: object });
      if (bookingRef) {
        const failed = eventType === "payout.failed";
        const paid = eventType === "payout.paid" || asText(object.status) === "paid";
        await bookingRef.set(
          {
            stripePayoutId: asText(object.id) || null,
            hostSettlement: {
              status: failed ? "payout_failed" : paid ? "paid" : "payout_created",
              payoutId: asText(object.id) || null,
              payoutStatus: asText(object.status) || null,
              payoutFailureCode: asText(object.failure_code) || null,
              payoutFailureMessage: asText(object.failure_message) || null,
              payoutMethod: asText(object.method) || null,
              payoutAmountCents: Number.isSafeInteger(object.amount) ? object.amount : null,
              payoutEventType: eventType,
              updatedAt: FieldValue.serverTimestamp(),
              ...(paid ? { paidAt: FieldValue.serverTimestamp() } : {}),
            },
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }
      return { handled: true };
    }

    default:
      return { handled: false, reason: "ignored-event-type" };
  }
}

export async function POST(request: NextRequest) {
  const db = await getAdminDb();
  let verification: StripeSignatureVerification | null = null;
  let eventRef: DocumentReference | undefined;

  try {
    const rawBody = await request.text();
    verification = await verifyAndParseStripeEvent({
      rawBody,
      signatureHeader: request.headers.get("stripe-signature"),
    });

    const started = await markStripeWebhookEventStarted({
      db,
      event: verification.event,
      source: verification.source,
    });
    eventRef = started.eventRef;
    if (!started.shouldProcess) {
      return NextResponse.json(
        { received: true, duplicate: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const result =
      verification.source === "connect"
        ? await handleStripeConnectEvent({ db, event: verification.event })
        : await handleStripePlatformEvent({ db, event: verification.event });

    await markStripeWebhookEventFinished({
      eventRef,
      status: result.handled ? "processed" : "ignored",
    });

    return NextResponse.json(
      { received: true, source: verification.source, ...result },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Stripe Vercel webhook failed", {
      eventId: asText(verification?.event.id),
      eventType: asText(verification?.event.type),
      source: verification?.source ?? null,
      error: error instanceof Error ? error.message : "Unknown Stripe webhook failure.",
    });
    await markStripeWebhookEventFinished({
      eventRef,
      status: "error",
      error,
    }).catch(() => undefined);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Stripe webhook failed." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, route: "stripe-webhook" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
