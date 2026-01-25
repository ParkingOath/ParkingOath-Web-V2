import * as React from "react";

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
    <div className={cn("space-y-8", className)}>
      {items.map((item) => (
        <React.Fragment key={item.title}>
          {renderItem ? (
            renderItem(item)
          ) : (
            <div className="flex gap-4">
              {item.icon ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b5bff] text-sm font-semibold text-white">
                  {item.icon}
                </div>
              ) : null}
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-900">
                  {item.title}
                </p>
                <Text tone="muted">{item.description}</Text>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
