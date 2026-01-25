import * as React from "react";

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
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8",
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <Text tone="muted">{subtitle}</Text>
      </div>
      <form className="mt-6 space-y-5" {...props}>
        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Full Name
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#1b3cc4] focus:ring-2 focus:ring-[#1b3cc4]/20"
            placeholder="Your full name"
            type="text"
            name="fullName"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Email
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#1b3cc4] focus:ring-2 focus:ring-[#1b3cc4]/20"
            placeholder="Your email"
            type="email"
            name="email"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Message
          <textarea
            className="min-h-[140px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#1b3cc4] focus:ring-2 focus:ring-[#1b3cc4]/20"
            placeholder="Your message"
            name="message"
          />
        </label>
        <Button className="w-full justify-center">
          {buttonText} <span aria-hidden="true">↗</span>
        </Button>
      </form>
    </div>
  );
}
