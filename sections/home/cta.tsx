import Link from "next/link";

import { Container, H2, Text } from "@/components";
import { buttonClasses } from "@/components/Button";
import { CTA_CONTENT } from "@/constants/cta";

const CtaSection = () => {
  return (
    <section className="bg-[#1f1746] text-white">
      <Container className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <H2 className="text-3xl text-white sm:text-4xl lg:text-5xl">
            {CTA_CONTENT.title}
          </H2>
          <Text className="mt-4 text-base text-white/80 sm:text-lg">
            {CTA_CONTENT.description}
          </Text>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/early-access" className={buttonClasses({ size: "lg" })}>
              {CTA_CONTENT.cta}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CtaSection;
