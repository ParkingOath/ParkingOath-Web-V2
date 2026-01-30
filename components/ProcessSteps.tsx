"use client";

import * as React from "react";

import { Button, Text } from "@/components";
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
  onCtaClick?: () => void;
  className?: string;
}

export function ProcessSteps({
  id,
  title,
  steps,
  ctaLabel = "Get Started",
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
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-slate-200/70 bg-white px-6 py-6 shadow-sm"
            >
              <span className="absolute -top-4 right-6 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                {step.step}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5b5bff] text-white">
                  {step.icon}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-base font-semibold text-slate-900">
                  {step.title}
                </p>
                <Text tone="muted">{step.description}</Text>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button onClick={onCtaClick}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
