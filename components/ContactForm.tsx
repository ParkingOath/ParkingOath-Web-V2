"use client";

import * as React from "react";
import { useState } from "react";

import { Button, Text } from "@/components";
import { cn } from "./utils";

export interface ContactFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

export function ContactForm({
  title = "Send us a message",
  subtitle = "Have questions or need assistance? Our team is always ready to guide you on your journey.",
  buttonText = "Send message",
  className,
  ...props
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message ?? "Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8",
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-lg font-semibold text-black">{title}</p>
        <Text tone="muted">{subtitle}</Text>
      </div>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit} {...props}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-medium text-[#334155]">
            First Name
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#1e293b] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="First name"
              type="text"
              name="firstName"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-[#334155]">
            Last Name
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#1e293b] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Last name"
              type="text"
              name="lastName"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-medium text-[#334155]">
          Email
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#1e293b] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Your email"
            type="email"
            name="email"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-[#334155]">
          Phone Number
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#1e293b] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Phone number"
            type="tel"
            name="phone"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-[#334155]">
          Message
          <textarea
            className="min-h-[140px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1e293b] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Your message"
            name="message"
          />
        </label>
        <Button
          type="submit"
          className="w-full justify-center"
          disabled={status === "loading"}
        >
          {buttonText} <span aria-hidden="true">↗</span>
        </Button>
        {status === "success" && (
          <Text size="sm" className="text-green-600">
            Thanks! We&apos;ll be in touch shortly.
          </Text>
        )}
        {status === "error" && (
          <Text size="sm" className="text-red-600">
            {errorMessage ?? "Submission failed. Please try again."}
          </Text>
        )}
      </form>
    </div>
  );
}
