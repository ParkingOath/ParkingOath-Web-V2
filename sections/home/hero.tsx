"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Container, H1, Text } from "@/components";
import heroBackground from "@/assets/hero/background.png";
import park1 from "@/assets/hero/park1.png";
import yellowCar from "@/assets/hero/yellow_car.png";
import purpleCar from "@/assets/hero/purple_car.png";

const Hero = () => {
    const [showYellow, setShowYellow] = useState(false);
    const [showPurple, setShowPurple] = useState(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        timers.push(setTimeout(() => setShowYellow(true), 100));
        timers.push(setTimeout(() => setShowPurple(true), 100 + 1500));
        timers.push(setTimeout(() => setShowPurple(true), 100 + 1500));

        return () => {
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <section
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBackground.src})` }}
        >
            <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.1,
                        duration: 1.5,
                    }}
                >
                    <H1 className="max-w-xl text-slate-900">
                        <span className="text-[#1b3cc4]">Earn</span> from your
                        unused <span className="text-[#1b3cc4]">parking</span>{" "}
                        space
                    </H1>
                    <div className="space-y-4">
                        <Text className="max-w-xl">
                            If you have a driveway or off-street parking that
                            sits empty, Parking Oath lets you make use of it.
                        </Text>
                        <Text className="max-w-xl" tone="muted">
                            List your space, set simple availability, and earn
                            when drivers park there.
                        </Text>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Button>Become a Host</Button>
                        <Button variant="secondary">How Process Works</Button>
                    </div>
                </motion.div>
                <div className="relative hero-image-scale min-h-[280px] w-full sm:min-h-[320px] lg:min-h-[360px]">
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
            </Container>
        </section>
    );
}
 
export default Hero;
