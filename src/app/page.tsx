import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Trusted } from "@/components/sections/Trusted";
import { Stats } from "@/components/sections/Stats";
import { Values } from "@/components/sections/Values";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { WhoWeBuildFor } from "@/components/sections/WhoWeBuildFor";
import { Testimonials } from "@/components/sections/Testimonials";
import { Discovery } from "@/components/sections/Discovery";
import { TechStack } from "@/components/sections/TechStack";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

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
      <Discovery />
      <TechStack />
      <FAQ />
      <Contact />
    </main>
  );
}
