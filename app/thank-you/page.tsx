import Link from "next/link";
import Image from "next/image";

import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer, type FooterSection } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { MetaPixelLeadTracker } from "@/components/MetaPixelLeadTracker";
import { Navbar, type NavLink } from "@/components/Navbar";
import { Text } from "@/components/Text";
import earlyMattersGraphic from "@/assets/v2/your-early-that-matters.png";

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

export default function ThankYouPage() {
  const nextSteps = [
    {
      title: "We'll email you when it's ready",
      description: "You'll receive an email as soon as the ParkingOath app is live.",
    },
    {
      title: "Download the app",
      description: "Follow the link in the email to download ParkingOath and create your host account.",
    },
    {
      title: "Add your parking space",
      description: "Upload your driveway or off-street parking space so drivers nearby can see it.",
    },
    {
      title: "Go live and start earning",
      description: "Once the platform opens, drivers can park and you'll get paid.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <MetaPixelLeadTracker />
      <Navbar
        brandHref="/host"
        links={hostNavLinks}
        cta={{ label: "Back to Host Page", href: "/host" }}
      />
      <main className="flex-1">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm sm:px-12">
              <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-5">
                  <div className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                    Submission received
                  </div>
                  <H1>You're in.</H1>
                  <Text size="lg" className="text-slate-600">
                    You're now one of the first ParkingOath hosts preparing to earn money
                    from an unused driveway or parking space in Sydney.
                  </Text>
                </div>
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src={earlyMattersGraphic}
                    alt="You're early. That matters."
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm sm:px-12">
              <div className="mx-auto max-w-3xl text-center">
                <H2>Here's what happens next</H2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {nextSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <Text className="mt-3 text-slate-600">{step.description}</Text>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Link href="/host" className={buttonClasses({ size: "lg" })}>
                  Back to Host Page
                </Link>
              </div>
              <Text className="mt-8 text-center text-slate-500">
                ParkingOath
              </Text>
              <Text className="text-center text-slate-500">
                Your space. Your timing. Your money.
              </Text>
            </div>
          </div>
        </Container>
      </main>
      <Footer sections={hostFooterSections} />
    </div>
  );
}
