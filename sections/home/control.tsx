"use client";

import Image from "next/image";
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
  return (
    <section className="bg-white">
      <Container className="py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex justify-center lg:justify-start">
            <Image
              src={phoneGraphic}
              alt="ParkingOath mobile app"
              className="w-full max-w-md object-contain md:scale-125 lg:scale-150"
              priority
            />
          </div>
          <div className="space-y-6">
            <div>
              <H2 className="text-3xl sm:text-4xl lg:text-5xl">
                You&apos;re always in{" "}
                <span className="text-brand">control</span>
              </H2>
            </div>
            <div>
              <Text>
                Hosting on Parking Oath doesn&apos;t mean giving up access to
                your space. You decide when, how, and if your parking
                space is used.
              </Text>
            </div>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="mt-1 text-[#5b5bff]">
                    <HiCheckCircle size={20} />
                  </span>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <Text tone="muted">{item.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ControlSection;
