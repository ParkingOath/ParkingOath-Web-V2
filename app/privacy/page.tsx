import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalDocument } from "@/components/LegalDocument";
import { PRIVACY_POLICY } from "@/constants/privacy-policy";

export const metadata: Metadata = {
    title: "Privacy Policy | ParkingOath",
    description:
        "How Parking Oath Pty Ltd collects, uses, shares and protects personal information on the ParkingOath website and app.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container reveal={false}>
                    <div className="mx-auto max-w-3xl">
                        <H1 className="mb-4">Privacy Policy</H1>
                        <Text size="lg" className="text-slate-600">
                            Parking Oath Pty Ltd ABN 62 666 831 394
                        </Text>
                        <Text size="sm" className="mt-4 text-slate-500">
                            Last updated: 8 November 2026
                        </Text>

                        <div className="mt-10">
                            <LegalDocument blocks={PRIVACY_POLICY} />
                        </div>

                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
