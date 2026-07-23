import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { H1 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { Text } from "@/components/Text";
import BetaFeedbackForm from "@/components/BetaFeedbackForm";

export const metadata: Metadata = {
  title: "Beta Feedback | ParkingOath",
  description: "Share your ParkingOath beta testing experience.",
  robots: { index: false, follow: false },
};

export default function BetaFeedbackPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 sm:py-32">
        <Container>
          <div className="max-w-2xl mx-auto">
            <H1 className="mb-4">Beta Feedback</H1>
            <Text size="lg" className="mb-10 text-slate-600">
              Thanks for testing ParkingOath. This takes about 5 minutes and your answers shape the app before we go live.
            </Text>
            <BetaFeedbackForm />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
