import { Container } from "@/components/Container";
import { H1 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

export default function EarlyAccessPage() {
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
                        <EarlyAccessForm pageName="Early Access" redirectHref="/thank-you" />
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
