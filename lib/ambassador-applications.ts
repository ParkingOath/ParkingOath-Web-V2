import "server-only";

import { createHash } from "node:crypto";

import { FieldValue } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase-admin";

export type AmbassadorApplicationInput = {
  firstName: unknown;
  lastName: unknown;
  email: unknown;
  phone?: unknown;
  message?: unknown;
};

function requiredText(name: string, value: unknown, maxLength: number): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized || normalized.length > maxLength) {
    throw new Error(`${name} must contain between 1 and ${maxLength} characters.`);
  }
  return normalized;
}

function optionalText(name: string, value: unknown, maxLength: number): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (normalized.length > maxLength) {
    throw new Error(`${name} must contain no more than ${maxLength} characters.`);
  }
  return normalized;
}

export function normalizeAmbassadorApplication(input: AmbassadorApplicationInput) {
  const firstName = requiredText("First name", input.firstName, 80);
  const lastName = requiredText("Last name", input.lastName, 80);
  const email = requiredText("Email", input.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("A valid email address is required.");
  }
  return {
    displayName: `${firstName} ${lastName}`,
    email,
    phone: optionalText("Phone number", input.phone, 40),
    applicationMessage: optionalText("Message", input.message, 2_000),
  };
}

function applicationEmailReservationId(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

export async function createPendingAmbassadorApplication(
  application: ReturnType<typeof normalizeAmbassadorApplication>,
) {
  const db = await getAdminDb();
  const ambassadors = db.collection("ambassadors");
  const reservationRef = db
    .collection("ambassadorApplicationEmails")
    .doc(applicationEmailReservationId(application.email));
  const existingQuery = ambassadors.where("email", "==", application.email).limit(2);

  return db.runTransaction(async (transaction) => {
    const [reservation, existingApplications] = await Promise.all([
      transaction.get(reservationRef),
      transaction.get(existingQuery),
    ]);

    if (existingApplications.size > 1) {
      throw new Error("This email address requires administrator review.");
    }

    const existing = existingApplications.docs[0];
    if (reservation.exists) {
      const reservedAmbassadorId = reservation.data()?.ambassadorId;
      if (typeof reservedAmbassadorId !== "string" || !reservedAmbassadorId) {
        throw new Error("This application reservation is invalid.");
      }
      const reservedAmbassador =
        existing?.id === reservedAmbassadorId
          ? existing
          : await transaction.get(ambassadors.doc(reservedAmbassadorId));
      if (
        !reservedAmbassador.exists ||
        reservedAmbassador.data()?.email !== application.email
      ) {
        throw new Error("This application reservation requires administrator review.");
      }
      return {
        ambassadorId: reservedAmbassador.id,
        status: String(reservedAmbassador.data()?.status || "pending"),
        existing: true,
      };
    }

    if (existing) {
      transaction.create(reservationRef, {
        ambassadorId: existing.id,
        emailHash: reservationRef.id,
        createdAt: FieldValue.serverTimestamp(),
      });
      return {
        ambassadorId: existing.id,
        status: String(existing.data()?.status || "pending"),
        existing: true,
      };
    }

    const ambassadorRef = ambassadors.doc();
    transaction.create(ambassadorRef, {
      displayName: application.displayName,
      email: application.email,
      phone: application.phone || null,
      applicationMessage: application.applicationMessage || null,
      applicationSource: "website_ambassador_interest",
      authUid: null,
      status: "pending",
      referralCode: null,
      referralLink: null,
      payoutsEnabled: false,
      activeHostCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      approvedAt: null,
      approvedByAdminUid: null,
    });
    transaction.create(reservationRef, {
      ambassadorId: ambassadorRef.id,
      emailHash: reservationRef.id,
      createdAt: FieldValue.serverTimestamp(),
    });
    return { ambassadorId: ambassadorRef.id, status: "pending", existing: false };
  });
}
