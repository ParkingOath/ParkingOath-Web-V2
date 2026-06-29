"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "./utils";

type SafeDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
>;

export interface ContainerProps extends SafeDivProps {
  size?: "default" | "wide";
  reveal?: boolean;
}

const sizeStyles = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  className,
  reveal = true,
  size = "default",
  ...props
}: ContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const classes = cn("mx-auto w-full px-6 sm:px-8", sizeStyles[size], className);

  if (!reveal || shouldReduceMotion) {
    return <div className={classes} {...props} />;
  }

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}
