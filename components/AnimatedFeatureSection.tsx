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
  description?: React.ReactNode;
  sectionLabel?: React.ReactNode;
  supportingText?: React.ReactNode;
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
  sectionLabel,
  supportingText,
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
            <div className="mt-4 text-base sm:text-lg text-slate-600">
              {description}
            </div>
          ) : null}
        </div>
        <div
          className={cn(
            "mt-12 grid items-left gap-15 lg:grid-cols-[1.05fr_0.95fr]",
            imagePosition === "left" && "lg:grid-cols-[0.95fr_1.05fr]"
          )}
        >
          <div className={cn("space-y-8 lg:max-w-xl", imagePosition === "left" && "lg:order-2")}>
            {sectionLabel ? (
              <p className="w-full text-left text-xl sm:text-2xl font-semibold text-black mb-8">
                {sectionLabel}
              </p>
            ) : null}
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
                    <p className="text-base sm:text-lg font-normal text-black leading-7">
                      {item.title}
                    </p>
                    {item.description ? <Text tone="muted">{item.description}</Text> : null}
                  </div>
                </div>
              )}
            />
          </div>
          <div
            className={cn(
              "relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-[24rem] xl:max-w-[26rem]",
              imagePosition === "left" && "lg:order-1"
            )}
          >
            <div className="overflow-hidden rounded-3xl shadow-md max-h-[40rem]">
              <Image
                src={illustration}
                alt="Feature illustration"
                className={cn("w-full h-full object-contain", illustrationClassName)}
                priority
              />
            </div>
          </div>
        </div>
        {supportingText ? (
          <div className="mx-auto mt-8 max-w-2xl text-center text-base sm:text-lg text-slate-600">
            {supportingText}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
