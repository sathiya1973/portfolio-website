import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SATHIYAMOORTHY K — our story, creative philosophy, and the passionate team behind your brand's transformation.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
