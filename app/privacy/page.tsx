import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <H1 className="mb-4">Privacy Policy</H1>
                        <Text size="lg" className="text-slate-600">
                            This Privacy Policy explains how ParkingOath collects, uses, and protects your
                            personal information when you use our services.
                        </Text>
                        <Text size="sm" className="mt-4 text-slate-500">
                            Last updated: February 6, 2026
                        </Text>

                        <div className="mt-12 space-y-10">
                            <section className="space-y-3">
                                <H2>1. Information We Collect</H2>
                                <Text>
                                    We collect information you provide (such as name, email, phone number,
                                    payment details, and account data) and information generated through your
                                    use of the platform (such as booking history, device data, and usage
                                    analytics).
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>2. How We Use Information</H2>
                                <Text>
                                    We use your information to operate the platform, process payments,
                                    provide customer support, improve our services, and communicate updates
                                    or promotions when allowed.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>3. Sharing of Information</H2>
                                <Text>
                                    We may share information with hosts and drivers to facilitate bookings,
                                    with service providers who help us run the platform, and with authorities
                                    when required by law.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>4. Cookies &amp; Tracking</H2>
                                <Text>
                                    We use cookies and similar technologies to remember preferences, measure
                                    performance, and improve your experience. You can control cookies through
                                    your browser settings.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>5. Data Retention</H2>
                                <Text>
                                    We retain information as long as necessary to provide the services,
                                    comply with legal obligations, resolve disputes, and enforce agreements.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>6. Security</H2>
                                <Text>
                                    We implement administrative, technical, and physical safeguards designed
                                    to protect your data. No method of transmission or storage is 100% secure,
                                    so we cannot guarantee absolute security.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>7. Your Choices</H2>
                                <Text>
                                    You may access, update, or delete certain account information in your
                                    profile. You can also opt out of marketing communications at any time.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>8. Children&apos;s Privacy</H2>
                                <Text>
                                    ParkingOath is not intended for children under 13, and we do not
                                    knowingly collect personal information from them.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>9. International Transfers</H2>
                                <Text>
                                    If you access ParkingOath from outside the United States, your
                                    information may be transferred to and processed in the United States or
                                    other countries.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>10. Changes to This Policy</H2>
                                <Text>
                                    We may update this Privacy Policy from time to time. We will post the
                                    updated version and revise the "Last updated" date above.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>11. Contact Us</H2>
                                <Text>
                                    Questions about privacy? Contact us at{" "}
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
