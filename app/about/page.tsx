import type { Metadata } from "next";
import Link from "next/link";
import {
  HiOutlineBolt,
  HiOutlineLockClosed,
  HiOutlineMapPin,
  HiOutlineMicrophone,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { Text } from "@/components/Text";

export const metadata: Metadata = {
  title: "About | ParkingOath",
  description:
    "ParkingOath is an Australian-built network that connects drivers who need a space with neighbours who have one. Read our story and what we stand for.",
};

const differentiators = [
  {
    title: "Park now, from your car.",
    description: "Real-time parking, not pre-planning.",
    icon: <HiOutlineMapPin size={20} />,
  },
  {
    title: "Hands-free voice search.",
    description: "Find a park without looking down.",
    icon: <HiOutlineMicrophone size={20} />,
  },
  {
    title: "Paid the moment they park.",
    description: "Hosts paid when a booking completes.",
    icon: <HiOutlineBolt size={20} />,
  },
  {
    title: "Verified, both ways.",
    description: "Every driver checked before they book.",
    icon: <HiOutlineShieldCheck size={20} />,
  },
  {
    title: "Community-shaped.",
    description: "Built with the locals who grow it.",
    icon: <HiOutlineUserGroup size={20} />,
  },
  {
    title: "You stay in control.",
    description: "No tenant relationship, no lock-in, your space your rules.",
    icon: <HiOutlineLockClosed size={20} />,
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white">
          <Container className="py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <H1>Parking, on better terms.</H1>
              <Text size="lg" className="mt-6 text-slate-600">
                ParkingOath is an Australian-built network that connects drivers who
                need a space with neighbours who have one. We are here to make
                parking fair, trusted and local.
              </Text>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4">
              <H2>Our story</H2>
              <Text size="lg" className="text-slate-600">
                ParkingOath started with a simple, maddening problem: drivers
                circling for parking while empty driveways sat metres away. We
                thought a city could solve this itself, if neighbours had a way to
                trust each other. So we built one. Australian-made, verified end to
                end, and designed to put control and value back in local hands.
              </Text>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <H2>What makes us different</H2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => (
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

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4">
              <H2>Built with our community, not just for it.</H2>
              <Text size="lg" className="text-slate-600">
                ParkingOath is shaped by the people on the ground. Our Local
                Ambassadors grow the network their own way, and they have a direct
                line into how we build, so the features and the experience reflect
                what real hosts and drivers actually need. The platform itself and
                the data behind it are ours to protect and run responsibly. What is
                open is the community: who can take part, how they choose to do it,
                and how much they shape what comes next.
              </Text>
              <div>
                <Link href="/ambassadors" className="font-semibold text-brand hover:text-brand-dark">
                  Meet the Ambassadors program &rarr;
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4">
              <H2>Our commitment</H2>
              <Text size="lg" className="text-slate-600">
                We verify before we connect. We pay fairly and on time. We keep
                people in control of their own space. And we grow with the
                communities we serve, suburb by suburb.
              </Text>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4">
              <H2>Careers</H2>
              <Text size="lg" className="text-slate-600">
                We are a small Australian team building something useful. If that
                sounds like you, we would love to hear from you.
              </Text>
              <div>
                <Link href="/contact" className="font-semibold text-brand hover:text-brand-dark">
                  Get in touch &rarr;
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#1f1746] text-white">
          <Container className="py-20 lg:py-24">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2 className="text-white">For press and investors</H2>
              <Text className="text-white/80">
                Writing about us, or interested in what we are building? Visit the
                newsroom for our media kit, or get in touch about investment.
              </Text>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link href="/newsroom" className={buttonClasses({ size: "lg" })}>
                  Newsroom
                </Link>
                <Link
                  href="/contact"
                  className={buttonClasses({ variant: "secondary", size: "lg", className: "border-white text-white hover:bg-white hover:text-[#1f1746]" })}
                >
                  Investor enquiries
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
