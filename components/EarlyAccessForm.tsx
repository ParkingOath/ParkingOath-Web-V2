"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { createMetaEventId, getBrowserCookie } from "@/lib/meta-browser";

interface EarlyAccessFormProps {
  pageName?: string;
  redirectHref?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
}

export function EarlyAccessForm({
  pageName = "Host",
  redirectHref = "/thank-you",
  title = "Reserve Your Spot",
  description = "Register your interest to be notified when hosting access opens in your area.",
  submitLabel = "Register interest",
  className,
}: EarlyAccessFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const leadEventId = createMetaEventId("lead");

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      eventSourceUrl: window.location.href,
      fbc: getBrowserCookie("_fbc"),
      fbp: getBrowserCookie("_fbp"),
      location: String(formData.get("location") ?? ""),
      frequency: String(formData.get("frequency") ?? ""),
      metaEventId: leadEventId,
      pageName,
    };

    try {
      const response = await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message ?? "Submission failed");
      }

      form.reset();
      const redirectUrl = new URL(redirectHref, window.location.origin);
      redirectUrl.searchParams.set("lead_id", leadEventId);
      router.push(`${redirectUrl.pathname}${redirectUrl.search}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <div className={className ?? "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"}>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {description ? <Text tone="muted">{description}</Text> : null}
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            First Name
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="First name"
              type="text"
              name="firstName"
              required
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Last Name
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Last name"
              type="text"
              name="lastName"
              required
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Email
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Your email"
            type="email"
            name="email"
            required
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Location / Suburb
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Location / Suburb"
            type="text"
            name="location"
            required
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Usage Frequency
          <select
            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            name="frequency"
            required
            defaultValue=""
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.875rem center",
              backgroundSize: "1.25rem",
            }}
          >
            <option value="" disabled>
              How often would you use the service?
            </option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </label>

        <Button type="submit" className="w-full justify-center" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : submitLabel} <span aria-hidden="true">↗</span>
        </Button>

        {status === "error" && (
          <Text size="sm" className="text-red-600">
            {errorMessage ?? "Submission failed. Please try again."}
          </Text>
        )}
      </form>

      <Text size="sm" className="mt-6 text-center text-slate-500">
        By submitting this form, you agree to hear from ParkingOath about host launch updates.
      </Text>
    </div>
  );
}
