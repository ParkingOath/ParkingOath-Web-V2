import Image from "next/image";

import { Container, H2, Text } from "@/components";
import { CTA_CONTENT } from "@/constants/cta";
import appleBadge from "@/assets/landing_page/CTA/Apple.png";
import playBadge from "@/assets/landing_page/CTA/Playstore.png";

const CtaSection = () => {
  return (
    <section className="bg-[#1f1746] text-white">
      <Container className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <H2 className="text-3xl text-white sm:text-4xl lg:text-5xl">
            {CTA_CONTENT.title.text1}
            <br />
            {CTA_CONTENT.title.text2} <span className="text-[#7c85ff]">{CTA_CONTENT.title.highlight}</span>
          </H2>
          <Text className="mt-4 text-base text-white/80 sm:text-lg">
            {CTA_CONTENT.description}
          </Text>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Image
              src={appleBadge}
              alt="Download on the App Store"
              className="h-12 w-auto"
              priority
            />
            <Image
              src={playBadge}
              alt="Get it on Google Play"
              className="h-12 w-auto"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CtaSection;
