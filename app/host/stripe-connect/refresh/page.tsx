import type { Metadata } from "next";
import { StripeConnectRedirect } from "../StripeConnectRedirect";

export const metadata: Metadata = {
  title: "Continue payout setup in ParkingOath",
  description: "Return to ParkingOath to request a fresh Stripe payout setup link.",
  robots: { index: false, follow: false },
};

export default function StripeConnectRefreshPage() {
  return (
    <StripeConnectRedirect
      title="Your setup link has expired"
      description="Returning you to ParkingOath so you can select Continue setup and request a fresh secure link."
    />
  );
}
