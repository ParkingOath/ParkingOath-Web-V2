import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Delete Your Account | ParkingOath",
    description:
        "How to request deletion of your ParkingOath account and associated personal data.",
};

export default function DeleteAccountPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <H1 className="mb-4">Delete Your Account</H1>
                        <Text size="lg" className="text-slate-600">
                            This page explains how to request deletion of your ParkingOath account
                            and the personal data associated with it, for the ParkingOath app
                            published by ParkingOath Pty Ltd.
                        </Text>

                        <div className="mt-12 space-y-10">
                            <section className="space-y-3">
                                <H2>How to request deletion</H2>
                                <Text>
                                    To delete your ParkingOath account, email us at{" "}
                                    <a
                                        href="mailto:apps@parkingoath.com"
                                        className="text-blue-600 underline"
                                    >
                                        apps@parkingoath.com
                                    </a>{" "}
                                    from the email address associated with your account, using the
                                    subject line &quot;Delete my account&quot;. Please include the name and, if
                                    available, the phone number on your account so we can verify your
                                    request.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>What data is deleted</H2>
                                <Text>
                                    Once your identity is verified, we permanently delete all personal
                                    data associated with your account, including your profile details
                                    (name, email address, phone number, address, and date of birth),
                                    any parking spaces you have listed, your booking history, vehicle
                                    details, saved location data, and any messages you have sent or
                                    received through the app.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>Retention period</H2>
                                <Text>
                                    We complete account and data deletion within 30 days of verifying
                                    your request. We do not retain your personal data beyond this
                                    period.
                                </Text>
                            </section>

                            <section className="space-y-3">
                                <H2>Questions</H2>
                                <Text>
                                    If you have any questions about deleting your account or your
                                    personal data, contact us at{" "}
                                    <a
                                        href="mailto:apps@parkingoath.com"
                                        className="text-blue-600 underline"
                                    >
                                        apps@parkingoath.com
                                    </a>
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
