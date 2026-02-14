"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineSearch, HiOutlineMicrophone } from "react-icons/hi";
import { MdOutlineCompareArrows, MdOutlinePriceChange } from "react-icons/md";
import { TbNavigation } from "react-icons/tb";

import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buttonClasses } from "@/components/Button";
import { AnimatedFeatureSection } from "@/components/AnimatedFeatureSection";
import { ProcessSteps } from "@/components/ProcessSteps";

import functionsBackground from "@/assets/landing_page/functions/background.png";
import seekerHero from "@/assets/v2/seeker_hero.png";
import navMapNew from "@/assets/v2/nav_map_new.png";
import driverNew from "@/assets/v2/driver_new.png";
import phoneNew from "@/assets/v2/phone_new.png";

export default function SeekerPage() {
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
                  <H1 className="leading-tight">Tell us where you're going. We'll handle the parking.</H1>
                  <Text size="lg" className="text-slate-600">
                    A voice-led parking app for Sydney, NSW.
                  </Text>
                  <Text className="text-slate-600 max-w-2xl mx-auto lg:mx-0">
                    ParkingOath helps drivers find parking in Sydney without circling, guessing,
                    or switching between apps. Set your preferences, say your destination, and
                    let the app guide you to parking near where you're going.
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
                    Get Early Access
                  </Link>
                  <Link
                    href="/early-access"
                    className={buttonClasses({ variant: "secondary", size: "lg" })}
                  >
                    Get Early Access
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform lg:scale-110 lg:translate-x-8">
                  <Image
                    src={seekerHero}
                    alt="Driver using ParkingOath app in Sydney"
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand/10 rounded-full blur-3xl -z-0" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-0" />
              </div>
            </div>
          </Container>
        </section>

        <AnimatedFeatureSection
          id="how-it-works"
          backgroundImage={functionsBackground}
          title={"Find parking in Sydney without thinking about it"}
          description={
            "Parking in Sydney can change quickly, especially when you're already on the move."
          }
          imagePosition="left"
          items={[
            {
              title: "Less circling, less stress",
              description:
                "ParkingOath helps you find available parking near your destination.",
              icon: <HiOutlineSearch {...iconProps} />,
            },
            {
              title: "No switching between options",
              description: "Let the app handle it while you focus on driving.",
              icon: <MdOutlineCompareArrows {...iconProps} />,
            },
            {
              title: "Arrive with less guesswork",
              description: "Get to a spot faster without checking multiple options.",
              icon: <TbNavigation {...iconProps} />,
            },
            {
              title: "Available everywhere",
              description: "Find parking across all major Sydney suburbs and hotspots.",
              icon: <HiOutlineSearch {...iconProps} />,
            },
          ]}
          illustration={navMapNew}
        />

        <ProcessSteps
          title={
            <>
              How the ParkingOath parking app <span className="text-brand">works</span>
            </>
          }
          steps={[
            {
              step: "Step 1",
              title: "Set your parking preferences",
              description:
                "Choose how much you want to pay and how far you're willing to walk from your destination.",
              icon: <MdOutlinePriceChange size={20} />,
            },
            {
              step: "Step 2",
              title: "Use voice search while driving",
              description:
                "Tell ParkingOath where you're going using voice commands, hands-free and simple.",
              icon: <HiOutlineMicrophone size={20} />,
            },
            {
              step: "Step 3",
              title: "Navigate to parking nearby",
              description:
                "ParkingOath guides you to available parking in Sydney as it becomes available, helping you arrive sooner with less guesswork.",
              icon: <TbNavigation size={20} />,
            },
          ]}
          ctaLabel="Get Early Access"
          ctaHref="/early-access"
        />

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title={"A parking app built for real-world driving in Sydney"}
          description={
            "ParkingOath isn't built for perfect plans. It's built for real situations where timing matters."
          }
          items={[
            {
              title: "You're running late",
              description: "Get to parking quickly when time is tight.",
              icon: <HiOutlineSearch {...iconProps} />,
            },
            {
              title: "You're heading to campus or work",
              description: "Find parking fast for everyday routines.",
              icon: <MdOutlineCompareArrows {...iconProps} />,
            },
            {
              title: "You're driving somewhere unfamiliar",
              description: "Arrive with confidence in new areas.",
              icon: <TbNavigation {...iconProps} />,
            },
            {
              title: "You don't want to think about parking at all",
              description: "You focus on driving. ParkingOath handles the parking.",
              icon: <HiOutlineMicrophone {...iconProps} />,
            },
          ]}
          illustration={phoneNew}
        />

        <section className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <H2 className="text-white">Launching soon in Sydney, NSW</H2>
              <Text className="text-white/80">
                ParkingOath is preparing to launch in Sydney. Early access members are
                first to use the parking app when it goes live, help shape how the system
                works, and are ready from day one.
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
              <H2>Parking, handled.</H2>
              <Text className="text-slate-600">
                A simpler way to find parking in Sydney.
              </Text>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
