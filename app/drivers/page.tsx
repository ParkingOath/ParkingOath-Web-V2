import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineClock,
  HiOutlineMicrophone,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineEye,
} from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbNavigation } from "react-icons/tb";

import { AnimatedFeatureSection } from "@/components/AnimatedFeatureSection";
import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer, type FooterSection } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { Navbar, type NavLink } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Text } from "@/components/Text";
import { driverFaqs } from "@/app/faqs/faq-data";

import functionsBackground from "@/assets/landing_page/early_access/background.png";
import seekerHero from "@/assets/v2/seeker_hero.png";
import navMapNew from "@/assets/v2/nav_map_new.png";
import driverNew from "@/assets/v2/driver_new.png";

export const metadata: Metadata = {
  title: "For Drivers | ParkingOath",
  description:
    "Stop circling. Find a verified, secure park near you in real time, including hands-free by voice, and book it from the car with ParkingOath.",
};

const driverNavLinks: NavLink[] = [
  { label: "How It Works", href: "/drivers#how-it-works" },
  { label: "Safety", href: "/drivers#safety" },
  { label: "FAQs", href: "/drivers#driver-faqs" },
];

const driverFooterSections: FooterSection[] = [
  {
    title: "Drivers",
    links: [
      { label: "Find parking", href: "/drivers#early-access" },
      { label: "How It Works", href: "/drivers#how-it-works" },
      { label: "Safety", href: "/drivers#safety" },
      { label: "FAQs", href: "/drivers#driver-faqs" },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: driverFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function DriversPage() {
  const iconProps = { size: 20, className: "block" };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="flex-grow">
        <section id="early-access" className="overflow-hidden bg-white">
          <Container className="py-16 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <H1 className="leading-tight">Stop circling. Find a verified park, right now.</H1>
                  <Text size="lg" className="text-slate-600">
                    ParkingOath shows you secure, verified spaces near you and lets you book
                    one in real time from the car, even hands-free by voice. No planning from
                    home. No driving in circles.
                  </Text>
                  <Text className="mx-auto max-w-2xl text-slate-600 lg:mx-0">
                    Every space is hosted by a real, verified local, an actual neighbour, not a
                    faceless car park. You see the spot before you go.
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
                    Find parking
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 transform overflow-hidden rounded-2xl shadow-2xl lg:translate-x-8 lg:scale-110">
                  <Image
                    src={seekerHero}
                    alt="Driver using ParkingOath to find a verified park"
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -right-12 -top-12 -z-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 -z-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
              </div>
            </div>
          </Container>
        </section>

        <ProcessSteps
          id="how-it-works"
          title={
            <>
              How <span className="text-brand">finding a park</span> works
            </>
          }
          steps={[
            {
              step: "Step 1",
              title: "Open and find",
              description: "Open the app and see verified spaces near you, available right now.",
              icon: <HiOutlineEye size={20} />,
            },
            {
              step: "Step 2",
              title: "Ask by voice",
              description: "Keep your eyes on the road and ask hands free for a park nearby.",
              icon: <HiOutlineMicrophone size={20} />,
            },
            {
              step: "Step 3",
              title: "Book and go",
              description:
                "Reserve your spot in seconds. The host knows you are coming and where to park.",
              icon: <TbNavigation size={20} />,
            },
          ]}
          ctaLabel="Find parking"
          ctaHref="/early-access"
        />

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title="Why drivers choose ParkingOath"
          imagePosition="left"
          items={[
            {
              title: "Real-time, not pre-planned",
              description: "Find a space the moment you need one, not days ahead.",
              icon: <HiOutlineClock {...iconProps} />,
            },
            {
              title: "Hands-free voice search",
              description: "Search and book by voice while you drive.",
              icon: <HiOutlineMicrophone {...iconProps} />,
            },
            {
              title: "Cheaper and closer",
              description:
                "Local driveways and garages, often nearer your destination than a commercial car park, and usually less.",
              icon: <MdOutlinePriceChange {...iconProps} />,
            },
            {
              title: "Verified and secure",
              description:
                "Real spaces from real, verified hosts, with the details you need before you arrive.",
              icon: <HiOutlineShieldCheck {...iconProps} />,
            },
            {
              title: "No surprises",
              description: "You see the price and the spot up front.",
              icon: <HiOutlineCheckCircle {...iconProps} />,
            },
          ]}
          illustration={driverNew}
        />

        <section id="safety" className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2>Safety and verification</H2>
              <Text size="lg" className="text-slate-600">
                Every booking connects you with a verified host and a real, described space.
                Payments run securely in the app, and support is real humans based in
                Australia. Full detail is on our Trust and Safety page.
              </Text>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2>Simple pricing</H2>
              <Text size="lg" className="text-slate-600">
                No membership, no subscription. You pay for the space you book, at the price
                the host sets, shown before you confirm.
              </Text>
            </div>
          </Container>
        </section>

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title="Park hands free"
          description="Driving is not the time to be tapping at a screen. Ask ParkingOath for a park out loud, and we will find a verified space near you and get you parked. Eyes on the road, spot sorted."
          items={[
            {
              title: "No looking down",
              description: "Ask out loud and keep your eyes on the road.",
              icon: <HiOutlineMicrophone {...iconProps} />,
            },
            {
              title: "Arrive with less guesswork",
              description: "ParkingOath finds a verified space and gets you parked.",
              icon: <TbNavigation {...iconProps} />,
            },
          ]}
          illustration={navMapNew}
        />

        <section id="driver-faqs" className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <H2>Driver FAQs</H2>
              <Text size="lg" className="mt-4 text-slate-600">
                Everything you need to know about finding parking with ParkingOath.
              </Text>
            </div>
            <div className="mx-auto max-w-3xl">
              <FaqAccordion items={driverFaqs} />
            </div>
          </Container>
        </section>

        <section className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2 className="text-white">Your next park is already nearby.</H2>
              <Text className="text-white/80">
                Free to use. Verified spaces. Australian-built.
              </Text>
              <div className="flex justify-center">
                <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
                  Find parking
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
