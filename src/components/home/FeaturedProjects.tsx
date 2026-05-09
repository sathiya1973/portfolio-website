"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { CATEGORIES } from "@/lib/categories";

const projects = [
  {
    id: "luminary-brand",
    title: "Luminary Brand Identity",
    category: "Branding",
    tags: ["Logo", "Brand System", "Stationery"],
    year: "2024",
    description:
      "Complete brand identity system for a luxury wellness startup — from logo to brand guidelines.",
    color: "from-violet-600/30 to-purple-900/20",
    accentColor: "#7c3aed",
    emoji: "✦",
  },
  {
    id: "nexus-app",
    title: "Nexus Finance App",
    category: "UI/UX",
    tags: ["Mobile App", "Dashboard", "UX Research"],
    year: "2024",
    description:
      "A fintech mobile app redesign that increased user engagement by 340% and reduced churn by 60%.",
    color: "from-cyan-600/30 to-blue-900/20",
    accentColor: "#06b6d4",
    emoji: "◈",
  },
  {
    id: "terra-packaging",
    title: "Terra Organic Packaging",
    category: "Packaging",
    tags: ["Packaging", "Print", "Sustainability"],
    year: "2024",
    description:
      "Eco-conscious packaging design that became a viral sensation — 1M+ Instagram impressions.",
    color: "from-emerald-600/30 to-green-900/20",
    accentColor: "#10b981",
    emoji: "❋",
  },
  {
    id: "phantom-web",
    title: "Phantom Studio Website",
    category: "Web Design",
    tags: ["Next.js", "Three.js", "Animation"],
    year: "2023",
    description:
      "Award-winning website for a creative studio with 3D visuals and scroll-triggered animations.",
    color: "from-pink-600/30 to-rose-900/20",
    accentColor: "#ec4899",
    emoji: "⬡",
  },
];

export default function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [liveProjects, setLiveProjects] = useState<any[]>(projects);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    async function fetchFromSupabase() {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("status", "Live")
        .order("created_at", { ascending: false })
        .limit(6);

      if (data && !error && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id.toString(),
          title: p.title || "Untitled",
          category: p.category || "Branding",
          year: p.year || new Date().getFullYear().toString(),
          tags: p.tags && p.tags.length > 0 ? p.tags : ["New", p.category || "Design"],
          description: p.description || "View the full details and case study for this project.",
          color: "from-slate-600/30 to-slate-900/20",
          accentColor: "#64748b",
          emoji: "✧",
          image: p.image || null,
          status: p.status
        }));
        setLiveProjects(mapped);
      }
    }
    fetchFromSupabase();
  }, []);

  return (
    <section className="section-padding relative bg-transparent" id="work">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="orb orb-purple w-96 h-96 top-1/4 -right-48 absolute animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="tag mb-6 inline-flex">Featured Work</div>
            <h2 className="section-title">
              Projects That{" "}
              <span className="gradient-text">Speak</span> Volumes
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/portfolio" className="btn-outline text-sm">
              All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                href={`/portfolio/${CATEGORIES.find(c => c.dbValue === project.category)?.slug ?? "graphic-design"}`}
                className="block group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 h-80 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${project.color.split(" ")[0].replace("from-", "").replace("/30", "")}22 0%, #1A3263 100%)`,
                }}
              >
                {project.image ? (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>
                ) : (
                  <>
                    {/* BG gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`}
                    />
                    <div className="absolute inset-0 dot-pattern opacity-10" />

                    {/* Huge emoji / shape */}
                    <div
                      className="absolute -right-8 -bottom-8 text-[160px] leading-none opacity-10 select-none group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"
                      style={{ color: project.accentColor }}
                    >
                      {project.emoji}
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: project.image ? '#ffffff' : project.accentColor }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs text-white/70 dark:text-slate-500">{project.year}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-opacity-90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 dark:text-slate-400 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0 transform">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border"
                          style={{
                            borderColor: `${project.accentColor}30`,
                            color: project.accentColor,
                            background: `${project.accentColor}10`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full glass border border-black/10 dark:border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                  <ExternalLink size={14} className="text-slate-900 dark:text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/portfolio" className="btn-primary group">
            <span>View More Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
