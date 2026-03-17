import Link from "next/link";

import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer, type FooterSection } from "@/components/Footer";
import { H1 } from "@/components/Headers";
import { MetaPixelLeadTracker } from "@/components/MetaPixelLeadTracker";
import { Navbar, type NavLink } from "@/components/Navbar";
import { Text } from "@/components/Text";

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
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <MetaPixelLeadTracker />
      <Navbar
        brandHref="/host"
        links={hostNavLinks}
        cta={{ label: "Back to Host Page", href: "/host" }}
      />
      <main className="flex flex-1 items-center">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center shadow-sm sm:px-12">
            <div className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
              Submission received
            </div>
            <H1 className="mt-6">Thank you for registering your interest.</H1>
            <Text size="lg" className="mt-4 text-slate-600">
              You&apos;re now on the early host list for ParkingOath in Sydney.
            </Text>
            <Text className="mt-3 text-slate-600">
              We&apos;ll be in touch as host access opens in your area and share the next steps.
            </Text>
            <div className="mt-8 flex justify-center">
              <Link href="/host" className={buttonClasses({ size: "lg" })}>
                Return to Host Page
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer sections={hostFooterSections} />
    </div>
  );
}
