"use client";

import { useEffect } from "react";

const APP_DASHBOARD_URL = "parkingoathappv2://host/dashboard";

type StripeConnectRedirectProps = {
  title: string;
  description: string;
};

export function StripeConnectRedirect({
  title,
  description,
}: StripeConnectRedirectProps) {
  useEffect(() => {
    window.location.replace(APP_DASHBOARD_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <section
        aria-labelledby="stripe-connect-title"
        className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1b3cc4] text-xl font-bold text-white"
        >
          P
        </div>
        <h1
          id="stripe-connect-title"
          className="text-3xl font-semibold tracking-tight text-slate-950"
        >
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
        <a
          href={APP_DASHBOARD_URL}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1b3cc4] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#152f9e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b3cc4]"
        >
          Return to ParkingOath
        </a>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          If the app does not open automatically, use the button above.
        </p>
      </section>
    </main>
  );
}
