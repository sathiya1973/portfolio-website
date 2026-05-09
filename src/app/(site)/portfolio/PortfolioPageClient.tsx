"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

const filters = ["All", "UI/UX", "Web Design", "Graphic Design", "Branding", "Packaging"];

const projects = [
  { id: "luminary-brand", title: "Luminary Brand Identity", category: "Branding", year: "2024", tags: ["Logo", "Guidelines"], color: "from-violet-600/20 to-purple-900/10", accent: "#7c3aed", symbol: "✦", image: "/images/portfolio_luminary.png" },
  { id: "nexus-app", title: "Nexus Finance App", category: "UI/UX", year: "2024", tags: ["Mobile", "Dashboard"], color: "from-cyan-600/20 to-blue-900/10", accent: "#06b6d4", symbol: "◈" },
  { id: "terra-packaging", title: "Terra Organic Packaging", category: "Packaging", year: "2024", tags: ["Label", "Box"], color: "from-emerald-600/20 to-green-900/10", accent: "#10b981", symbol: "❋" },
  { id: "phantom-web", title: "Phantom Studio Website", category: "Web Design", year: "2023", tags: ["Next.js", "3D"], color: "from-pink-600/20 to-rose-900/10", accent: "#ec4899", symbol: "⬡" },
  { id: "vortex-brand", title: "Vortex Media Identity", category: "Branding", year: "2023", tags: ["Logo", "Motion"], color: "from-amber-600/20 to-orange-900/10", accent: "#f59e0b", symbol: "◉" },
  { id: "bloom-ui", title: "Bloom Health App UI", category: "UI/UX", year: "2023", tags: ["App UI", "Design System"], color: "from-teal-600/20 to-cyan-900/10", accent: "#14b8a6", symbol: "✿" },
  { id: "crest-site", title: "Crest Capital Website", category: "Web Design", year: "2023", tags: ["Fintech", "CMS"], color: "from-indigo-600/20 to-violet-900/10", accent: "#6366f1", symbol: "⌬" },
  { id: "arcano-pack", title: "Arcano Coffee Packaging", category: "Packaging", year: "2022", tags: ["Premium", "Print"], color: "from-rose-600/20 to-red-900/10", accent: "#f43f5e", symbol: "☆" },
  { id: "solar-poster", title: "Solar Festival Campaign", category: "Graphic", year: "2022", tags: ["Poster", "Campaign"], color: "from-yellow-600/20 to-amber-900/10", accent: "#eab308", symbol: "◆" },
];

export default function PortfolioPageClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [liveProjects, setLiveProjects] = useState(projects);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    async function fetchFromSupabase() {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("status", "Live")
        .order("created_at", { ascending: false });

      if (data && !error && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id.toString(),
          title: p.title || "Untitled",
          category: p.category || "Branding",
          year: p.year || new Date().getFullYear().toString(),
          tags: p.tags && p.tags.length > 0 ? p.tags : ["New", p.category || "Design"],
          color: "from-slate-600/20 to-slate-900/10",
          accent: "#64748b",
          symbol: "✧",
          image: p.image || null,
          status: p.status
        }));
        setLiveProjects(mapped);
      }
    }
    fetchFromSupabase();
  }, []);

  const filtered =
    activeFilter === "All"
      ? liveProjects
      : liveProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="orb orb-cyan w-96 h-96 top-0 left-0 absolute animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="tag mb-8 inline-flex">Our Work</div>
            <h1 className="section-title mb-6 max-w-3xl mx-auto">
              Work That <span className="gradient-text">Speaks</span> for Itself
            </h1>
            <p className="section-subtitle mx-auto text-center">
              Explore our portfolio of brand identities, digital products, packaging systems, and web experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                id={`filter-${f.toLowerCase().replace("/", "-")}`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <Link
                    href={`/portfolio/${project.id}`}
                    className="block group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 h-72 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}20 0%, #1A3263 100%)`,
                    }}
                  >
                    {project.image ? (
                      <div className="absolute inset-0 z-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      </div>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                        <div className="absolute inset-0 dot-pattern opacity-10" />
                        <div
                          className="absolute -right-4 -bottom-4 text-[120px] leading-none opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 select-none"
                          style={{ color: project.accent }}
                        >
                          {project.symbol}
                        </div>
                      </>
                    )}

                    <div className="relative z-10 p-7 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: project.image ? '#ffffff' : project.accent }}
                        >
                          {project.category}
                        </span>
                        <span className="text-xs text-white/70 dark:text-slate-500">{project.year}</span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <div className="flex gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full"
                              style={{
                                background: `${project.accent}15`,
                                color: project.accent,
                                border: `1px solid ${project.accent}30`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 w-9 h-9 rounded-full glass border border-black/10 dark:border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ExternalLink size={13} className="text-slate-900 dark:text-white" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
