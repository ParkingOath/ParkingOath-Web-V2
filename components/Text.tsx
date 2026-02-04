import * as React from "react";

import { cn } from "./utils";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg";
  tone?: "default" | "muted";
}

const sizeStyles = {
  sm: "text-sm leading-6",
  base: "text-base leading-7",
  lg: "text-lg leading-8",
};

const toneStyles = {
  default: "text-[#334155]", // Slate 700
  muted: "text-[#64748b]", // Slate 500
};

export function Text({
  className,
  size = "base",
  tone = "default",
  ...props
}: TextProps) {
  const hasColor = className?.includes("text-");
  return (
    <p
      className={cn(
        sizeStyles[size],
        !hasColor && toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
