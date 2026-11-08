import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalContents, LegalDocument } from "@/components/LegalDocument";
import { TERMS_OF_SERVICE_V1_0 } from "@/constants/terms-of-service-v1-0";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Archived Terms of Service v1.0 | ParkingOath",
    robots: { index: false, follow: false },
    description: "Archived version 1.0 of the ParkingOath Terms of Service, effective 20 October 2026.",
};

export default function ArchivedTermsV10Page() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container reveal={false}>
                    <div className="mx-auto max-w-3xl">
                        <Text size="sm" className="mb-4 font-semibold text-slate-500">
                            Archived version. Version 1.0 was replaced on 8 November 2026 by the{" "}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-500 font-semibold">
                                current Terms of Service
                            </Link>
                            .
                        </Text>
                        <H1 className="mb-4">Terms of Service</H1>
                        <Text size="lg" className="text-slate-600">
                            Parking Oath Pty Ltd ABN 62 666 831 394
                        </Text>
                        <Text size="sm" className="mt-4 text-slate-500">
                            Version 1.0. Effective 20 October 2026 to 7 November 2026.
                        </Text>

                        <div className="mt-10">
                            <LegalContents blocks={TERMS_OF_SERVICE_V1_0} />
                        </div>

                        <div className="mt-10">
                            <LegalDocument blocks={TERMS_OF_SERVICE_V1_0} />
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
