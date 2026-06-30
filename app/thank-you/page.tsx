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
  { label: "How It Works", href: "/hosts#how-it-works" },
  { label: "FAQs", href: "/hosts#host-faqs" },
];

const hostFooterSections: FooterSection[] = [
  {
    title: "Host",
    links: [
      { label: "Join Early Access", href: "/hosts#early-access-form" },
      { label: "Get Paid", href: "/hosts#get-paid" },
      { label: "How It Works", href: "/hosts#how-it-works" },
      { label: "FAQs", href: "/hosts#host-faqs" },
    ],
  },
];

export default function ThankYouPage() {
  const nextSteps = [
    {
      title: "We've got your details",
      description: "Your submission has been received and saved in our system.",
    },
    {
      title: "Our team takes a look",
      description: "We review what you've shared and work out the right next step for you.",
    },
    {
      title: "We follow up",
      description: "Expect to hear from us directly by email, whether that's a welcome, an update, or an answer to your question.",
    },
    {
      title: "Stay in the loop",
      description: "As ParkingOath rolls out suburb by suburb, we'll keep you posted on what matters to you.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <MetaPixelLeadTracker />
      <Navbar />
      <main className="flex-1">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm sm:px-12">
              <div className="mx-auto max-w-3xl space-y-5 text-center">
                <div className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                  Submission received
                </div>
                <H1>You're in.</H1>
                <Text size="lg" className="text-slate-600">
                  Thanks for reaching out. We&apos;ve received your details and our
                  team will be in touch soon.
                </Text>
                <Text className="text-slate-600">
                  Whether you&apos;re hosting a space, looking to park, joining as an
                  Ambassador, or just have a question, you&apos;re now on our radar
                  and we&apos;ll follow up shortly.
                </Text>
              </div>
            </div>

            <section className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-[#f5f7fb] bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] px-8 py-12 sm:px-12">
                <div className="mx-auto max-w-3xl text-center">
                  <H2>Here&apos;s what happens next</H2>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  {nextSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="group relative flex flex-col rounded-[2.5rem] border border-slate-200/60 bg-white p-8 pt-10 shadow-[0_8px_30px_rgb(15,23,42,0.04)] transition-all hover:shadow-[0_8px_40px_rgb(15,23,42,0.08)]"
                    >
                      <div className="absolute -right-[1px] -top-[1px] flex h-14 w-32 items-center justify-center rounded-bl-[2rem] rounded-tr-[2.5rem] bg-[#f5f7fb] pl-4 pb-4">
                        <div className="flex h-10 w-24 items-center justify-center rounded-full border border-slate-200/50 bg-white text-sm font-bold text-black shadow-sm">
                          Step {index + 1}
                        </div>
                      </div>
                      <div className="mb-8 flex">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-110">
                          {index + 1}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold tracking-tight text-black">
                          {step.title}
                        </h3>
                        <Text tone="muted" className="text-[17px] leading-relaxed">
                          {step.description}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm sm:px-12">
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
                <Image
                  src={earlyMattersGraphic}
                  alt="You're early. That matters."
                  className="h-auto w-full"
                  priority
                />
              </div>
              <div className="mt-10 flex justify-center">
                <Link href="/" className={buttonClasses({ size: "lg" })}>
                  Back to ParkingOath
                </Link>
              </div>
              <Text className="mt-8 text-center text-slate-500">
                ParkingOath
              </Text>
              <Text className="text-center text-slate-500">
                Real-time parking, not pre-planning.
              </Text>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
