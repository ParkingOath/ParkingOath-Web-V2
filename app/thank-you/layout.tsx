import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | ParkingOath",
  description:
    "Thanks for registering your interest to host with ParkingOath in Sydney.",
};

export default function ThankYouLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
