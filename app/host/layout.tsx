import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host | ParkingOath",
  description:
    "List your driveway or parking space and earn on your schedule with ParkingOath.",
};

export default function HostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
