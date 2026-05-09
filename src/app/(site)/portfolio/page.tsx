import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Portfolio | Pattern Edge",
  description: "Explore Pattern Edge's portfolio across Graphic Design, Logo Design, Packaging, Branding, Web Design, UI/UX, and Digital Marketing.",
};

export default function PortfolioIndexPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050508]">
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="orb orb-purple w-[500px] h-[500px] -top-32 -right-32 absolute animate-pulse-glow" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="tag mb-8 inline-flex">Our Work</div>
          <h1 className="section-title mb-6 max-w-3xl mx-auto">
            Work That <span className="gradient-text">Speaks</span> for Itself
          </h1>
          <p className="section-subtitle mx-auto text-center max-w-2xl">
            Explore our portfolio across every creative discipline — from brand identity and packaging to web experiences and digital campaigns.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => {
              const accents = [
                { bg: "from-violet-600/30 to-purple-900/20", color: "#7c3aed", symbol: "✦" },
                { bg: "from-cyan-600/30 to-blue-900/20",     color: "#06b6d4", symbol: "◈" },
                { bg: "from-emerald-600/30 to-green-900/20", color: "#10b981", symbol: "❋" },
                { bg: "from-amber-600/30 to-orange-900/20",  color: "#f59e0b", symbol: "◉" },
                { bg: "from-pink-600/30 to-rose-900/20",     color: "#ec4899", symbol: "⬡" },
                { bg: "from-indigo-600/30 to-violet-900/20", color: "#6366f1", symbol: "⌬" },
                { bg: "from-teal-600/30 to-cyan-900/20",     color: "#14b8a6", symbol: "✿" },
              ];
              const { bg, color, symbol } = accents[i % accents.length];

              return (
                <Link
                  key={cat.slug}
                  href={`/portfolio/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 h-52 cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${color}22 0%, #050508 100%)` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-70`} />
                  <div className="absolute inset-0 dot-pattern opacity-10" />
                  {/* Symbol */}
                  <div
                    className="absolute -right-4 -bottom-4 text-[110px] leading-none opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 select-none"
                    style={{ color }}
                  >
                    {symbol}
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>
                      View Projects
                    </p>
                    <h2 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                      {cat.label}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
