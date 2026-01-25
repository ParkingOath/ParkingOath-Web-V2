"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

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
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function AnimatedFeatureSection({
  id,
  backgroundImage,
  title,
  description,
  items,
  illustration,
  className,
}: AnimatedFeatureSectionProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.section
      id={id}
      className={cn("bg-cover bg-center bg-no-repeat", className)}
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
      initial="hidden"
      animate={hovered ? "show" : "hidden"}
      onHoverStart={() => setHovered(true)}
    >
      <Container className="py-20 lg:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={{
            hidden: { opacity: 0, y: -24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            },
          }}
        >
          <H2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</H2>
          {description ? (
            <Text className="mt-4 text-base sm:text-lg" tone="muted">
              {description}
            </Text>
          ) : null}
        </motion.div>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={listContainer}>
            <FeatureList
              items={items}
              renderItem={(item) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4"
                  variants={listItem}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5b5bff] text-white">
                    <span className="flex h-5 w-5 items-center justify-center">
                      {item.icon}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <Text tone="muted">{item.description}</Text>
                  </div>
                </motion.div>
              )}
            />
          </motion.div>
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            variants={{
              hidden: { opacity: 0, x: 40 },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.6,
                },
              },
            }}
          >
            <Image
              src={illustration}
              alt="Feature illustration"
              className="w-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
