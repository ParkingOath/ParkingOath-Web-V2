"use client";

async function adminAction<T>(
  action: "approveAmbassador" | "setAmbassadorPayoutDetails" | "markAmbassadorPayoutPaid",
  input: Record<string, unknown>,
): Promise<T> {
  const response = await fetch("/api/admin/ambassador-actions", {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, input }),
  });
  const body = (await response.json().catch(() => ({}))) as {
    result?: T;
    error?: string;
  };
  if (!response.ok || body.result === undefined) {
    throw new Error(body.error || "The operation could not be completed.");
  }
  return body.result;
}

export const approveAmbassador = (ambassadorId: string) =>
  adminAction<{
    ambassadorId: string;
    status: string;
    referralCode: string;
    referralLink: string;
    signInEmailSent: boolean;
  }>("approveAmbassador", { ambassadorId });

export const savePayoutDetails = (input: {
  ambassadorId: string;
  accountName: string;
  bsb: string;
  accountNumber: string;
}) =>
  adminAction<{
    ambassadorId: string;
    payoutsEnabled: boolean;
    method: string;
  }>("setAmbassadorPayoutDetails", input);

export const markPayoutPaid = (input: {
  payoutRunId: string;
  paymentReference: string;
}) =>
  adminAction<{ paid: boolean; idempotent: boolean; payoutRunId: string }>(
    "markAmbassadorPayoutPaid",
    input,
  );
