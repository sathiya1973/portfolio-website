import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog — Design, Branding & Marketing Insights",
  description:
    "Read the latest insights from SATHIYAMOORTHY K on UI/UX trends, brand strategy, packaging innovation, and digital marketing.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
