"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineBuildingOffice,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlinePlus,
} from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { AnimatedFeatureSection } from "@/components/AnimatedFeatureSection";
import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer, type FooterSection } from "@/components/Footer";
import { H1, H2, H3 } from "@/components/Headers";
import { Navbar, type NavLink } from "@/components/Navbar";
import { Text } from "@/components/Text";
import { hostFaqs } from "@/app/faqs/faq-data";

import functionsBackground from "@/assets/landing_page/functions/background.png";
import hostPayment from "@/assets/landing_page/early_access/illustration.png";
import howItWorksImage from "@/assets/v2/How it works.png";
import transparentPricing from "@/assets/v2/Transparent pricing.png";
import hostHero from "@/assets/v2/host_hero.png";
import phoneNew from "@/assets/v2/phone_new.png";

const hostNavLinks: NavLink[] = [
  {
    label: "How it works",
    href: "/host#how-it-works",
    onClick: (event) => {
      event.preventDefault();
      const target = document.getElementById("how-it-works");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
  {
    label: "FAQs",
    href: "/host#host-faqs",
    onClick: (event) => {
      event.preventDefault();
      const target = document.getElementById("host-faqs");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
  {
    label: "Contact us",
    href: "/host#contact-us",
    onClick: (event) => {
      event.preventDefault();
      const target = document.getElementById("contact-us");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
];

const hostFooterSections: FooterSection[] = [
  {
    title: "Host",
    links: [
      { label: "Join Early Access", href: "/host#early-access-form" },
      { label: "Get Paid", href: "/host#get-paid" },
      { label: "How It Works", href: "/host#how-it-works" },
      { label: "FAQs", href: "/host#host-faqs" },
    ],
  },
];

export default function HostPage() {
  const iconProps = { size: 20, className: "block" };
  const showFlexibilitySection = false;
  const showFoundingHostCard = false;
  const [spotsClaimed, setSpotsClaimed] = React.useState(() => {
    const startDate = new Date('2026-05-01T00:00:00').getTime();
    const now = Date.now();
    const hoursElapsed = (now - startDate) / (1000 * 60 * 60);
    const count = Math.round(37 + (hoursElapsed * (163 / 720)));
    return Math.min(count, 200);
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0 });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const scrollToForm = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("early-access-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        brandHref="/host"
        links={hostNavLinks}
        cta={{ label: "Claim a founding host spot", href: "/host", onClick: scrollToForm }}
      />
      <main className="flex-grow">
        <section className="overflow-hidden bg-white">
          <Container className="py-16 lg:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <H1 className="leading-tight">
                    We put our cut in the first sentence. 10%.
                  </H1>
                  <Text className="text-lg sm:text-xl lg:text-2xl text-slate-600">
                    Founding hosts pay 0% for two months. Then 10% locked in. Future hosts pay 15%.
                  </Text>
                  <Text className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-600 lg:mx-0">
                    No setup fees. Sydney and Gold Coast hosts wanted now.
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className={buttonClasses({ size: "lg" })}
                  >
                    Claim a founding host spot
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 mx-auto overflow-hidden rounded-2xl shadow-2xl max-w-[28rem] sm:max-w-[32rem] lg:max-w-[36rem]">
                  <Image
                    src={hostHero}
                    alt="Modern Australian home with available parking"
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
              </div>
            </div>
          </Container>
        </section>
        <section id="how-it-works" className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <H2>How it works</H2>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src={howItWorksImage}
                alt="How it works"
                className="h-auto w-full"
              />
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <Image
                  src={transparentPricing}
                  alt="Transparent pricing"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </Container>
        </section>

        <AnimatedFeatureSection
          id="get-paid"
          backgroundImage={functionsBackground}
          title="Paid when they park"
          description={
            <>
              <Text>
                Watching someone use your space while your payment is still "processing" is enough to put anyone off.
              </Text>
              <Text className="mt-4">
                That's why ParkingOath is built differently.
              </Text>
            </>
          }
          sectionLabel="The flow"
          supportingText={
            <Text>
              No tenant relationship. No long contract. Toggle availability off when you need the space back.
            </Text>
          }
          imagePosition="left"
          items={[
            {
              title: "Driver books → notification hits your phone",
              description: "",
              icon: <HiOutlinePlus {...iconProps} />,
            },
            {
              title: "Booking confirms → payout flows the same moment",
              description: "",
              icon: <MdOutlinePriceChange {...iconProps} />,
            },
            {
              title: "Driver parks → you can message them directly through the app",
              description: "",
              icon: <HiOutlineCheckCircle {...iconProps} />,
            },
          ]}
          illustration={phoneNew}
        />

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title="Why hosts trust ParkingOath"
          items={[
            {
              title: "Every driver verified before they can book",
              description: "",
              icon: <HiOutlinePlus {...iconProps} />,
            },
            {
              title: "You set when your space is on. You stay in control.",
              description: "",
              icon: <HiOutlineClock {...iconProps} />,
            },
            {
              title: "Payout flows the moment a booking confirms, not at month-end",
              description: "",
              icon: <MdOutlinePriceChange {...iconProps} />,
            },
            {
              title: "Direct messaging through the app so you can tell the driver exactly where to park",
              description: "",
              icon: <HiOutlineCheckCircle {...iconProps} />,
            },
            {
              title: "Australian-built. Real humans on support.",
              description: "",
              icon: <HiOutlinePlus {...iconProps} />,
            },
          ]}
          illustration={hostPayment}
        />

        <section id="host-faqs" className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <H2>ParkingOath FAQs</H2>
              <Text size="lg" className="mt-4 text-slate-600">
                Everything you need to know about hosting with ParkingOath.
              </Text>
            </div>
            <div className="mx-auto max-w-3xl">
              <FaqAccordion items={hostFaqs} />
            </div>
          </Container>
        </section>

        {showFlexibilitySection && (
          <AnimatedFeatureSection
            backgroundImage={functionsBackground}
            title="Built for flexibility, not commitment"
            description="Hosting your driveway or private off-street parking space on ParkingOath does not mean giving up access to your space."
            items={[
              {
                title: "Full control",
                description: "You decide exactly when your driveway is available to drivers.",
                icon: <HiOutlinePlus {...iconProps} />,
              },
              {
                title: "Zero commitment",
                description: "No long-term contracts or lock-ins. Host on your own schedule.",
                icon: <HiOutlineCheckCircle {...iconProps} />,
              },
              {
                title: "Pause anytime",
                description: "Need your space back? Pause your listing with a single tap.",
                icon: <HiOutlineClock {...iconProps} />,
              },
              {
                title: "Set your rules",
                description: "Define your own pricing and vehicle requirements effortlessly.",
                icon: <MdOutlinePriceChange {...iconProps} />,
              },
            ]}
            illustration={phoneNew}
          />
        )}



        <section className="bg-[#1f1746] text-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <H2 className="text-white">Founding rate doesn't repeat.</H2>
              <Text className="text-white/80 max-w-2xl mx-auto">
                Two months at 0%. Then 10% for as long as you host. Sydney and Gold Coast hosts wanted now. 4 minutes to list.
              </Text>
              <div className="flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className={buttonClasses({ size: "lg" })}
                >
                  Claim a founding host spot
                </button>
                <Text className="text-white/80 max-w-md">
                  No setup fees. You set the price. Cancel anytime.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        <section id="early-access-form" className="bg-slate-50">
          <Container className="pt-16 lg:pt-20 pb-10 lg:pb-14">
            <div className={"grid items-stretch gap-8 lg:gap-12 " + (showFoundingHostCard ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-1")}>
              <div className="text-[112%] order-2 lg:order-1 h-full flex flex-col justify-between bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                <EarlyAccessForm
                  pageName="Host"
                  redirectHref="/thank-you"
                  title="Claim a founding host spot"
                  description=""
                  submitLabel="Claim My Spot"
                />
              </div>
              {showFoundingHostCard && (
                <div className="space-y-5 rounded-3xl bg-[#1f1746] px-6 py-8 text-white shadow-sm sm:px-8 order-1 lg:order-2">
                  <div className="inline-flex rounded-full bg-amber-400/20 px-4 py-1 text-sm font-semibold text-amber-300">
                    🔥 Only 200 founding spots available
                  </div>
                  <H2 className="text-white">Keep 100% of what you earn.  For your first 2 months.</H2>
                  <Text className="text-white/80">
                    Be one of the first{" "}
                    <span className="font-bold text-white">200 Founding Hosts</span>{" "}
                    to join ParkingOath and you&apos;ll keep every dollar for the first two months.{" "}
                    <span className="font-bold text-white">No fees!</span>
                  </Text>
                  <Text className="text-white font-semibold text-lg">
                    After that, you&apos;re permanently locked at 10%, while everyone else pays 15%.
                  </Text>
                  <div className="flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                      🔒 0% commission · 2 months
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                      ♾️ Locked at 10% forever
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                      ⚡ Instant payouts
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                      Founding Host Spots Claimed
                    </p>
                    <div className="w-full rounded-full bg-white/10 h-2">
                      <div className="h-2 rounded-full bg-amber-400" style={{ width: `${(spotsClaimed / 200) * 100}%` }} />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-amber-400">{spotsClaimed}</span>
                        <span className="text-lg font-bold text-white"> of 200</span>
                      </div>
                      <span className="text-sm font-semibold text-amber-400">{200 - spotsClaimed} spots remaining</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </Container>
        </section>

        <section id="contact-us" className="bg-slate-50">
          <Container className="pb-14 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 rounded-[1.75rem] bg-white/95 px-6 py-6 shadow-sm sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-2">
                  <H2 className="text-3xl sm:text-4xl">Contact us</H2>
                  <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                    Reach out for founding host enquiries or support from ParkingOath.
                  </p>
                </div>
                <div className="grid gap-3 text-sm sm:text-base text-slate-700">
                  <div className="flex items-start gap-3">
                    <HiOutlineBuildingOffice size={20} className="shrink-0 text-brand" />
                    <p className="font-semibold text-slate-900">ParkingOath Pty Ltd</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineIdentification size={20} className="shrink-0 text-brand" />
                    <p>ABN: 62 666 831 394</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineMapPin size={20} className="shrink-0 text-brand" />
                    <p>Location: VIC 3000</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineEnvelope size={20} className="shrink-0 text-brand" />
                    <p>parkingoath@parkingoath.com</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlinePhone size={20} className="shrink-0 text-brand" />
                    <p>+61 494 026 396</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer sections={hostFooterSections} />
    </div>
  );
}

