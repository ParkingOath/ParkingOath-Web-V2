import type { Metadata } from "next";
import Link from "next/link";
import {
    HiOutlineBolt,
    HiOutlineCheckCircle,
    HiOutlineChatBubbleLeftRight,
    HiOutlineClock,
    HiOutlineHeart,
    HiOutlineMapPin,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
} from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { buttonClasses } from "@/components/Button";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { H1, H2 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Text } from "@/components/Text";
import { ambassadorFaqs } from "@/app/faqs/faq-data";

export const metadata: Metadata = {
    title: "Become an Ambassador | ParkingOath",
    description:
        "Help your community discover ParkingOath and earn for every host who joins through you. $20 per host, plus 20% of what ParkingOath earns from them, for as long as they host. No joining fee, ever.",
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ambassadorFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

export default function AmbassadorsPage() {
    const iconProps = { size: 20, className: "block" };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Navbar />
            <main className="flex-grow">
                <section id="register" className="border-b border-slate-200 bg-slate-50 py-20 sm:py-32">
                    <Container>
                        <div className="grid items-start gap-16 lg:grid-cols-2">
                            <div>
                                <H1 className="mb-6">Become a ParkingOath Ambassador.</H1>
                                <Text size="lg" className="mb-6 text-slate-600">
                                    Help the hosts in your community get verified and earning,
                                    and we will pay you for it. We pay Ambassadors monthly: $20
                                    for every host you introduce who completes their first
                                    booking, then 20% of what ParkingOath earns from that host
                                    for as long as they keep hosting. No joining fee, ever.
                                </Text>
                                <Text size="lg" className="text-slate-600">
                                    There is no script and no quota. Ambassadors reach their
                                    community their own way, a post in a local Facebook group, a
                                    conversation at the school gate, a flyer at the local cafe.
                                    You choose what fits, we handle the verification, the
                                    payments and the support behind the scenes.
                                </Text>
                            </div>
                            <ContactForm
                                title="Register your interest"
                                subtitle="Tell us a bit about you and your community, and we will be in touch about becoming an Ambassador."
                                buttonText="Register interest"
                                redirectHref="/thank-you"
                                pageName="Ambassador interest"
                            />
                        </div>
                    </Container>
                </section>

                <ProcessSteps
                    id="how-it-works"
                    title={
                        <>
                            How being an <span className="text-brand">Ambassador</span> works
                        </>
                    }
                    steps={[
                        {
                            step: "Step 1",
                            title: "Introduce ParkingOath",
                            description:
                                "Tell hosts in your community about ParkingOath. Social media, a community group, word of mouth, whatever fits.",
                            icon: <HiOutlineChatBubbleLeftRight size={20} />,
                        },
                        {
                            step: "Step 2",
                            title: "They get their first booking",
                            description:
                                "Once a host you introduced lists their space and completes their first booking, you're paid $20 in your next monthly payout.",
                            icon: <HiOutlineCheckCircle size={20} />,
                        },
                        {
                            step: "Step 3",
                            title: "You keep earning",
                            description:
                                "You earn 20% of what ParkingOath makes from that host, paid monthly, for as long as they keep hosting.",
                            icon: <HiOutlineBolt size={20} />,
                        },
                    ]}
                    ctaLabel="Register your interest"
                    ctaHref="#register"
                />

                <section id="how-you-earn" className="bg-white">
                    <Container className="py-16 lg:py-20">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <H2>How you earn</H2>
                            <Text size="lg" className="mt-4 text-slate-600">
                                Two payments, spelled out clearly.
                            </Text>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {[
                                {
                                    title: "$20 per host",
                                    description:
                                        "Paid once a host you introduced completes their first booking.",
                                    icon: <MdOutlinePriceChange {...iconProps} />,
                                },
                                {
                                    title: "20% ongoing",
                                    description:
                                        "Earn 20% of what ParkingOath makes from that host, for as long as they keep hosting.",
                                    icon: <HiOutlineClock {...iconProps} />,
                                },
                                {
                                    title: "We pay you",
                                    description:
                                        "No joining fee, no subscription, nothing to invoice. ParkingOath pays you directly.",
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

                <section id="market-your-way" className="bg-slate-50">
                    <Container className="py-16 lg:py-20">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <H2>
                                Market your way<span className="text-brand">.</span>
                            </H2>
                            <Text size="lg" className="mt-4 text-slate-600">
                                We suggest, we never dictate. How you reach your community is up
                                to you.
                            </Text>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: "Social media",
                                    description: "Share ParkingOath with your network, your way.",
                                    icon: <HiOutlineChatBubbleLeftRight {...iconProps} />,
                                },
                                {
                                    title: "Community groups",
                                    description:
                                        "Local Facebook groups, neighbourhood apps, school networks.",
                                    icon: <HiOutlineUserGroup {...iconProps} />,
                                },
                                {
                                    title: "Word of mouth",
                                    description: "Sometimes the simplest introduction is a conversation.",
                                    icon: <HiOutlineMapPin {...iconProps} />,
                                },
                                {
                                    title: "Your own pace",
                                    description: "No scripts, no quotas, no minimum hours.",
                                    icon: <HiOutlineHeart {...iconProps} />,
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

                <section className="bg-white">
                    <Container className="py-12 lg:py-16">
                        <div className="mx-auto max-w-3xl text-center">
                            <Text size="lg" className="font-semibold text-slate-700">
                                No joining fee, ever · Connect with the community you know, no
                                fixed boundaries · A direct line to ParkingOath, your ideas help
                                shape the app · No lock-in, step back any time
                            </Text>
                        </div>
                    </Container>
                </section>

                <section id="ambassador-faqs" className="bg-slate-50">
                    <Container className="py-16 lg:py-20">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <H2>Ambassador FAQs</H2>
                            <Text size="lg" className="mt-4 text-slate-600">
                                Everything you need to know before you start.
                            </Text>
                        </div>
                        <div className="mx-auto max-w-3xl">
                            <FaqAccordion items={ambassadorFaqs} />
                        </div>
                    </Container>
                </section>

                <section className="bg-[#1f1746] text-white">
                    <Container className="py-20 lg:py-24">
                        <div className="mx-auto max-w-3xl space-y-4 text-center">
                            <H2 className="text-white">Bring ParkingOath to your community.</H2>
                            <Text className="text-white/80">
                                Help your community solve a real parking problem, and get paid
                                for it. No joining fee. No scripts.
                            </Text>
                            <div className="flex justify-center">
                                <Link href="#register" className={buttonClasses({ size: "lg" })}>
                                    Register your interest
                                </Link>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
}
