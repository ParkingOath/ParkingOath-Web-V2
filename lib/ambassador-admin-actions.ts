"use client";

import { httpsCallable } from "firebase/functions";
import { getClientAuth, getClientFunctions } from "@/lib/firebase-client";

function callable<TInput, TOutput>(name: string, input: TInput) {
  const auth = getClientAuth();
  if (!auth.currentUser) return Promise.reject(new Error("Your Firebase sign-in has expired. Please sign in again."));
  return auth.currentUser.getIdToken(true)
    .then(() => httpsCallable<TInput, TOutput>(getClientFunctions(), name)(input))
    .then((result) => result.data);
}

export const approveAmbassador = (ambassadorId: string) =>
  callable<{ ambassadorId: string }, { ambassadorId: string; status: string; referralCode: string; referralLink: string }>(
    "approveAmbassador", { ambassadorId }
  );

export const savePayoutDetails = (input: { ambassadorId: string; accountName: string; bsb: string; accountNumber: string }) =>
  callable<typeof input, { ambassadorId: string; payoutsEnabled: boolean; method: string }>(
    "setAmbassadorPayoutDetails", input
  );

export const markPayoutPaid = (input: { payoutRunId: string; paymentReference: string }) =>
  callable<typeof input, { paid: boolean; idempotent: boolean; payoutRunId: string }>(
    "markAmbassadorPayoutPaid", input
  );
