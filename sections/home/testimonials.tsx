"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Container, H2, Text } from "@/components";

const testimonials = [
    {
        content: "Parking Oath has completely changed how I think about my driveway. I'm earning an extra $200 a month with almost zero effort. The app is so easy to use!",
        author: "Sarah J.",
        role: "Homeowner in Sydney",
        initials: "SJ",
        stars: 5,
    },
    {
        content: "As a driver, finding reliable parking in the city was a nightmare. Now I just book a space on Parking Oath and forget about it. Highly recommended!",
        author: "Michael R.",
        role: "Daily Commuter",
        initials: "MR",
        stars: 5,
    },
    {
        content: "The support team is incredible. They helped me set up my listing in minutes. It's great to see a company that actually cares about its community.",
        author: "David L.",
        role: "Host since 2023",
        initials: "DL",
        stars: 5,
    },
    {
        content: "I was skeptical at first, but the security and insurance peace of mind made me join. Best decision I've made for my passive income.",
        author: "Emma W.",
        role: "Suburban Host",
        initials: "EW",
        stars: 5,
    },
    {
        content: "The interface is slick and the booking process is seamless. I love how I can see exactly where I'm parking before I even get there.",
        author: "James T.",
        role: "Tech Professional",
        initials: "JT",
        stars: 5,
    },
    {
        content: "Finally, a parking solution that actually works for both sides. I've recommended this to all my neighbors!",
        author: "Lisa M.",
        role: "Melbourne Local",
        initials: "LM",
        stars: 5,
    },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    return (
        <div
            className="flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:ring-slate-900/10 w-[280px] sm:w-[350px] shrink-0"
        >
            <div>
                <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                        <FaStar key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                    ))}
                </div>
                <div className="relative">
                    <FaQuoteLeft className="absolute -top-1 -left-1 h-6 w-6 sm:h-8 sm:w-8 text-slate-100 -z-10" />
                    <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-700 italic">
                        "{testimonial.content}"
                    </p>
                </div>
            </div>
            <div className="mt-6 sm:mt-8 flex items-center gap-x-4 border-t border-slate-100 pt-6">
                <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-brand flex items-center justify-center font-bold text-[10px] sm:text-xs text-white ring-2 ring-white shadow-sm">
                    {testimonial.initials}
                </div>
                <div className="text-xs sm:text-sm leading-tight">
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="mt-1 text-slate-500">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    // Duplicate testimonials for seamless looping
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section
            id="testimonials"
            className="bg-[#f5f7fb] bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] overflow-hidden"
        >
            <Container className="py-16 sm:py-20 lg:py-28">
                <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <H2 className="text-2xl sm:text-4xl lg:text-5xl px-4">
                            Trusted by <span className="text-brand">thousands</span> of hosts and drivers
                        </H2>
                        <Text className="mt-4 sm:mt-6 text-slate-600 px-4" size="lg">
                            Join our growing community and see why people love the Parking Oath experience.
                        </Text>
                    </motion.div>
                </div>

                <div className="relative flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 sm:gap-8 py-4 px-4"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                        style={{ width: "fit-content", display: "flex" }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} testimonial={testimonial} />
                        ))}
                    </motion.div>

                    {/* Add a subtle fade on the edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#f5f7fb] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#f5f7fb] to-transparent z-10" />
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;
