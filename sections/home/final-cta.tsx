import Link from "next/link";

import { buttonClasses, Container, H2, Text } from "@/components";

const FinalCta = () => {
    return (
        <section className="bg-[#1f1746] text-white">
            <Container className="py-20 lg:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <H2 className="text-white">Your park, or your payday, is one tap away.</H2>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
                            Find parking
                        </Link>
                        <Link
                            href="/hosts#early-access-form"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white px-6 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#1f1746] hover:shadow-lg active:translate-y-0"
                        >
                            List your space
                        </Link>
                    </div>
                    <Text className="mt-6 text-white/80">
                        Free to join. Verified. Australian-built.
                    </Text>
                </div>
            </Container>
        </section>
    );
};

export default FinalCta;
