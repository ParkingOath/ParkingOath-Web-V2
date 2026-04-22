import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Early Access | ParkingOath",
  description:
    "Register for early host access and get priority onboarding with ParkingOath.",
};

export default function EarlyAccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
