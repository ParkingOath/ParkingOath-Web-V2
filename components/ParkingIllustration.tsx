"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import park1 from "@/assets/hero/park1.png";
import yellowCar from "@/assets/hero/yellow_car.png";
import purpleCar from "@/assets/hero/purple_car.png";
import { cn } from "@/components/utils";

interface ParkingIllustrationProps {
    className?: string;
}

export function ParkingIllustration({ className }: ParkingIllustrationProps) {
    const [showYellow, setShowYellow] = useState(false);
    const [showPurple, setShowPurple] = useState(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        timers.push(setTimeout(() => setShowYellow(true), 100));
        timers.push(setTimeout(() => setShowPurple(true), 100 + 1500));

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
            <Image
                src={park1}
                alt="Parking map"
                className="h-full w-full object-contain"
                priority
            />
            <AnimatePresence>
                {showYellow ? (
                    <motion.div
                        className="absolute right-[9%] top-[0%] w-[45%] sm:w-[41%]"
                        initial={{ opacity: 0, x: 120, y: -80 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            delay: 0.1,
                            duration: 1.5,
                        }}
                    >
                        <Image
                            src={yellowCar}
                            alt="Yellow car"
                            className="w-full object-contain"
                            priority
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <AnimatePresence>
                {showPurple ? (
                    <motion.div
                        className="absolute bottom-[10%] right-[18%] w-[47%] sm:w-[43%]"
                        initial={{ opacity: 0, x: -120, y: 80 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            delay: 0.1,
                            duration: 1.5,
                        }}
                    >
                        <Image
                            src={purpleCar}
                            alt="Purple car"
                            className="w-full object-contain"
                            priority
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
