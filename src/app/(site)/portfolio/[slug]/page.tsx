import type { Metadata } from "next";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import CategoryPageClient from "./CategoryPageClient";
import ProjectDetailFallback from "./ProjectDetailFallback";

type Params = { slug: string };

export async function generateStaticParams() {
  // Pre-render all category slugs; project detail slugs are rendered on-demand
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (cat) {
    return {
      title: `${cat.label} | Portfolio — Pattern Edge`,
      description: `Explore Pattern Edge's ${cat.label} portfolio — premium creative work crafted with purpose.`,
    };
  }
  return {
    title: "Portfolio | Pattern Edge",
    description: "Case study by Pattern Edge Creative Agency.",
  };
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);

  // If slug matches a category → show category page
  if (cat) {
    return <CategoryPageClient categorySlug={slug} />;
  }

  // Otherwise → show old project detail page (no inbound links, but route preserved)
  return <ProjectDetailFallback slug={slug} />;
}
