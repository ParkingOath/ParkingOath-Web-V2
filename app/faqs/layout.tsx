import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | ParkingOath",
  description:
    "Find answers to common questions about hosting and parking with ParkingOath.",
};

export default function FaqLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
