import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Trusted } from "@/components/sections/Trusted";
import { Stats } from "@/components/sections/Stats";
import { Values } from "@/components/sections/Values";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { WhoWeBuildFor } from "@/components/sections/WhoWeBuildFor";
import { Testimonials } from "@/components/sections/Testimonials";
import { DiscoveryCallCTA } from "@/components/sections/DiscoveryCallCTA";
import { TechStack } from "@/components/sections/TechStack";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Trusted />
      <Stats />
      <Values />
      <Services />
      <Cases />
      <WhoWeBuildFor />
      <Testimonials />
      <DiscoveryCallCTA />
      <TechStack />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
