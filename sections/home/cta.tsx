import Image from "next/image";

import { Container, H2, Text } from "@/components";
import appleBadge from "@/assets/landing_page/CTA/Apple.png";
import playBadge from "@/assets/landing_page/CTA/Playstore.png";

const CtaSection = () => {
  return (
    <section className="bg-[#1f1746] text-white">
      <Container className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <H2 className="text-3xl text-white sm:text-4xl lg:text-5xl">
            Turn your unused parking
            <br />
            space into <span className="text-[#7c85ff]">extra income</span>
          </H2>
          <Text className="mt-4 text-base text-white/80 sm:text-lg">
            List your space in minutes and host only when it suits you.
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
