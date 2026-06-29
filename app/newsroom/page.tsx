import type { Metadata } from "next";
import Link from "next/link";
import {
  HiOutlineBolt,
  HiOutlineHandRaised,
  HiOutlineHome,
  HiOutlineLightBulb,
  HiOutlineMicrophone,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { H1, H2, H3 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { Text } from "@/components/Text";

export const metadata: Metadata = {
  title: "Newsroom | ParkingOath",
  description:
    "ParkingOath media kit, company fact sheet and press contact. Everything you need to tell the ParkingOath story.",
};

const quickLinks = [
  { label: "Media kit", href: "#media-kit" },
  { label: "Press contact", href: "#press-contact" },
];

const factSheet = [
  {
    label: "What it is",
    value: "A peer-to-peer parking marketplace connecting drivers with local hosts.",
  },
  {
    label: "Headquarters",
    value: "Australia. ABN 62 666 831 394.",
  },
  {
    label: "What makes it different",
    value:
      "Real-time park-now (no pre-booking), hands-free voice search, every driver verified, hosts paid the moment a booking completes, and a community-shaped model with Local Ambassadors.",
  },
  {
    label: "Identity verification",
    value: "Didit.",
  },
];

const storyAngles = [
  {
    title: "Local",
    description: "Neighbours solving their own suburb's parking, with real earnings and named streets.",
    icon: <HiOutlineHome size={20} />,
  },
  {
    title: "Cost of living",
    description: "Turning an idle driveway into weekly income, and helping drivers avoid expensive city parking.",
    icon: <HiOutlineBolt size={20} />,
  },
  {
    title: "David and Goliath",
    description: "An Australian-built, community-benefiting challenger to the big parking marketplaces.",
    icon: <HiOutlineHandRaised size={20} />,
  },
  {
    title: "Innovation",
    description: "Real-time and voice-led parking, plus instant payouts, in a category that still pays at month-end.",
    icon: <HiOutlineMicrophone size={20} />,
  },
  {
    title: "The big swing",
    description:
      "Australia's biggest social experiment: can a country solve its own parking, suburb by suburb, by trusting its neighbours.",
    icon: <HiOutlineLightBulb size={20} />,
  },
  {
    title: "Trust and safety",
    description:
      "Every driver verified before they book and every space checked before it lists, so trusting a stranger with your driveway feels safe.",
    icon: <HiOutlineShieldCheck size={20} />,
  },
];

const mediaKitContents = [
  "ParkingOath logos (colour, mono, light and dark backgrounds)",
  "Brand colours and usage",
  "Founder headshots and bios",
  "Product screenshots and app imagery",
  "One-page fact sheet (PDF)",
  "Approved boilerplate",
];

export default function NewsroomPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white">
          <Container className="py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <H1>ParkingOath Newsroom</H1>
              <Text size="lg" className="mt-6 text-slate-600">
                Everything you need to tell the ParkingOath story, in one place. For
                interviews, data or comment, reach our press contact below. We work
                to deadlines.
              </Text>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4">
              <H2>Company boilerplate</H2>
              <Text tone="muted" size="sm">
                Approved wording. Please reuse this exactly in coverage and credits.
              </Text>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <Text size="lg" className="text-slate-700">
                  ParkingOath is an Australian-built, community-powered parking
                  network that connects drivers who need a space with neighbours who
                  have one. Every driver is verified before they can book, hosts are
                  paid the moment a booking completes, and drivers can find a
                  confirmed space in real time from the car, including by hands-free
                  voice. ParkingOath is growing suburb by suburb across Australia.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-6">
              <H2>Fact sheet</H2>
              <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
                {factSheet.map((item) => (
                  <div key={item.label} className="grid gap-1 p-6 sm:grid-cols-[200px_1fr] sm:gap-6">
                    <p className="text-sm font-semibold text-black">{item.label}</p>
                    <Text tone="muted">{item.value}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <H2>Story angles for media</H2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {storyAngles.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                    {item.icon}
                  </div>
                  <H3 className="text-lg">{item.title}</H3>
                  <Text tone="muted">{item.description}</Text>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="media-kit" className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-6">
              <H2>Media kit</H2>
              <Text size="lg" className="text-slate-600">
                Our media kit includes:
              </Text>
              <ul className="space-y-3">
                {mediaKitContents.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <Text className="text-slate-700">{item}</Text>
                  </li>
                ))}
              </ul>
              <div>
                <Link href="#press-contact" className="font-semibold text-brand hover:text-brand-dark">
                  Request the media kit &rarr;
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section id="press-contact" className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2 className="text-white">Press contact</H2>
              <Text className="text-white/80">
                For interviews, data or comment, contact our press team at{" "}
                <a href="mailto:apps@parkingoath.com" className="font-semibold text-white underline">
                  apps@parkingoath.com
                </a>
                . We aim to respond the same business day.
              </Text>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
