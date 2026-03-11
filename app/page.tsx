import type { Metadata } from "next";
import { Navbar } from "@/components";
import Hero from "@/sections/home/hero";
import Functions from "@/sections/home/functions";
import DriverFeatures from "@/sections/home/driver-features";
import ProcessSection from "@/sections/home/process";
import ContactSection from "@/sections/home/contact";
import ControlSection from "@/sections/home/control";
import Testimonials from "@/sections/home/testimonials";
// import FaqSection from "@/sections/home/faq";
import CtaSection from "@/sections/home/cta";
import { Footer } from "@/components";
import { getAssetAlt, getAssetUrl, getLandingPage } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "ParkingOath - Peer to peer parking",
  description:
    "The smarter way to find and list parking in Sydney. Find nearby spaces or earn from your driveway with ParkingOath.",
};

const Home = async () => {
  const landing = await getLandingPage();
  const featuredEntry = landing?.fields.featuredBlogPost;
  const featuredPost = featuredEntry
    ? {
      slug: featuredEntry.fields.slug,
      title: featuredEntry.fields.title,
      description: featuredEntry.fields.shortDescription ?? "",
      imageUrl: getAssetUrl(featuredEntry.fields.featuredImage),
      imageAlt: getAssetAlt(featuredEntry.fields.featuredImage),
    }
    : null;

  return (
    <>
      <Navbar />
      <Hero />
      <DriverFeatures />
      <ControlSection />
      <ProcessSection />
      <Functions />
      {/* <Testimonials /> */}
      {/* <FaqSection /> */}
      <ContactSection />
      <CtaSection />
      <Footer />
    </>
  );
}

export default Home;
