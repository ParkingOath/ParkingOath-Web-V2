import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { LoginForm } from "@/app/login/LoginForm";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function LoginPage() {
  return <main className="min-h-screen bg-slate-50 py-20"><Container><div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm"><H1>Partner sign in</H1><p className="mt-4 text-slate-600">Approved Ambassadors and ParkingOath administrators can sign in securely by email.</p><LoginForm /></div></Container></main>;
}
