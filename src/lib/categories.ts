// Central source of truth for portfolio categories.
// Used in Navbar dropdown, category pages, and Supabase filtering.

export interface Category {
  label: string;
  slug: string;    // URL segment: /portfolio/[slug]
  dbValue: string; // Exact value stored in Supabase category column
}

export const CATEGORIES: Category[] = [
  { label: "Graphic Design",    slug: "graphic-design",    dbValue: "Graphic Design" },
  { label: "Logo Design",       slug: "logo-design",       dbValue: "Logo Design" },
  { label: "Packaging Design",  slug: "packaging-design",  dbValue: "Packaging Design" },
  { label: "Branding",          slug: "branding",          dbValue: "Branding" },
  { label: "Web Design",        slug: "web-design",        dbValue: "Web Design" },
  { label: "UI/UX",             slug: "ui-ux",             dbValue: "UI/UX" },
  { label: "Digital Marketing", slug: "digital-marketing", dbValue: "Digital Marketing" },
];

/** Find a category by its URL slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** The default category when landing on /portfolio */
export const DEFAULT_CATEGORY = CATEGORIES[0];
