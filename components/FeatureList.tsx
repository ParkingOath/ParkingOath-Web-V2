import * as React from "react";

import { StaggerItem, StaggerReveal } from "./Reveal";
import { Text } from "./Text";
import { cn } from "./utils";

export type FeatureItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export interface FeatureListProps {
  items: FeatureItem[];
  className?: string;
  renderItem?: (item: FeatureItem) => React.ReactNode;
}

export function FeatureList({ items, className, renderItem }: FeatureListProps) {
  return (
    <StaggerReveal className={cn("space-y-8", className)}>
      {items.map((item) => (
        <StaggerItem key={item.title}>
          {renderItem ? (
            renderItem(item)
          ) : (
            <div className="flex gap-4">
              {item.icon ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {item.icon}
                </div>
              ) : null}
              <div className="space-y-2">
                <p className="text-base font-semibold text-black">
                  {item.title}
                </p>
                {item.description ? <Text tone="muted">{item.description}</Text> : null}
              </div>
            </div>
          )}
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}
