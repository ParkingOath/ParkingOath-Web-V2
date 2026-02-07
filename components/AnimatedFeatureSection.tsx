"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";

import { Container, FeatureList, H2, Text } from "@/components";
import { cn } from "./utils";

export type AnimatedFeatureSectionItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export interface AnimatedFeatureSectionProps {
  id?: string;
  backgroundImage: StaticImageData;
  title: React.ReactNode;
  description?: string;
  items: AnimatedFeatureSectionItem[];
  illustration: StaticImageData;
  imagePosition?: "left" | "right";
  illustrationClassName?: string;
  className?: string;
}

export function AnimatedFeatureSection({
  id,
  backgroundImage,
  title,
  description,
  items,
  illustration,
  imagePosition = "right",
  illustrationClassName = "rounded-3xl shadow-md",
  className,
}: AnimatedFeatureSectionProps) {
  return (
    <section
      id={id}
      className={cn("bg-cover bg-center bg-no-repeat", className)}
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <Container className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <H2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</H2>
          {description ? (
            <Text className="mt-4 text-base sm:text-lg" tone="muted">
              {description}
            </Text>
          ) : null}
        </div>
        <div
          className={cn(
            "mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]",
            imagePosition === "left" && "lg:grid-cols-[0.95fr_1.05fr]"
          )}
        >
          <div className={cn(imagePosition === "left" && "lg:order-2")}>
            <FeatureList
              items={items}
              renderItem={(item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <span className="flex h-5 w-5 items-center justify-center">
                      {item.icon}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-black">
                      {item.title}
                    </p>
                    <Text tone="muted">{item.description}</Text>
                  </div>
                </div>
              )}
            />
          </div>
          <div
            className={cn(
              "relative mx-auto w-full max-w-md lg:max-w-none",
              imagePosition === "left" && "lg:order-1"
            )}
          >
            <Image
              src={illustration}
              alt="Feature illustration"
              className={cn("w-full object-contain", illustrationClassName)}
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
