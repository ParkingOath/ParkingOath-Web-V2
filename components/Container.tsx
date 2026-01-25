import * as React from "react";

import { cn } from "./utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide";
}

const sizeStyles = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-8", sizeStyles[size], className)}
      {...props}
    />
  );
}
