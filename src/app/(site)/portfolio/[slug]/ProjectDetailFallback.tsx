import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Static project detail data kept intact (no inbound links per plan Phase 4)
const projects: Record<string, {
  title: string; category: string; year: string;
  client: string; services: string[]; duration: string;
  problem: string; solution: string; outcome: string;
  accent: string;
}> = {
  "luminary-brand": {
    title: "Luminary Brand Identity", category: "Branding", year: "2024",
    client: "Luminary Wellness", services: ["Brand Strategy", "Logo Design", "Brand Guidelines", "Stationery"],
    duration: "6 weeks",
    problem: "Luminary was a luxury wellness startup with a generic identity that didn't reflect its premium positioning.",
    solution: "We developed a complete brand identity system anchored in 'inner radiance' — a minimal wordmark with a geometric mark inspired by light refraction.",
    outcome: "3x increase in premium retail placement, 280% rise in online conversion, featured in two design publications.",
    accent: "#7c3aed",
  },
  "nexus-app": {
    title: "Nexus Finance App", category: "UI/UX", year: "2024",
    client: "Nexus Finance", services: ["UX Research", "UI Design", "Prototype", "Design System"],
    duration: "10 weeks",
    problem: "A technically robust fintech platform with a confusing UX leading to high drop-off during onboarding.",
    solution: "We redesigned the full app flow — simplifying onboarding from 14 steps to 4 and creating a comprehensive design system.",
    outcome: "App store rating from 2.1 to 4.8, onboarding completion +340%, MAU grew 60% in 90 days.",
    accent: "#06b6d4",
  },
};

export default function ProjectDetailFallback({ slug }: { slug: string }) {
  const project = projects[slug] ?? {
    title: "Project", category: "Work", year: "2024", client: "Client",
    services: ["Design"], duration: "4 weeks",
    problem: "The client needed a fresh creative approach.",
    solution: "We delivered an exceptional solution.",
    outcome: "Outstanding results achieved.",
    accent: "#7c3aed",
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white text-sm mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: project.accent }}>
            {project.category} · {project.year}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">{project.title}</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Client",   value: project.client },
              { label: "Duration", value: project.duration },
              { label: "Year",     value: project.year },
              { label: "Services", value: project.services[0] + (project.services.length > 1 ? "…" : "") },
            ].map(({ label, value }) => (
              <div key={label} className="glass rounded-2xl p-4 border border-black/5 dark:border-white/5">
                <div className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-slate-900 dark:text-white text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual placeholder */}
        <div
          className="rounded-3xl aspect-video mb-12 flex items-center justify-center border border-black/5 dark:border-white/5 relative overflow-hidden"
          style={{ background: `radial-gradient(ellipse at center, ${project.accent}20 0%, #050508 70%)` }}
        >
          <div className="text-8xl opacity-20">✦</div>
          <div className="absolute bottom-6 right-6 flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs">
            <ExternalLink size={12} /> Case Study Visual
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "The Problem",  content: project.problem,  icon: "01" },
            { label: "Our Solution", content: project.solution, icon: "02" },
            { label: "The Outcome",  content: project.outcome,  icon: "03" },
          ].map(({ label, content, icon }) => (
            <div key={label} className="card-glass p-7">
              <div className="font-display text-4xl gradient-text mb-3">{icon}</div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3">{label}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="btn-primary text-base px-10 py-4 w-full sm:w-auto justify-center">
            <span>Start Your Project</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
