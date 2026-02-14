"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock, HiOutlinePlus, HiOutlineCheckCircle } from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buttonClasses } from "@/components/Button";
import { AnimatedFeatureSection } from "@/components/AnimatedFeatureSection";
import { ProcessSteps } from "@/components/ProcessSteps";

import functionsBackground from "@/assets/landing_page/functions/background.png";
import hostHero from "@/assets/v2/host_hero.png";
import hostPayment from "@/assets/v2/host_payment.png";
import driverNew from "@/assets/v2/driver_new.png";
import phoneNew from "@/assets/v2/phone_new.png";

export default function HostPage() {
  const iconProps = { size: 20, className: "block" };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white overflow-hidden">
          <Container className="py-16 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <H1 className="leading-tight">Turn your empty parking space into extra cash</H1>
                  <Text size="lg" className="text-slate-600">
                    List your parking space in Sydney, NSW and get bookings when you need the
                    money, not weeks in advance.
                  </Text>
                  <Text className="text-slate-600 max-w-2xl mx-auto lg:mx-0">
                    ParkingOath lets you earn money from your driveway or private off-street
                    parking space on your terms. No calendars. No long commitments. No waiting
                    for pre-bookings.
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
                    Get Early Access
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={hostHero}
                    alt="Modern Sydney home with available parking"
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand/10 rounded-full blur-3xl -z-0" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -z-0" />
              </div>
            </div>
          </Container>
        </section>

        <AnimatedFeatureSection
          id="get-paid"
          backgroundImage={functionsBackground}
          title={"Get paid when it matters"}
          description={
            "Most parking platforms expect you to plan ahead. ParkingOath is built for right now."
          }
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

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title={"Why hosts choose ParkingOath"}
          items={[
            {
              title: "List instantly",
              description:
                "Add your parking space in minutes. No complex setup, just the details drivers need.",
              icon: <HiOutlinePlus {...iconProps} />,
            },
            {
              title: "You decide when it's available",
              description:
                "List your space only when it suits you. Pause or relist anytime.",
              icon: <HiOutlineClock {...iconProps} />,
            },
            {
              title: "You set the price",
              description: "Charge what you want. Hourly or short stays, it's your call.",
              icon: <MdOutlinePriceChange {...iconProps} />,
            },
            {
              title: "More turnover, more opportunity",
              description:
                "When one driver leaves, you can relist straight away. No waiting for future bookings.",
              icon: <HiOutlineCheckCircle {...iconProps} />,
            },
          ]}
          illustration={hostPayment}
        />

        <ProcessSteps
          title={
            <>
              How it <span className="text-brand">works</span>
            </>
          }
          steps={[
            {
              step: "Step 1",
              title: "List your parking space",
              description:
                "Add your driveway or off-street parking space in Sydney with a few simple details.",
              icon: <HiOutlinePlus size={20} />,
            },
            {
              step: "Step 2",
              title: "Make it available when you want",
              description:
                "Turn availability on or off whenever it suits you.",
              icon: <HiOutlineCheckCircle size={20} />,
            },
            {
              step: "Step 3",
              title: "Drivers park. You get paid.",
              description:
                "When your space is used, you get paid directly to your bank account.",
              icon: <MdOutlinePriceChange size={20} />,
            },
          ]}
          ctaLabel="Get Early Access"
          ctaHref="/early-access"
        />

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title={"Built for flexibility, not commitment"}
          description={
            "Hosting your driveway or private off-street parking space on ParkingOath does not mean giving up access to your space."
          }
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

        <section className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <H2 className="text-white">Launching soon in Sydney, NSW</H2>
              <Text className="text-white/80">
                We're onboarding a limited number of early hosts ahead of launch. Early
                hosts get priority visibility, help shape how the app works, and are ready
                to earn from day one.
              </Text>
              <div className="flex justify-center">
                <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
                  Get Early Access
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16">
            <div className="mx-auto max-w-3xl text-center space-y-3">
              <H2>Your space. Your timing. Your money.</H2>
              <Text className="text-slate-600">
                ParkingOath gives you a simple way to earn from something you already have,
                without planning your life around it.
              </Text>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
