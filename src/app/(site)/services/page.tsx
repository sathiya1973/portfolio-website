import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore SATHIYAMOORTHY K's full suite of creative services: UI/UX design, branding, web design, packaging, graphic design, and digital marketing.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
