"use client";

import * as React from "react";
import Link from "next/link";

import { Button, Text } from "@/components";
import { buttonClasses } from "./Button";
import { cn } from "./utils";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export interface ProcessStepsProps {
  id?: string;
  title: React.ReactNode;
  steps: ProcessStep[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function ProcessSteps({
  id,
  title,
  steps,
  ctaLabel = "Get Early Access",
  ctaHref = "/early-access",
  onCtaClick,
  className,
}: ProcessStepsProps) {
  return (
    <section
      id={id}
      className={cn(
        "bg-[#f5f7fb] bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-black sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.step}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-200/60 bg-white p-8 pt-10 shadow-[0_8px_30px_rgb(15,23,42,0.04)] transition-all hover:shadow-[0_8px_40px_rgb(15,23,42,0.08)]"
            >
              <div className="absolute -right-[1px] -top-[1px] flex h-14 w-32 items-center justify-center rounded-bl-[2rem] rounded-tr-[2.5rem] bg-[#f5f7fb] pl-4 pb-4">
                <div className="flex h-10 w-24 items-center justify-center rounded-full bg-white text-sm font-bold text-black border border-slate-200/50 shadow-sm">
                  {step.step}
                </div>
              </div>
              <div className="flex mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-110">
                  <span className="scale-[1.2]">
                    {step.icon}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black tracking-tight">
                  {step.title}
                </h3>
                <Text tone="muted" className="text-[17px] leading-relaxed">
                  {step.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          {onCtaClick ? (
            <Button onClick={onCtaClick}>
              {ctaLabel} <span aria-hidden="true">↗</span>
            </Button>
          ) : (
            <Link href={ctaHref} className={buttonClasses({ size: "md" })}>
              {ctaLabel} <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
