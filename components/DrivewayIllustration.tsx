"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import purpleCar from "@/assets/hero/purple_car.png";
import { cn } from "@/components/utils";

interface DrivewayIllustrationProps {
    className?: string;
}

export function DrivewayIllustration({ className }: DrivewayIllustrationProps) {
    const [showCar, setShowCar] = useState(false);
    const [showPaid, setShowPaid] = useState(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        timers.push(setTimeout(() => setShowCar(true), 100));
        timers.push(setTimeout(() => setShowPaid(true), 100 + 1500));

        return () => {
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div
            className={cn(
                "relative hero-image-scale min-h-[280px] w-full sm:min-h-[320px] lg:min-h-[360px]",
                className,
            )}
        >
            <svg
                viewBox="0 0 600 460"
                className="h-full w-full"
                role="img"
                aria-label="A house with a driveway ready to be listed on ParkingOath"
            >
                <g stroke="#DCE3F7" strokeWidth="2" fill="none">
                    <line x1="0" y1="60" x2="190" y2="250" />
                    <line x1="40" y1="0" x2="270" y2="230" />
                    <line x1="560" y1="40" x2="430" y2="170" />
                    <line x1="585" y1="120" x2="470" y2="235" />
                </g>

                <path d="M70 460 L530 460 L420 250 L180 250 Z" fill="#E7ECF7" />
                <path
                    d="M70 460 L530 460 L420 250 L180 250 Z"
                    fill="none"
                    stroke="#D3DBF0"
                    strokeWidth="2"
                />
                <line x1="255" y1="460" x2="222" y2="250" stroke="#D3DBF0" strokeWidth="2" />
                <line x1="345" y1="460" x2="378" y2="250" stroke="#D3DBF0" strokeWidth="2" />

                <rect
                    x="170"
                    y="90"
                    width="260"
                    height="170"
                    rx="6"
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                />
                <path d="M150 90 L450 90 L300 20 Z" fill="#1B3CC4" />
                <rect x="205" y="160" width="190" height="100" rx="8" fill="#94A3B8" />
                <line x1="205" y1="185" x2="395" y2="185" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
                <line x1="205" y1="210" x2="395" y2="210" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
                <line x1="205" y1="235" x2="395" y2="235" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
                <rect x="190" y="112" width="34" height="34" rx="4" fill="#BFD3FF" />
                <rect x="376" y="112" width="34" height="34" rx="4" fill="#BFD3FF" />
            </svg>

            <AnimatePresence>
                {showCar ? (
                    <motion.div
                        className="absolute bottom-[6%] left-[16%] w-[46%] sm:w-[42%]"
                        initial={{ opacity: 0, x: -100, y: 40 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            delay: 0.1,
                            duration: 1.5,
                        }}
                    >
                        <Image
                            src={purpleCar}
                            alt="Car parked in a listed driveway"
                            className="w-full object-contain"
                            priority
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {showPaid ? (
                    <motion.div
                        className="absolute right-[4%] top-[16%] flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg"
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            delay: 0.1,
                            duration: 0.8,
                        }}
                    >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                <path
                                    fillRule="evenodd"
                                    d="M16.704 5.29a1 1 0 0 1 0 1.42l-7.25 7.25a1 1 0 0 1-1.42 0L4.296 10.22a1 1 0 1 1 1.42-1.42l3.02 3.02 6.55-6.54a1 1 0 0 1 1.42 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span className="text-sm font-bold text-black">Paid $24</span>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
