"use client";

import * as React from "react";
import { motion } from "framer-motion";

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

const listContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 },
  },
};

export function ProcessSteps({
  id,
  title,
  steps,
  ctaLabel = "Get Started",
  onCtaClick,
  className,
}: ProcessStepsProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.section
      id={id}
      className={cn(
        "bg-[#f5f7fb] bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px]",
        className
      )}
      initial="hidden"
      animate={hovered ? "show" : "hidden"}
      onHoverStart={() => setHovered(true)}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <motion.div
          className="text-center"
          variants={{
            hidden: { opacity: 0, y: -24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2 },
            },
          }}
        >
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </motion.div>
        <motion.div
          className="mt-12 grid gap-8 lg:grid-cols-3"
          variants={listContainer}
        >
          {steps.map((step) => (
            <motion.div
              key={step.step}
              className="relative rounded-2xl border border-slate-200/70 bg-white px-6 py-6 shadow-sm"
              variants={listItem}
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
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-10 flex justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, delay: 0.6 },
            },
          }}
        >
          <Button onClick={onCtaClick}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
