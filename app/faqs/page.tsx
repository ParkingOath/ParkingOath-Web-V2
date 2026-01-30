"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/Container";
import { H1, H2 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { hostFaqs, driverFaqs } from "./faq-data";

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all hover:border-blue-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer items-center justify-between text-left text-base font-semibold text-slate-900 focus:outline-none"
            >
                <span>{question}</span>
                <span className="ml-4 relative flex h-5 w-5 items-center justify-center">
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute text-2xl text-blue-600"
                    >
                        +
                    </motion.span>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FaqPage() {
    const [role, setRole] = useState<"host" | "driver">("host");

    const currentFaqs = role === "host" ? hostFaqs : driverFaqs;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container size="default">
                    <div className="mx-auto max-w-3xl text-center">
                        <H1 className="mb-6">Frequently Asked Questions</H1>
                        <Text size="lg" className="mb-12 text-slate-600">
                            Everything you need to know about ParkingOath. Can't find the answer you're looking for? Reach out to our support team.
                        </Text>

                        {/* Toggle Switch */}
                        <div className="flex justify-center mb-12">
                            <div className="relative flex w-64 rounded-full bg-slate-200 p-1">
                                <motion.div
                                    className="absolute h-10 w-[124px] rounded-full bg-white shadow-sm"
                                    initial={false}
                                    animate={{ x: role === "host" ? 0 : 128 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    onClick={() => setRole("host")}
                                    className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors ${role === "host" ? "text-blue-600" : "text-slate-600"
                                        }`}
                                >
                                    For Hosts
                                </button>
                                <button
                                    onClick={() => setRole("driver")}
                                    className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors ${role === "driver" ? "text-blue-600" : "text-slate-600"
                                        }`}
                                >
                                    For Drivers
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-3xl">
                        <div className="space-y-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={role}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    {currentFaqs.map((item, index) => (
                                        <FaqItem key={`${role}-${index}`} question={item.question} answer={item.answer} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-16 rounded-3xl bg-blue-600 p-8 text-center text-white sm:p-12">
                            <H2 className="mb-4 text-white">Still have questions?</H2>
                            <Text className="mb-8 text-blue-100">
                                Can't find the answer you're looking for? Please chat to our friendly team.
                            </Text>
                            <a
                                href="/contact"
                                className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                Get in touch
                            </a>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
