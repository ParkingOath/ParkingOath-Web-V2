import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seeker | ParkingOath",
  description:
    "Find and navigate to nearby parking in Sydney with ParkingOath's smart parking tools.",
};

export default function SeekerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
