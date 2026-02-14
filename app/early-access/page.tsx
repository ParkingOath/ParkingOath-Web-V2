"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Image from "next/image";
import illustration from "@/assets/landing_page/early_access/illustration.png";

export default function EarlyAccessPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setErrorMessage(null);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = {
            firstName: String(formData.get("firstName") ?? ""),
            lastName: String(formData.get("lastName") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            location: String(formData.get("location") ?? ""),
            frequency: String(formData.get("frequency") ?? ""),
        };

        try {
            const response = await fetch("/api/hubspot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.message ?? "Submission failed");
            }

            setStatus("success");
            form.reset();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong";
            setErrorMessage(message);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
            {/* SVG Background Reconstruction */}
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-60" aria-hidden="true">
                <svg className="h-full w-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <path d="M-100 200C200 100 400 300 600 200C800 100 1000 300 1200 200C1400 100 1600 300 1800 200" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
                    <path d="M-150 400C150 300 350 500 550 400C750 300 950 500 1150 400C1350 300 1550 500 1750 400" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.18" strokeLinecap="round" />
                    {/* <path d="M1200 600C1000 700 800 500 600 600C400 700 200 500 0 600C-200 700 -400 500 -600 600" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" /> */}
                    <path d="M1500 300C1300 400 1100 200 900 300C700 400 500 200 300 300C100 400 -100 200 -300 300" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round" />
                </svg>
            </div>

            <Navbar />
            <main className="flex-grow py-20 sm:py-32 relative z-10">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Content Column */}
                        <div>
                            <H1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Early Host Access - Sydney
                            </H1>
                            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 mb-6">
                                Limited spots
                            </div>
                            <Text size="lg" className="mb-4 text-slate-600">
                                We&apos;re onboarding a limited number of early hosts ahead of launch to build reliable parking
                                availability from day one in Sydney.
                            </Text>
                            <Text size="lg" className="mb-4 text-slate-600">
                                Early hosts are prioritised as the platform launches suburb by suburb across Sydney.
                            </Text>
                            <div className="mb-6">
                                <Text size="lg" className="text-slate-700 font-semibold mb-3">
                                    As an early host, you receive:
                                </Text>
                                <ul className="space-y-2 text-slate-600 text-base">
                                    <li>Priority visibility in your local area at launch</li>
                                    <li>Early access to new hosting features as they&apos;re released</li>
                                    <li>Ongoing platform benefits reserved for founding hosts</li>
                                    <li>A head start before wider host onboarding begins</li>
                                </ul>
                            </div>
                            <Text size="lg" className="mb-6 text-slate-600">
                                Hosting early helps establish your space before local demand increases.
                            </Text>
                            <div className="mb-6">
                                <Text size="lg" className="text-slate-700 font-semibold mb-3">
                                    What happens after you join
                                </Text>
                                <ol className="space-y-2 text-slate-600 text-base">
                                    <li>1. Register your interest as an early host</li>
                                    <li>2. We notify you as hosting access opens in your area</li>
                                    <li>3. You decide when or if you want to list your space</li>
                                </ol>
                                <Text size="lg" className="mt-3 text-slate-600">
                                    No pressure. No obligation.
                                </Text>
                            </div>

                            {/* <div className="relative mt-12 hidden lg:block">
                                <div className="relative h-[400px] w-full flex items-center justify-center">
                                    <Image
                                        src={illustration}
                                        alt="Experience ParkingOath"
                                        className="w-full max-w-[400px] rounded-3xl shadow-md"
                                        priority
                                    />
                                </div>
                            </div> */}
                        </div>

                        {/* Form Column */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-slate-900">Reserve Your Spot</h2>
                                <Text tone="muted">
                                    Register your interest to be notified when hosting access opens in your area.
                                </Text>
                            </div>

                            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <label className="block space-y-2 text-sm font-medium text-slate-700">
                                        First Name
                                        <input
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                            placeholder="First name"
                                            type="text"
                                            name="firstName"
                                            required
                                        />
                                    </label>
                                    <label className="block space-y-2 text-sm font-medium text-slate-700">
                                        Last Name
                                        <input
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                            placeholder="Last name"
                                            type="text"
                                            name="lastName"
                                            required
                                        />
                                    </label>
                                </div>

                                <label className="block space-y-2 text-sm font-medium text-slate-700">
                                    Email
                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        placeholder="Your email"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </label>

                                <label className="block space-y-2 text-sm font-medium text-slate-700">
                                    Phone Number
                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        placeholder="Phone number"
                                        type="tel"
                                        name="phone"
                                        required
                                    />
                                </label>

                                <label className="block space-y-2 text-sm font-medium text-slate-700">
                                    Location / Suburb
                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        placeholder="Location / Suburb"
                                        type="text"
                                        name="location"
                                        required
                                    />
                                </label>

                                <label className="block space-y-2 text-sm font-medium text-slate-700">
                                    Usage Frequency
                                    <select
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 appearance-none"
                                        name="frequency"
                                        required
                                        defaultValue=""
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.875rem center", backgroundSize: "1.25rem" }}
                                    >
                                        <option value="" disabled>How often would you use the service?</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="occasionally">Occasionally</option>
                                    </select>
                                </label>

                                <Button type="submit" className="w-full justify-center" disabled={status === "loading"}>
                                    {status === "loading" ? "Submitting..." : "Register interest"}{" "}
                                    <span aria-hidden="true">↗</span>
                                </Button>

                                {status === "success" && (
                                    <Text size="sm" className="text-green-600">
                                        Thanks! You&apos;re on the waitlist.
                                    </Text>
                                )}
                                {status === "error" && (
                                    <Text size="sm" className="text-red-600">
                                        {errorMessage ?? "Submission failed. Please try again."}
                                    </Text>
                                )}
                            </form>

                            <Text size="sm" className="mt-6 text-slate-500 text-center">
                                We care about your data in our <a href="#" className="underline hover:text-slate-700">privacy policy</a>.
                            </Text>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
