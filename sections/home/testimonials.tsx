"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Container, H2, Text } from "@/components";
import { TESTIMONIALS, TESTIMONIALS_CONTENT } from "@/constants/testimonials";

const TestimonialCard = ({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) => {
    return (
        <div
            className="flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md hover:ring-black/10 w-[280px] sm:w-[350px] shrink-0"
        >
            <div>
                <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                        <FaStar key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                    ))}
                </div>
                <div className="relative">
                    <FaQuoteLeft className="absolute -top-1 -left-1 h-6 w-6 sm:h-8 sm:w-8 text-slate-100 -z-10" />
                    <p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#334155] italic">
                        "{testimonial.content}"
                    </p>
                </div>
            </div>
            <div className="mt-6 sm:mt-8 flex items-center gap-x-4 border-t border-gray-100 pt-6">
                <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-brand flex items-center justify-center font-bold text-[10px] sm:text-xs text-white ring-2 ring-white shadow-sm">
                    {testimonial.initials}
                </div>
                <div className="text-xs sm:text-sm leading-tight">
                    <p className="font-semibold text-black">{testimonial.author}</p>
                    <p className="mt-1 text-[#64748b]">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    // Duplicate testimonials for seamless looping
    const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

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
                            {TESTIMONIALS_CONTENT.title.prefix} <span className="text-brand">{TESTIMONIALS_CONTENT.title.highlight}</span> {TESTIMONIALS_CONTENT.title.suffix}
                        </H2>
                        <Text className="mt-4 sm:mt-6 text-[#475569] px-4" size="lg">
                            {TESTIMONIALS_CONTENT.description}
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
