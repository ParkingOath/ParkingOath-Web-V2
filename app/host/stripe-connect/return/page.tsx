import type { Metadata } from "next";
import { StripeConnectRedirect } from "../StripeConnectRedirect";

export const metadata: Metadata = {
  title: "Return to ParkingOath",
  description: "Return to the ParkingOath app after completing payout setup.",
  robots: { index: false, follow: false },
};

export default function StripeConnectReturnPage() {
  return (
    <StripeConnectRedirect
      title="Returning you to ParkingOath…"
      description="ParkingOath will check your Stripe payout status when the app opens and show anything that still needs to be completed."
    />
  );
}
