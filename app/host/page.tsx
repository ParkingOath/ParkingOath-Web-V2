"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlinePlus } from "react-icons/hi2";
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
import hostHero from "@/assets/v2/host_hero.png";
import phoneNew from "@/assets/v2/phone_new.png";

const hostNavLinks: NavLink[] = [
  { label: "How It Works", href: "/host#how-it-works" },
  { label: "FAQs", href: "/host#host-faqs" },
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

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        brandHref="/host"
        links={hostNavLinks}
        cta={{ label: "Get Early Access", href: "/host#early-access-form" }}
      />
      <main className="flex-grow">
        <section id="early-access-form" className="border-b border-slate-200 bg-slate-50">
          <Container className="py-12 lg:py-16">
            <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div className="text-[112%]">
                <EarlyAccessForm
                  pageName="Host"
                  redirectHref="/thank-you"
                  title="Get Early Host Access"
                  description="Fill in your details to be notified when hosting access opens in your area."
                  submitLabel="Claim My Spot"
                />
              </div>
              <div className="space-y-5 rounded-3xl bg-[#1f1746] px-6 py-8 text-white shadow-sm sm:px-8">
                <div className="inline-flex rounded-full bg-amber-400/20 px-4 py-1 text-sm font-semibold text-amber-300">
                  🔥 Only 200 founding spots available
                </div>
                <H2 className="text-white">Your driveway. Zero fees. Real money.</H2>
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
                <Link
                  href="/host#early-access-form"
                  className="inline-block rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-[#1f1746] transition hover:bg-amber-300"
                >
                  Claim Your Spot — Join Free for 2 Months
                </Link>
              </div>

            </div>
          </Container>
        </section>

        <section className="overflow-hidden bg-white">
          <Container className="py-16 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <H1 className="leading-tight">Turn your empty parking space into extra cash</H1>
                  <Text size="lg" className="text-slate-600">
                    List your parking space and get bookings when you need the
                    money, not weeks in advance.
                  </Text>
                  <Text className="mx-auto max-w-2xl text-slate-600 lg:mx-0">
                    ParkingOath lets you earn money from your driveway or private off-street
                    parking space on your terms. No calendars. No long commitments. No waiting
                    for pre-bookings.
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Link href="/host#early-access-form" className={buttonClasses({ size: "lg" })}>
                    Get Early Access
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
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

        <AnimatedFeatureSection
          id="get-paid"
          backgroundImage={functionsBackground}
          title="Get paid when it matters!"
          description="Most parking platforms expect you to plan ahead. ParkingOath is built for right now."
          imagePosition="left"
          items={[
            {
              title: "List instantly",
              description: "If your space is empty right now, it can be earning right now.",
              icon: <HiOutlinePlus {...iconProps} />,
            },
            {
              title: "Automatic earnings",
              description: "When a driver parks, the payment is handled automatically.",
              icon: <MdOutlinePriceChange {...iconProps} />,
            },
            {
              title: "Secure payouts",
              description: "Your earnings are transferred directly and safely to your bank.",
              icon: <HiOutlineCheckCircle {...iconProps} />,
            },
            {
              title: "Stay informed",
              description: "Get real-time push notifications for every booking and payout.",
              icon: <HiOutlineClock {...iconProps} />,
            },
          ]}
          illustration={phoneNew}
        />

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

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title="Why hosts choose ParkingOath"
          items={[
            {
              title: "List instantly",
              description:
                "Add your parking space in minutes. No complex setup, just the details drivers need.",
              icon: <HiOutlinePlus {...iconProps} />,
            },
            {
              title: "You decide when it's available",
              description: "List your space only when it suits you. Pause or relist anytime.",
              icon: <HiOutlineClock {...iconProps} />,
            },
            {
              title: "You set the price",
              description: "Charge what you want. It's your call.",
              icon: <MdOutlinePriceChange {...iconProps} />,
            },
            {
              title: "More turnover, more opportunity",
              description:
                "When one driver leaves, you can automatically relist straight away. No waiting for future bookings.",
              icon: <HiOutlineCheckCircle {...iconProps} />,
            },
          ]}
          illustration={hostPayment}
        />

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

        <section className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2 className="text-white">Launching soon</H2>
              <Text className="text-white/80">
                We&apos;re onboarding a limited number of early hosts ahead of launch. Early
                hosts get priority visibility, help shape how the app works, and are ready to
                earn from day one.
              </Text>
              <div className="flex justify-center">
                <Link href="/host#early-access-form" className={buttonClasses({ size: "lg" })}>
                  Get Early Access
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16">
            <div className="mx-auto max-w-3xl space-y-3 text-center">
              <H2>Your space. Your timing. Your money.</H2>
              <Text className="text-slate-600">
                ParkingOath gives you a simple way to earn from something you already have,
                without planning your life around it.
              </Text>
            </div>
          </Container>
        </section>
      </main>
      <Footer sections={hostFooterSections} />
    </div>
  );
}

