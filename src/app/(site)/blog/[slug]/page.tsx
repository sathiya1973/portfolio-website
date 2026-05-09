import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";

const posts: Record<string, {
  title: string; category: string; date: string; readTime: string;
  excerpt: string; content: string; accent: string;
}> = {
  "ui-ux-trends-2024": {
    title: "10 UI/UX Design Trends Dominating 2024",
    category: "UI/UX", date: "April 18, 2024", readTime: "6 min",
    accent: "#7c3aed",
    excerpt: "From bento grid layouts to AI-assisted personalization, discover the design language reshaping digital products.",
    content: `
## The Rise of Bento Grid Layouts

Inspired by Japanese bento boxes, this modular grid system offers flexibility and visual hierarchy that flat layouts simply can't match. Expect to see asymmetric grids with mixed content sizes dominating dashboards and landing pages.

## AI-Personalized Interfaces

Machine learning now enables truly adaptive UIs — interfaces that learn from user behavior and rearrange themselves to surface the most relevant features. Products like Notion AI and Figma's AI features are pioneering this space.

## Glassmorphism 2.0

While glassmorphism had its peak in 2021, 2024 brings a more refined iteration — softer blurs, subtle depth layers, and integration with dark themes for a premium aesthetic.

## Variable Fonts & Kinetic Typography

Type is becoming motion. Variable fonts enable smooth weight transitions on scroll, on hover, and in response to user input — adding a layer of expressiveness that was previously only possible with video.

## Spatial Design Thinking

With the rise of spatial computing (Apple Vision Pro, Meta Quest), UI designers are beginning to think in 3D. Even for 2D interfaces, spatial metaphors — depth, shadow, layering — are increasingly central to the design vocabulary.
    `,
  },
};

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  return {
    title: post?.title ?? "Blog Post",
    description: post?.excerpt ?? "Design insights from SATHIYAMOORTHY K.",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = posts[slug] ?? {
    title: "Design Insights", category: "Design", date: "2024", readTime: "5 min",
    accent: "#7c3aed", excerpt: "Insights from the SATHIYAMOORTHY K team.",
    content: "## Article Content\n\nThis article is coming soon. Check back shortly for the full content.",
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white text-sm mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider" style={{ color: post.accent }}>
              <Tag size={10} /> {post.category}
            </span>
            <span className="text-slate-500 dark:text-slate-500 text-xs">·</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
              <Clock size={10} /> {post.readTime} read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-3 py-5 border-t border-b border-black/5 dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-slate-900 dark:text-white text-sm font-bold">
              PE
            </div>
            <div>
              <div className="text-slate-900 dark:text-white text-sm font-semibold">SATHIYAMOORTHY K Team</div>
              <div className="text-slate-500 dark:text-slate-500 text-xs">{post.date}</div>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="prose-dark space-y-6">
          {post.content.split("\n\n").filter(Boolean).map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-3">{block.replace("## ", "")}</h2>;
            }
            return <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed">{block.trim()}</p>;
          })}
        </div>

        <div className="mt-16 p-8 glass rounded-3xl border border-black/5 dark:border-white/5 text-center">
          <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-3">Ready to Transform Your Brand?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Let&apos;s discuss how these trends can be applied to your next project.</p>
          <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center">
            <span>Get a Free Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
