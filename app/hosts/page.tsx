import type { Metadata } from "next";
import Link from "next/link";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineLockClosed,
  HiOutlineChatBubbleLeftRight,
  HiOutlineHeart,
} from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { AnimatedFeatureSection } from "@/components/AnimatedFeatureSection";
import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer, type FooterSection } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { Navbar, type NavLink } from "@/components/Navbar";
import { DrivewayIllustration } from "@/components/DrivewayIllustration";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Text } from "@/components/Text";
import { hostFaqs } from "@/app/faqs/faq-data";

import functionsBackground from "@/assets/landing_page/early_access/background.png";
import hostPayment from "@/assets/landing_page/early_access/illustration.png";
import phoneNew from "@/assets/v2/phone_new.png";

export const metadata: Metadata = {
  title: "For Hosts | ParkingOath",
  description:
    "List your driveway, garage or carport and earn from the space you already have. Founding hosts pay 0% for two months, then a flat 10% for good.",
};

const hostNavLinks: NavLink[] = [
  { label: "How It Works", href: "/hosts#how-it-works" },
  { label: "Pricing", href: "/hosts#pricing" },
  { label: "FAQs", href: "/hosts#host-faqs" },
];

const hostFooterSections: FooterSection[] = [
  {
    title: "Host",
    links: [
      { label: "List your space", href: "/hosts#early-access-form" },
      { label: "Get Paid", href: "/hosts#get-paid" },
      { label: "How It Works", href: "/hosts#how-it-works" },
      { label: "FAQs", href: "/hosts#host-faqs" },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hostFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HostsPage() {
  const iconProps = { size: 20, className: "block" };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="flex-grow">
        <section id="early-access-form" className="border-b border-slate-200 bg-slate-50">
          <Container className="py-12 lg:py-16">
            <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div className="order-2 flex h-full flex-col justify-between rounded-3xl bg-white p-6 text-[112%] shadow-sm sm:p-8 lg:order-1">
                <EarlyAccessForm
                  pageName="Host"
                  redirectHref="/thank-you"
                  title="Claim a founding host spot"
                  description="Fill in your details to be notified when hosting access opens in your area."
                  submitLabel="Claim My Spot"
                />
              </div>
              <div className="order-1 self-center space-y-5 rounded-3xl bg-[#1f1746] px-6 py-8 text-white shadow-sm sm:px-8 lg:order-2">
                <div className="inline-flex rounded-full bg-amber-400/20 px-4 py-1 text-sm font-semibold text-amber-300">
                  200 founding host spots
                </div>
                <H2 className="text-white">Founding rates do not come back.</H2>
                <Text className="text-white/80">
                  Two months at 0%, then{" "}
                  <span className="font-bold text-white">10% locked in for good</span>.
                  Future hosts pay 20%. No setup fees, you set the price, and it takes about
                  four minutes to list.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    0% commission, 2 months
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    Locked at 10% forever
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    Instant payouts
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    Every driver verified
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    No lock-in, cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="overflow-hidden bg-white">
          <Container className="py-16 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <H1 className="leading-tight">Your driveway is worth more than you think.</H1>
                  <Text size="lg" className="text-slate-600">
                    List your driveway, garage or carport and earn from the space you already
                    have. You get paid the moment a booking completes, and you stay in control
                    the whole way.
                  </Text>
                  <Text className="mx-auto max-w-2xl text-slate-600 lg:mx-0">
                    Every driver verified. Paid when they park. No lock-in.
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Link href="#early-access-form" className={buttonClasses({ size: "lg" })}>
                    List your space
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10">
                  <DrivewayIllustration />
                </div>
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
              </div>
            </div>
          </Container>
        </section>

        <ProcessSteps
          id="how-it-works"
          title={
            <>
              How <span className="text-brand">hosting</span> works
            </>
          }
          steps={[
            {
              step: "Step 1",
              title: "List your space",
              description: "Driveway, garage or carport. It takes a few minutes.",
              icon: <HiOutlinePlus size={20} />,
            },
            {
              step: "Step 2",
              title: "Get booked",
              description: "A verified driver books your space. A notification hits your phone.",
              icon: <HiOutlineCheckCircle size={20} />,
            },
            {
              step: "Step 3",
              title: "Get paid",
              description:
                "The payout flows the moment the booking completes, not at month-end.",
              icon: <MdOutlinePriceChange size={20} />,
            },
          ]}
          ctaLabel="List your space"
          ctaHref="#early-access-form"
        />

        <AnimatedFeatureSection
          backgroundImage={functionsBackground}
          title="Why hosts trust ParkingOath"
          items={[
            {
              title: "Every driver verified",
              description: "Identity is checked before anyone can book your space.",
              icon: <HiOutlineShieldCheck {...iconProps} />,
            },
            {
              title: "Paid the moment they park",
              description: "No waiting until the end of the month to see your money.",
              icon: <HiOutlineBolt {...iconProps} />,
            },
            {
              title: "You stay in control",
              description: "Set when your space is on, and choose who parks.",
              icon: <HiOutlineLockClosed {...iconProps} />,
            },
            {
              title: "Talk to your driver",
              description: "Message directly through the app to tell them exactly where to go.",
              icon: <HiOutlineChatBubbleLeftRight {...iconProps} />,
            },
            {
              title: "Australian-built, real support",
              description: "Real humans, here, when you need them.",
              icon: <HiOutlineHeart {...iconProps} />,
            },
          ]}
          illustration={hostPayment}
        />

        <section id="pricing" className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2>We put our cut up front.</H2>
              <Text size="lg" className="text-slate-600">
                Founding hosts pay 0% for the first two months, then a flat 10% for as long as
                you host. Future hosts pay 20%. No setup fees. You set the price, you keep the
                large majority. Honesty is the whole point.
              </Text>
            </div>
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <H2>What could my space earn?</H2>
              <Text size="lg" className="text-slate-600">
                Earnings depend on your suburb and how close you are to where people need to
                park. A space in a busy inner suburb can earn an estimated $80 to $150 a week.
              </Text>
            </div>
          </Container>
        </section>

        <AnimatedFeatureSection
          id="get-paid"
          backgroundImage={functionsBackground}
          title="Get paid when it matters"
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

        <section id="host-faqs" className="bg-white">
          <Container className="py-16 lg:py-20">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <H2>Host FAQs</H2>
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
              <H2 className="text-white">Turn your empty space into income.</H2>
              <Text className="text-white/80">
                No setup fees. You set the price. Cancel anytime.
              </Text>
              <div className="flex justify-center">
                <Link href="#early-access-form" className={buttonClasses({ size: "lg" })}>
                  List your space
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
