import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "SATHIYAMOORTHY K — Creative Design Agency | UI/UX, Branding & Web Design",
  description:
    "SATHIYAMOORTHY K is a premium creative agency specializing in UI/UX design, brand identity, web design & development, packaging, and digital marketing.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
