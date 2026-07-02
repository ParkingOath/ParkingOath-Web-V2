import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import Hero from "@/sections/home/hero";
import ProofBar from "@/sections/home/proof-bar";
import Problem from "@/sections/home/problem";
import HowItWorks from "@/sections/home/how-it-works";
import WhyParkingOath from "@/sections/home/why-parkingoath";
import AudiencePaths from "@/sections/home/audience-paths";
import Movement from "@/sections/home/movement";
import PressStrip from "@/sections/home/press-strip";
import FinalCta from "@/sections/home/final-cta";

export const metadata: Metadata = {
  title: "ParkingOath - Peer to peer parking",
  description:
    "The smarter way to find and list parking. Find nearby spaces or earn from your driveway with ParkingOath.",
  robots: { index: false, follow: false },
};

const Event1Page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProofBar />
      <Problem />
      <HowItWorks />
      <WhyParkingOath />
      <AudiencePaths />
      <Movement />
      <PressStrip />
      <FinalCta />
      <Footer />
    </>
  );
};

export default Event1Page;
