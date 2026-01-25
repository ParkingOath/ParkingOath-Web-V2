"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import { ContactForm, Container, H2, Text } from "@/components";
import contactBackground from "@/assets/landing_page/contact/background.png";
import contactIcon from "@/assets/landing_page/contact/icon.png";

const ContactSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.section
      id="contact"
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactBackground.src})` }}
      initial="hidden"
      animate={hovered ? "show" : "hidden"}
      onHoverStart={() => setHovered(true)}
    >
      <Container className="py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1 },
                },
              }}
            >
              <H2 className="text-3xl sm:text-4xl lg:text-5xl">
                Have a <span className="text-[#1b3cc4]">question</span> before
                hosting?
              </H2>
            </motion.div>
            <motion.div
              className="space-y-4"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, delay: 0.15 },
                },
              }}
            >
              <Text>
                If you&apos;re unsure about anything - from listing your space
                to how availability works - we&apos;re here to help.
              </Text>
              <Text tone="muted">
                No chatbots, no long forms. Just a simple way to reach us.
              </Text>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, delay: 0.3 },
                },
              }}
            >
              <Image
                src={contactIcon}
                alt="Support illustration"
                className="w-full max-w-md object-contain"
                priority
              />
            </motion.div>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.1, delay: 0.35 },
              },
            }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default ContactSection;
