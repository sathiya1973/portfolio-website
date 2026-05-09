"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    slug: "ui-ux-trends-2024",
    title: "10 UI/UX Design Trends Dominating 2024",
    excerpt: "From bento grid layouts to AI-assisted personalization, discover the design language that's reshaping how users interact with digital products.",
    category: "UI/UX",
    readTime: "6 min",
    date: "April 18, 2024",
    accent: "#7c3aed",
  },
  {
    slug: "brand-identity-guide",
    title: "The Anatomy of a Strong Brand Identity System",
    excerpt: "Logo, color, typography, voice — learn how to build a cohesive brand system that communicates consistently across every touchpoint.",
    category: "Branding",
    readTime: "8 min",
    date: "April 10, 2024",
    accent: "#06b6d4",
  },
  {
    slug: "packaging-design-ecommerce",
    title: "Why Packaging Design Is Your Best Marketing Tool",
    excerpt: "In the age of unboxing videos and Instagram aesthetics, your packaging is your most underrated growth lever. Here's how to design it right.",
    category: "Packaging",
    readTime: "5 min",
    date: "March 28, 2024",
    accent: "#10b981",
  },
  {
    slug: "seo-for-design-agencies",
    title: "SEO Strategies Every Creative Agency Needs in 2024",
    excerpt: "Think SEO is just for e-commerce? Think again. These proven strategies will help your agency rank higher and attract better-fit clients.",
    category: "Marketing",
    readTime: "7 min",
    date: "March 15, 2024",
    accent: "#f59e0b",
  },
  {
    slug: "nextjs-website-performance",
    title: "How Next.js Delivers Lighthouse 100 Performance Scores",
    excerpt: "A deep dive into how we achieve perfect Lighthouse scores for client websites using Next.js, ISR, image optimization, and edge caching.",
    category: "Web Dev",
    readTime: "9 min",
    date: "February 22, 2024",
    accent: "#ec4899",
  },
  {
    slug: "color-psychology-branding",
    title: "Color Psychology in Brand Design: A Complete Guide",
    excerpt: "Colors trigger emotions and drive decisions. Learn how to choose the right color palette for your brand and what each color communicates.",
    category: "Branding",
    readTime: "6 min",
    date: "February 10, 2024",
    accent: "#6366f1",
  },
];

const featured = posts[0];

export default function BlogPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="orb orb-purple w-80 h-80 top-0 right-20 absolute animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="tag mb-8 inline-flex">Knowledge Hub</div>
            <h1 className="section-title mb-6 max-w-3xl mx-auto">
              Insights on <span className="gradient-text">Design,</span>{" "}
              Brand & Marketing
            </h1>
            <p className="section-subtitle mx-auto text-center">
              Deep dives, practical guides, and trend reports from the SATHIYAMOORTHY K creative team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link href={`/blog/${featured.slug}`} className="block group">
              <div
                className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 p-10 md:p-14"
                style={{
                  background: `radial-gradient(ellipse at top right, ${featured.accent}20 0%, transparent 60%), #080810`,
                }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ background: `${featured.accent}20`, color: featured.accent }}
                      >
                        Featured · {featured.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                        <Clock size={12} /> {featured.readTime} read
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-violet-300 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: featured.accent }}>
                      Read Article <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center flex-shrink-0 text-5xl"
                    style={{ background: `${featured.accent}15`, border: `1px solid ${featured.accent}30` }}
                  >
                    ✦
                  </div>
                </div>
                <div className="mt-6 text-xs text-slate-500 dark:text-slate-500">{featured.date}</div>
              </div>
            </Link>
          </motion.div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <div className="card-glass p-7 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: post.accent }}
                      >
                        <Tag size={10} /> {post.category}
                      </span>
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3 group-hover:text-violet-300 transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                      <span className="text-xs text-slate-500 dark:text-slate-500">{post.date}</span>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                        <Clock size={11} /> {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
