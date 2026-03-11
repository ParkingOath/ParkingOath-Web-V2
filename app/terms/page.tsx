import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms & Conditions | ParkingOath",
    description:
        "Read the ParkingOath terms and conditions for using our platform and services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <H1 className="mb-4">Terms &amp; Conditions</H1>
                        <Text size="lg" className="text-slate-600">
                            These Terms &amp; Conditions govern your use of ParkingOath services, website,
                            and related applications. Please read them carefully.
                        </Text>
                        <Text size="sm" className="mt-4 text-slate-500">
                            Last updated: February 6, 2026
                        </Text>

                        <div className="mt-12 space-y-10">
                            <section className="space-y-3">
                                <H2>1. Acceptance of Terms</H2>
                                <Text>
                                    By accessing or using ParkingOath, you agree to be bound by these Terms
                                    and our Privacy Policy. If you do not agree, do not use the services.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>2. Eligibility &amp; Accounts</H2>
                                <Text>
                                    You must be at least 18 years old and capable of forming a binding
                                    contract. You are responsible for maintaining the confidentiality of your
                                    account and for all activities that occur under your account.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>3. Our Services</H2>
                                <Text>
                                    ParkingOath connects drivers seeking parking with hosts offering parking
                                    spaces. We facilitate discovery, booking, and payments, but we do not own
                                    or operate the parking spaces.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>4. Host Responsibilities</H2>
                                <Text>
                                    Hosts must provide accurate information, ensure spaces are safe and
                                    accessible, comply with local laws, and honor confirmed reservations.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>5. Driver Responsibilities</H2>
                                <Text>
                                    Drivers must provide accurate information, comply with posted rules,
                                    follow host instructions, and leave parking spaces in good condition.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>6. Fees, Payments &amp; Cancellations</H2>
                                <Text>
                                    Fees and charges are displayed at checkout. Cancellation policies may vary
                                    by listing and will be shown before you confirm a booking.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>7. Prohibited Conduct</H2>
                                <Text>
                                    You agree not to misuse the services, engage in fraudulent activity,
                                    interfere with platform security, or violate any applicable laws or
                                    regulations.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>8. Intellectual Property</H2>
                                <Text>
                                    All content, trademarks, and software on ParkingOath are owned by or
                                    licensed to us. You may not copy, modify, distribute, or create
                                    derivative works without permission.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>9. Disclaimers</H2>
                                <Text>
                                    ParkingOath is provided on an "as is" and "as available" basis. We do not
                                    guarantee uninterrupted service or that listings will meet your
                                    expectations.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>10. Limitation of Liability</H2>
                                <Text>
                                    To the maximum extent permitted by law, ParkingOath will not be liable
                                    for any indirect, incidental, special, or consequential damages arising
                                    from your use of the services.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>11. Indemnification</H2>
                                <Text>
                                    You agree to defend and indemnify ParkingOath from claims, losses, and
                                    expenses arising out of your use of the services or your violation of
                                    these Terms.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>12. Disputes &amp; Governing Law</H2>
                                <Text>
                                    These Terms are governed by the laws of the jurisdiction where
                                    ParkingOath is headquartered, unless local law requires otherwise.
                                    Disputes should be raised with us first so we can try to resolve them.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>13. Changes to These Terms</H2>
                                <Text>
                                    We may update these Terms from time to time. We will post the updated
                                    version and revise the "Last updated" date above.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>14. Contact Us</H2>
                                <Text>
                                    Questions about these Terms? Contact us at{" "}
                                    <a
                                        href="mailto:support@parkingoath.com"
                                        className="text-blue-600 hover:text-blue-500 font-semibold"
                                    >
                                        support@parkingoath.com
                                    </a>
                                    {" "}or visit our{" "}
                                    <Link href="/contact" className="text-blue-600 hover:text-blue-500 font-semibold">
                                        contact page
                                    </Link>
                                    .
                                </Text>
                            </section>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
