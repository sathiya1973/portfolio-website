import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SATHIYAMOORTHY K. Tell us about your project and let's build something extraordinary together.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
