"use client";

import Image from "next/image";

import { ContactForm, Container, H2, Text } from "@/components";
import { CONTACT_CONTENT } from "@/constants/contact";
import contactBackground from "@/assets/landing_page/contact/background.png";
import contactIcon from "@/assets/landing_page/contact/icon.png";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactBackground.src})` }}
    >
      <Container className="py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div>
              <H2 className="text-3xl sm:text-4xl lg:text-5xl">
                {CONTACT_CONTENT.title.prefix} <span className="text-brand">{CONTACT_CONTENT.title.highlight}</span> {CONTACT_CONTENT.title.suffix}
              </H2>
            </div>
            <div className="space-y-4">
              <Text>
                {CONTACT_CONTENT.description1}
              </Text>
              <Text tone="muted">
                {CONTACT_CONTENT.description2}
              </Text>
            </div>
            <div>
              <Image
                src={contactIcon}
                alt="Support illustration"
                className="w-full max-w-md object-contain"
                priority
              />
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
