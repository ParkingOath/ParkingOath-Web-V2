import { Navbar } from "@/components";
import Hero from "@/sections/home/hero";
import Functions from "@/sections/home/functions";
import ProcessSection from "@/sections/home/process";
import ContactSection from "@/sections/home/contact";
import ControlSection from "@/sections/home/control";
import FaqSection from "@/sections/home/faq";
import CtaSection from "@/sections/home/cta";
import { Footer } from "@/components";

const Home = () => {
  return ( 
    <>
      <Navbar />
      <Hero />
      <Functions />
      <ProcessSection />
      <ControlSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
      <Footer />
    </>
   );
}
 
export default Home;