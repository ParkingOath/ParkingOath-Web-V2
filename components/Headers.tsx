import * as React from "react";

import { cn } from "./utils";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
}

const levelStyles: Record<NonNullable<HeadingProps["level"]>, string> = {
  1: "text-4xl font-semibold tracking-tight sm:text-5xl",
  2: "text-3xl font-semibold tracking-tight sm:text-4xl",
  3: "text-2xl font-semibold tracking-tight sm:text-3xl",
  4: "text-xl font-semibold tracking-tight sm:text-2xl",
  5: "text-lg font-semibold tracking-tight",
};

const defaultColor = "text-slate-900";

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  const hasColor = className?.includes("text-");
  return (
    <Tag
      className={cn(levelStyles[level], !hasColor && defaultColor, className)}
      {...props}
    />
  );
}

export const H1 = (props: Omit<HeadingProps, "level">) => (
  <Heading level={1} {...props} />
);

export const H2 = (props: Omit<HeadingProps, "level">) => (
  <Heading level={2} {...props} />
);

export const H3 = (props: Omit<HeadingProps, "level">) => (
  <Heading level={3} {...props} />
);

export const H4 = (props: Omit<HeadingProps, "level">) => (
  <Heading level={4} {...props} />
);

export const H5 = (props: Omit<HeadingProps, "level">) => (
  <Heading level={5} {...props} />
);
