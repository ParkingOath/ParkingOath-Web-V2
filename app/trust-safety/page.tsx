import type { Metadata } from "next";
import Link from "next/link";
import {
  HiOutlineBanknotes,
  HiOutlineEye,
  HiOutlineFingerPrint,
  HiOutlineHeart,
  HiOutlineLifebuoy,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { Text } from "@/components/Text";
import { trustSafetyFaqs } from "@/app/faqs/faq-data";

export const metadata: Metadata = {
  title: "Trust & Safety | ParkingOath",
  description:
    "How ParkingOath keeps drivers, hosts and their spaces safe: verified drivers, secure payments, and real Australian-based support.",
};

const pillars = [
  {
    title: "Verified drivers",
    description:
      "Every driver is identity-verified before they can book a space, through our verification partner, Didit. Hosts always know they are dealing with a real, checked person.",
    icon: <HiOutlineShieldCheck size={20} />,
  },
  {
    title: "Secure payments",
    description:
      "Payments run securely in the app. There is no cash to handle, and hosts are paid the moment a booking completes, not at month-end.",
    icon: <HiOutlineBanknotes size={20} />,
  },
  {
    title: "You stay in control (hosts)",
    description:
      "You set your availability, you choose who parks, and you can switch your space off whenever you need it back. There is no tenant relationship and no lock-in contract. You can message your driver directly through the app to tell them exactly where to go.",
    icon: <HiOutlineLockClosed size={20} />,
  },
  {
    title: "You know before you go (drivers)",
    description:
      "Every space is described and priced up front, so you know what you are getting before you book. You can message the host through the app with any questions.",
    icon: <HiOutlineEye size={20} />,
  },
  {
    title: "Damage and disputes",
    description:
      "If something goes wrong, our support team is here to help. We're finalising the full damage and dispute process and will publish it here once confirmed. In the meantime, you can message the other party directly through the app to resolve most issues quickly.",
    icon: <HiOutlineLifebuoy size={20} />,
  },
  {
    title: "Real, Australian-based support",
    description:
      "ParkingOath is built in Australia and supported by real people here. If you need help, you reach a human.",
    icon: <HiOutlineHeart size={20} />,
  },
  {
    title: "Your privacy",
    description:
      "We protect your personal information and the data behind the platform, and we use it responsibly.",
    icon: <HiOutlineFingerPrint size={20} />,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: trustSafetyFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function TrustSafetyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white">
          <Container className="py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <H1>Built on trust, by design.</H1>
              <Text size="lg" className="mt-6 text-slate-600">
                Trust is in our name, and it is built into how ParkingOath works.
                Here is exactly how we keep drivers, hosts and their spaces safe.
              </Text>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                    {item.icon}
                  </div>
                  <p className="text-base font-semibold text-black">{item.title}</p>
                  <Text tone="muted">{item.description}</Text>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2>Your privacy</H2>
              <Text size="lg" className="text-slate-600">
                We protect your personal information and the data behind the
                platform, and we use it responsibly. Read our{" "}
                <Link href="/privacy" className="font-semibold text-brand hover:text-brand-dark">
                  Privacy Policy
                </Link>{" "}
                for the detail.
              </Text>
            </div>
          </Container>
        </section>

        <section id="trust-faqs" className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <H2>Trust and safety FAQ</H2>
            </div>
            <div className="mx-auto max-w-3xl">
              <FaqAccordion items={trustSafetyFaqs} />
            </div>
          </Container>
        </section>

        <section className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2 className="text-white">Still have questions?</H2>
              <Text className="text-white/80">
                Our team is here to help with anything trust and safety related.
              </Text>
              <div className="flex justify-center">
                <Link href="/contact" className={buttonClasses({ size: "lg" })}>
                  Contact us
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
