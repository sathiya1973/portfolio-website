"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  description?: string;
  website_url?: string;
  tags: string[];
  images: string[];
}

/* ─────────────────────────────────────────────
   Dummy data (one set per category slug)
   Will be replaced by Supabase data when available
───────────────────────────────────────────── */
const DUMMY: Record<string, Project[]> = {
  "branding": [
    {
      id: "b1", title: "Luminary Brand Identity", category: "Branding", year: "2024",
      client: "Luminary Wellness",
      description: "A complete brand identity system for a luxury wellness startup — from strategy and logo through to full brand guidelines and stationery.",
      tags: ["Logo", "Brand System", "Stationery", "Guidelines"],
      images: ["/images/portfolio/branding/project-01.png", "/images/portfolio_luminary.png"],
    },
    {
      id: "b2", title: "Vortex Media Identity", category: "Branding", year: "2023",
      client: "Vortex Media",
      description: "Motion-first brand identity for a digital media startup — logomark that animates, a kinetic color system, and a full motion design toolkit.",
      tags: ["Logo", "Motion", "Color System"],
      images: ["/images/portfolio/branding/project-01.png"],
    },
    {
      id: "b3", title: "Horizon Coffee Co.", category: "Branding", year: "2023",
      client: "Horizon Coffee",
      description: "Warm, artisanal brand identity for a specialty coffee roaster, blending heritage craft with a contemporary visual language.",
      tags: ["Brand Strategy", "Identity", "Print"],
      images: ["/images/portfolio/branding/project-01.png"],
    },
  ],
  "ui-ux": [
    {
      id: "u1", title: "Nexus Finance App", category: "UI/UX", year: "2024",
      client: "Nexus Finance",
      description: "Fintech mobile app redesign that simplified 14-step onboarding to 4 steps and created a full design system used by 6 engineering teams.",
      tags: ["Mobile App", "Dashboard", "Design System", "UX Research"],
      images: ["/images/portfolio/uiux/project-01.png"],
    },
    {
      id: "u2", title: "Bloom Health App UI", category: "UI/UX", year: "2023",
      client: "Bloom Health",
      description: "End-to-end UI for a health & wellness app — activity tracking, nutrition logging, and AI-powered daily coaching in a calm, accessible interface.",
      tags: ["App UI", "Health", "Design System"],
      images: ["/images/portfolio/uiux/project-01.png"],
    },
    {
      id: "u3", title: "Atlas Travel Platform", category: "UI/UX", year: "2023",
      client: "Atlas Travel",
      description: "Responsive web platform for a premium travel company — itinerary builder, real-time booking, and an immersive destination explorer.",
      tags: ["Web App", "Booking", "Responsive"],
      images: ["/images/portfolio/uiux/project-01.png"],
    },
  ],
  "graphic-design": [
    {
      id: "g1", title: "Solar Festival Campaign", category: "Graphic Design", year: "2024",
      client: "Solar Festival",
      description: "Full visual identity and print campaign for an outdoor music festival — poster series, social assets, stage backdrops, and wristband design.",
      tags: ["Poster", "Campaign", "Print", "Social"],
      images: ["/images/portfolio/graphic-design/project-01.png"],
    },
    {
      id: "g2", title: "Noir Magazine Editorial", category: "Graphic Design", year: "2023",
      client: "Noir Magazine",
      description: "Art direction and layout design for a quarterly fashion and culture magazine — 96 pages combining bold typography with editorial photography.",
      tags: ["Editorial", "Layout", "Typography"],
      images: ["/images/portfolio/graphic-design/project-01.png"],
    },
    {
      id: "g3", title: "Pulse Music Posters", category: "Graphic Design", year: "2023",
      client: "Pulse Records",
      description: "Limited-edition gig poster series for a record label — 12 unique prints for 12 artists, each with its own visual world.",
      tags: ["Poster", "Illustration", "Print"],
      images: ["/images/portfolio/graphic-design/project-01.png"],
    },
    {
      id: "g4", title: "Apex Sports Campaign", category: "Graphic Design", year: "2022",
      client: "Apex Sports",
      description: "Digital-first campaign for a sports equipment brand — motion graphics, social content, and OOH billboard adaptations.",
      tags: ["Campaign", "Motion", "Social"],
      images: ["/images/portfolio/graphic-design/project-01.png"],
    },
  ],
  "packaging-design": [
    {
      id: "p1", title: "Terra Organic Packaging", category: "Packaging Design", year: "2024",
      client: "Terra Organic",
      description: "Eco-conscious packaging design that became a viral sensation — 1M+ Instagram impressions, stocked in 300+ premium retailers.",
      tags: ["Packaging", "Print", "Sustainability", "Retail"],
      images: ["/images/portfolio/packaging-design/project-01.png"],
    },
    {
      id: "p2", title: "Arcano Coffee Packaging", category: "Packaging Design", year: "2022",
      client: "Arcano Coffee",
      description: "Premium bag and tin packaging for a specialty coffee brand, drawing on vintage cartographic aesthetics with modern print techniques.",
      tags: ["Premium", "Print", "Coffee"],
      images: ["/images/portfolio/packaging-design/project-01.png"],
    },
    {
      id: "p3", title: "Bloom Skincare Range", category: "Packaging Design", year: "2023",
      client: "Bloom Skincare",
      description: "Full packaging system for a 12-product skincare range — clean, minimal, with embossing and foil treatment for the premium tier.",
      tags: ["Skincare", "Luxury", "Embossing"],
      images: ["/images/portfolio/packaging-design/project-01.png"],
    },
  ],
  "web-design": [
    {
      id: "w1", title: "Phantom Studio Website", category: "Web Design", year: "2024",
      client: "Phantom Studio",
      description: "Award-winning website for a creative studio — 3D WebGL canvas, scroll-triggered animations, and a fully custom CMS.",
      tags: ["Next.js", "Three.js", "Animation", "CMS"],
      images: ["/images/portfolio/web-design/project-01.png"],
    },
    {
      id: "w2", title: "Crest Capital Website", category: "Web Design", year: "2023",
      client: "Crest Capital",
      description: "Fintech landing and product site with motion-rich sections, a live market data ticker, and a bespoke investor portal.",
      tags: ["Fintech", "CMS", "Motion"],
      images: ["/images/portfolio/web-design/project-01.png"],
    },
    {
      id: "w3", title: "Orion Agency Site", category: "Web Design", year: "2023",
      client: "Orion Agency",
      description: "Full site redesign for a global creative agency — performant, accessible, with a fluid grid system and multilingual support.",
      tags: ["Redesign", "i18n", "Accessible"],
      images: ["/images/portfolio/web-design/project-01.png"],
    },
  ],
  "logo-design": [
    {
      id: "l1", title: "Meridian Tech Logomark", category: "Logo Design", year: "2024",
      client: "Meridian Tech",
      description: "Geometric logomark for a deep-tech startup — built on a modular grid, designed for scalability from favicon to billboard.",
      tags: ["Logomark", "Geometric", "Tech"],
      images: ["/images/portfolio/logo-design/project-01.png"],
    },
    {
      id: "l2", title: "Kairo Restaurant Identity", category: "Logo Design", year: "2023",
      client: "Kairo Restaurant",
      description: "Hand-lettered wordmark for a modern Middle-Eastern restaurant, paired with a secondary Arabic calligraphy mark.",
      tags: ["Wordmark", "Lettering", "Restaurant"],
      images: ["/images/portfolio/logo-design/project-01.png"],
    },
    {
      id: "l3", title: "Solaris Energy Mark", category: "Logo Design", year: "2023",
      client: "Solaris Energy",
      description: "Dynamic logomark for a renewable energy company — the mark evolves from a seed to a sun as energy output grows.",
      tags: ["Energy", "Dynamic", "Sustainable"],
      images: ["/images/portfolio/logo-design/project-01.png"],
    },
  ],
  "digital-marketing": [
    {
      id: "dm1", title: "Pulse Brand Campaign", category: "Digital Marketing", year: "2024",
      client: "Pulse Records",
      description: "360° digital campaign across Instagram, TikTok, and YouTube — 4.2M impressions in 30 days and 18% conversion uplift.",
      tags: ["Social Media", "Content Strategy", "Paid Ads"],
      images: ["/images/portfolio/graphic-design/project-01.png"],
    },
    {
      id: "dm2", title: "Terra Growth Strategy", category: "Digital Marketing", year: "2023",
      client: "Terra Organic",
      description: "Full-funnel growth strategy combining SEO, influencer seeding, and performance marketing that grew monthly revenue 3.4×.",
      tags: ["SEO", "Influencer", "Performance"],
      images: ["/images/portfolio/graphic-design/project-01.png"],
    },
  ],
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
interface Props { categorySlug: string; }

export default function CategoryPageClient({ categorySlug }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cat = getCategoryBySlug(categorySlug);

  // Merge Supabase live data on top of dummy data
  useEffect(() => {
    setLoading(true);
    setSelected(null);
    setActiveImg(0);

    // Start with dummy data immediately so UI shows something
    const dummy = DUMMY[categorySlug] ?? [];
    setProjects(dummy);

    async function fetchFromSupabase() {
      if (!cat) { setLoading(false); return; }
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("status", "Live")
        .eq("category", cat.dbValue)
        .order("created_at", { ascending: false });

      if (data && !error && data.length > 0) {
        const live: Project[] = data.map((p: any) => ({
          id: p.id.toString(),
          title: p.title || "Untitled",
          category: p.category || "",
          year: p.year || "",
          client: undefined,
          description: p.description || undefined,
          website_url: p.website_url || undefined,
          tags: Array.isArray(p.tags) ? p.tags : [],
          // Prefer the images[] array; fall back to single image field
          images: Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : p.image ? [p.image] : [],
        }));
        setProjects(live);
      }
      setLoading(false);
    }

    fetchFromSupabase();
  }, [categorySlug]);

  // Keyboard navigation for modal
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxOpen) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight" && selected) setActiveImg(i => Math.min(i + 1, selected.images.length - 1));
      if (e.key === "ArrowLeft" && selected) setActiveImg(i => Math.max(i - 1, 0));
      return;
    }
    if (!selected) return;
    if (e.key === "Escape") setSelected(null);
    if (e.key === "ArrowRight") setActiveImg(i => Math.min(i + 1, selected.images.length - 1));
    if (e.key === "ArrowLeft") setActiveImg(i => Math.max(i - 1, 0));
  }, [selected, lightboxOpen]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const openProject = (p: Project) => {
    setSelected(p);
    setActiveImg(0);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setSelected(null);
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-[#050508]">
        {/* ── Hero ── */}
        <section className="relative pt-36 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="orb orb-violet w-96 h-96 -top-24 -left-24 absolute animate-pulse-glow" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-violet-400 text-sm mb-10 transition-colors">
              <ArrowLeft size={14} /> All Categories
            </Link>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="tag mb-5 inline-flex">Portfolio</div>
              <h1 className="section-title mb-3">
                {cat?.label ?? "Category"} <span className="gradient-text">Work</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {loading ? "Loading…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
              </p>
            </motion.div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/portfolio/${c.slug}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    c.slug === categorySlug
                      ? "bg-violet-500 border-violet-500 text-white"
                      : "border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-violet-500/50 hover:text-violet-400"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Instagram-style Grid ── */}
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading skeletons */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-black/5 dark:bg-white/5 animate-pulse rounded-sm" />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && projects.length === 0 && (
              <div className="text-center py-28 text-slate-500 dark:text-slate-500">
                <div className="text-6xl mb-6 opacity-20">✦</div>
                <p className="text-lg font-medium mb-2">No projects yet</p>
                <p className="text-sm">Live projects added via the admin panel will appear here.</p>
              </div>
            )}

            {/* Grid */}
            {projects.length > 0 && (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    id={`grid-item-${project.id}`}
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
                    transition={{ duration: 0.35 }}
                    onClick={() => openProject(project)}
                    className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer bg-white/5 dark:bg-white/5 border border-black/5 dark:border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    aria-label={`Open ${project.title}`}
                  >
                    {/* Image */}
                    {project.images[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">✦</div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <p className="text-white font-bold text-sm text-center px-3 leading-tight drop-shadow">{project.title}</p>
                      <p className="text-white/70 text-xs">{project.year}</p>
                    </div>

                    {/* Multi-image indicator */}
                    {project.images.length > 1 && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/>
                          <rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/>
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeProject}
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0d0d14] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close button */}
              <button
                id="modal-close-btn"
                onClick={closeProject}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* ── Left: Image Gallery ── */}
              <div className="relative w-full md:w-[55%] bg-black shrink-0 flex flex-col">
                {/* Main image */}
                <div className="relative flex-1 min-h-[260px] md:min-h-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={selected.images[activeImg] || "/images/portfolio/branding/project-01.png"}
                      alt={selected.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Magnify / zoom button */}
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-violet-600 text-white flex items-center justify-center transition-colors z-10"
                    aria-label="Magnify image"
                  >
                    <ZoomIn size={16} />
                  </button>

                  {/* Prev / Next arrows — always shown when multiple images */}
                  {selected.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg(i => Math.max(i - 1, 0))}
                        disabled={activeImg === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center disabled:opacity-30 transition shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setActiveImg(i => Math.min(i + 1, selected.images.length - 1))}
                        disabled={activeImg === selected.images.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center disabled:opacity-30 transition shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selected.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImg(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? "bg-white scale-125" : "bg-white/40"}`}
                            aria-label={`Image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail strip (only if > 1 image) */}
                {selected.images.length > 1 && (
                  <div className="flex gap-1 p-2 bg-black/60 shrink-0 overflow-x-auto">
                    {selected.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition-all ${
                          i === activeImg ? "border-violet-500" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Right: Project Details ── */}
              <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">
                {/* Category + Year */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-violet-400">{selected.category}</span>
                  <span className="text-slate-300/30 text-xs">·</span>
                  <span className="text-xs text-slate-500 dark:text-slate-500">{selected.year}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {selected.title}
                </h2>

                {/* Client */}
                {selected.client && (
                  <div className="flex items-center gap-3 py-3 border-y border-black/5 dark:border-white/5">
                    <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 font-semibold w-16 shrink-0">Client</span>
                    <span className="text-sm text-slate-900 dark:text-white font-medium">{selected.client}</span>
                  </div>
                )}

                {/* Description */}
                {selected.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selected.description}
                  </p>
                )}

                {/* Tags */}
                {selected.tags.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 font-semibold mb-3">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-violet-500/20 text-violet-400 bg-violet-500/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Website URL */}
                {selected.website_url && (
                  <a
                    href={selected.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 border border-violet-500/20 bg-violet-500/10 hover:bg-violet-500/20 rounded-xl px-4 py-2.5 transition-all group"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    View Live Website
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </a>
                )}

                {/* Image counter */}
                {selected.images.length > 1 && (
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-auto">
                    {activeImg + 1} / {selected.images.length} images
                  </p>
                )}

                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={closeProject}
                  className="btn-primary text-sm py-3 justify-center mt-2"
                >
                  <span>Start a Similar Project</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && selected && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            {selected.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg(i => Math.max(i - 1, 0)); }}
                disabled={activeImg === 0}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-violet-600 text-white flex items-center justify-center disabled:opacity-20 transition"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={selected.images[activeImg]}
                alt={selected.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            {selected.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg(i => Math.min(i + 1, selected.images.length - 1)); }}
                disabled={activeImg === selected.images.length - 1}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-violet-600 text-white flex items-center justify-center disabled:opacity-20 transition"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Counter */}
            {selected.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {activeImg + 1} / {selected.images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
