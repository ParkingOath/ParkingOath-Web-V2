import {
    HiOutlineBolt,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineMapPin,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
} from "react-icons/hi2";

import { Container } from "@/components/Container";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { Footer } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Text } from "@/components/Text";

export default function EarlyAccessPage() {
    const iconProps = { size: 20, className: "block" };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
            {/* SVG Background Reconstruction */}
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-60" aria-hidden="true">
                <svg className="h-full w-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <path d="M-100 200C200 100 400 300 600 200C800 100 1000 300 1200 200C1400 100 1600 300 1800 200" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
                    <path d="M-150 400C150 300 350 500 550 400C750 300 950 500 1150 400C1350 300 1550 500 1750 400" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.18" strokeLinecap="round" />
                    <path d="M1500 300C1300 400 1100 200 900 300C700 400 500 200 300 300C100 400 -100 200 -300 300" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round" />
                </svg>
            </div>

            <Navbar />
            <main className="flex-grow relative z-10">
                <section id="register" className="py-20 sm:py-32">
                    <Container>
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Content Column */}
                            <div>
                                <H1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                    Early Driver Access
                                </H1>
                                <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 mb-6">
                                    Limited spots
                                </div>
                                <Text size="lg" className="mb-4 text-slate-600">
                                    We&apos;re opening ParkingOath to a limited number of early drivers ahead of
                                    launch, so you can start booking verified spaces the moment your suburb goes
                                    live.
                                </Text>
                                <Text size="lg" className="text-slate-600">
                                    Early drivers are prioritised as we roll out suburb by suburb. Registering
                                    early means you are ready to book the moment parking goes live near you.
                                </Text>
                            </div>

                            {/* Form Column */}
                            <EarlyAccessForm
                                pageName="Driver"
                                redirectHref="/thank-you"
                                description="Register your interest to be notified the moment ParkingOath launches in your area."
                            />
                        </div>
                    </Container>
                </section>

                <ProcessSteps
                    id="how-it-works"
                    title={
                        <>
                            What happens <span className="text-brand">after you join</span>
                        </>
                    }
                    steps={[
                        {
                            step: "Step 1",
                            title: "Register your interest",
                            description: "Tell us where you are and how often you would use ParkingOath.",
                            icon: <HiOutlineCheckCircle size={20} />,
                        },
                        {
                            step: "Step 2",
                            title: "We notify you",
                            description: "We will be in touch the moment ParkingOath launches in your area.",
                            icon: <HiOutlineClock size={20} />,
                        },
                        {
                            step: "Step 3",
                            title: "Start booking",
                            description: "Find and book verified parking, right from the app.",
                            icon: <HiOutlineMapPin size={20} />,
                        },
                    ]}
                    ctaLabel="Register your interest"
                    ctaHref="#register"
                />

                <section id="why-register" className="bg-white">
                    <Container className="py-16 lg:py-20">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <H2>As an early driver, you receive</H2>
                            <Text size="lg" className="mt-4 text-slate-600">
                                No pressure. No obligation.
                            </Text>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: "Priority access",
                                    description:
                                        "Verified spaces in your area at launch, before the public list opens.",
                                    icon: <HiOutlineMapPin {...iconProps} />,
                                },
                                {
                                    title: "New features first",
                                    description: "Early access to new app features as they are released.",
                                    icon: <HiOutlineBolt {...iconProps} />,
                                },
                                {
                                    title: "Founding hosts first",
                                    description: "First in line to book with founding hosts in your suburb.",
                                    icon: <HiOutlineUserGroup {...iconProps} />,
                                },
                                {
                                    title: "A head start",
                                    description: "Ready to book before the platform opens to everyone else.",
                                    icon: <HiOutlineShieldCheck {...iconProps} />,
                                },
                            ].map((card) => (
                                <div
                                    key={card.title}
                                    className="flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                                        {card.icon}
                                    </div>
                                    <p className="text-lg font-bold text-black">{card.title}</p>
                                    <Text tone="muted">{card.description}</Text>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
}
