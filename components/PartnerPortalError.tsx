"use client";

export function PartnerPortalError({ reset }: { reset: () => void }) {
  return <main className="min-h-screen bg-slate-50 px-6 py-20">
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Unable to load your portal</h1>
      <p className="mt-4 text-slate-600">Please try again. If this continues, contact apps@parkingoath.com so we can help.</p>
      <button onClick={reset} className="mt-6 rounded-xl bg-brand px-4 py-3 font-semibold text-white">Try again</button>
      <a href="/login" className="mt-4 block text-sm text-brand underline">Return to sign in</a>
    </div>
  </main>;
}
