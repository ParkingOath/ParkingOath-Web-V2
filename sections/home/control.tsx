"use client";

import Image from "next/image";
import { HiCheckCircle } from "react-icons/hi2";

import { Container, H2, Text } from "@/components";
import { CONTROL_CONTENT, CONTROL_ITEMS } from "@/constants/control";
import phoneGraphic from "@/assets/landing_page/phone/graphic.png";

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
                {CONTROL_CONTENT.title.text1}{" "}
                <span className="text-brand">{CONTROL_CONTENT.title.highlight}</span>{" "}
                {CONTROL_CONTENT.title.text2}
              </H2>
            </div>
            <div>
              <Text>
                {CONTROL_CONTENT.description}
              </Text>
            </div>
            <div className="space-y-6">
              {CONTROL_ITEMS.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="mt-1 text-[#5b5bff]">
                    <HiCheckCircle size={20} />
                  </span>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-black">
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
