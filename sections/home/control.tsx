"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";

import { Container, H2, Text } from "@/components";
import phoneGraphic from "@/assets/landing_page/phone/graphic.png";

const items = [
  {
    title: "Your availability",
    description:
      "Only list your space when it works for you. You can update or pause availability at any time.",
  },
  {
    title: "Your pricing",
    description: "Set a simple hourly rate or a fixed daily price.",
  },
  {
    title: "Your space rules",
    description:
      "Add notes like access instructions, gate codes, or restrictions.",
  },
];

const ControlSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.section
      className="bg-white"
      initial="hidden"
      animate={hovered ? "show" : "hidden"}
      onHoverStart={() => setHovered(true)}
    >
      <Container className="py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            className="flex justify-center lg:justify-start"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.1, ease: "easeOut" },
              },
            }}
          >
            <Image
              src={phoneGraphic}
              alt="ParkingOath mobile app"
              className="w-full max-w-md object-contain"
              style={{ transform: "scale(1.5)" }}
              priority
            />
          </motion.div>
          <div className="space-y-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, ease: "easeOut" },
                },
              }}
            >
              <H2 className="text-3xl sm:text-4xl lg:text-5xl">
                You&apos;re always in{" "}
                <span className="text-[#1b3cc4]">control</span>
              </H2>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, ease: "easeOut", delay: 0.15 },
                },
              }}
            >
              <Text>
                Hosting on Parking Oath doesn&apos;t mean giving up access to
                your space. You decide when, how, and if your parking
                space is used.
              </Text>
            </motion.div>
            <motion.div
              className="space-y-6"
              variants={{
                hidden: {},
                show: {
                  transition: { delayChildren: 0.25, staggerChildren: 0.15 },
                },
              }}
            >
              {items.map((item) => (
                <motion.div
                  key={item.title}
                  className="flex gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.9, ease: "easeOut" },
                    },
                  }}
                >
                  <span className="mt-1 text-[#5b5bff]">
                    <HiCheckCircle size={20} />
                  </span>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <Text tone="muted">{item.description}</Text>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default ControlSection;
