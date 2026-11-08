import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalContents, LegalDocument } from "@/components/LegalDocument";
import { TERMS_OF_SERVICE } from "@/constants/terms-of-service";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | ParkingOath",
    description:
        "The ParkingOath Terms of Service: the General Terms, Host, Seeker and Booking agreements for using the ParkingOath platform.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container reveal={false}>
                    <div className="mx-auto max-w-3xl">
                        <H1 className="mb-4">Terms of Service</H1>
                        <Text size="lg" className="text-slate-600">
                            Parking Oath Pty Ltd ABN 62 666 831 394
                        </Text>
                        <Text size="sm" className="mt-4 text-slate-500">
                            Version 1.0. Effective 20 October 2026.
                        </Text>

                        <div className="mt-10">
                            <LegalContents blocks={TERMS_OF_SERVICE} />
                        </div>

                        <div className="mt-10">
                            <LegalDocument blocks={TERMS_OF_SERVICE} />
                        </div>

                        <section className="mt-12 space-y-3 border-t border-slate-200 pt-8">
                            <Text size="sm" className="text-slate-500">
                                Questions about these Terms? Contact us through the in-app support ticket or at{" "}
                                <a href="mailto:apps@parkingoath.com" className="text-blue-600 hover:text-blue-500 font-semibold">
                                    apps@parkingoath.com
                                </a>
                                . Read our{" "}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-semibold">
                                    Privacy Policy
                                </Link>
                                . Previous version:{" "}
                                <Link href="/terms/archive/2026-02-06" className="text-blue-600 hover:text-blue-500 font-semibold">
                                    Terms &amp; Conditions, 6 February 2026
                                </Link>
                                .
                            </Text>
                        </section>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
