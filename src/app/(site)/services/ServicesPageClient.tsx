"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Monitor, Palette, FileImage, Image as ImageIcon,
  Globe, Package, TrendingUp, CheckCircle2, ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "uiux",
    icon: Monitor,
    title: "UI/UX Design",
    tagline: "Interfaces users fall in love with",
    desc: "From initial research and wireframing to high-fidelity design and interactive prototypes, we craft digital experiences that are intuitive, accessible, and visually stunning.",
    features: [
      "User Research & Persona Development",
      "Information Architecture",
      "Wireframing & Prototyping",
      "High-Fidelity UI Design",
      "Usability Testing",
      "Design System Creation",
    ],
    color: "from-violet-500 to-purple-600",
    bgGlow: "rgba(124,58,237,0.1)",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Logo & Branding",
    tagline: "Identities that endure",
    desc: "We build brand identities from the ground up — defining your visual language, tone of voice, and brand system to create recognition, trust, and desire.",
    features: [
      "Brand Strategy & Positioning",
      "Logo Design & Variations",
      "Color Palette & Typography",
      "Brand Guidelines Document",
      "Stationery & Collateral Design",
      "Brand Voice & Messaging",
    ],
    color: "from-cyan-500 to-blue-600",
    bgGlow: "rgba(6,182,212,0.1)",
  },
  {
    id: "graphic",
    icon: FileImage,
    title: "Graphic Design",
    tagline: "Visuals that command attention",
    desc: "Our graphic design work spans digital and print — from social media assets and infographics to banners, flyers, and editorial layouts that make your brand shine in every context.",
    features: [
      "Social Media Design",
      "Infographics & Data Visualization",
      "Banners & Display Ads",
      "Brochures & Flyers",
      "Presentations & Pitch Decks",
      "Email Templates",
    ],
    color: "from-pink-500 to-rose-600",
    bgGlow: "rgba(236,72,153,0.1)",
  },
  {
    id: "poster",
    icon: ImageIcon,
    title: "Poster Design",
    tagline: "Bold art that demands to be seen",
    desc: "We create expressive, high-impact poster designs for events, campaigns, exhibitions, and cultural projects. Every poster we design tells a story and stops people in their tracks.",
    features: [
      "Event & Concert Posters",
      "Campaign Posters",
      "Movie & Music Posters",
      "Corporate Event Posters",
      "Exhibition Displays",
      "Print-Ready Files",
    ],
    color: "from-amber-500 to-orange-600",
    bgGlow: "rgba(245,158,11,0.1)",
  },
  {
    id: "webdev",
    icon: Globe,
    title: "Website Design & Development",
    tagline: "Websites that perform as beautifully as they look",
    desc: "We design and build websites that are fast, SEO-optimized, and conversion-focused. From elegant brochure sites to complex web applications, we deliver excellence.",
    features: [
      "Custom Web Design",
      "Next.js / React Development",
      "CMS Integration (WordPress, Sanity)",
      "E-commerce (Shopify, WooCommerce)",
      "SEO & Performance Optimization",
      "Ongoing Maintenance & Support",
    ],
    color: "from-emerald-500 to-teal-600",
    bgGlow: "rgba(16,185,129,0.1)",
  },
  {
    id: "packaging",
    icon: Package,
    title: "Packaging Design",
    tagline: "The first impression that matters most",
    desc: "We create packaging designs that stand out on shelves and screens alike — combining structural thinking with beautiful visual design to make your product irresistible.",
    features: [
      "Consumer Product Packaging",
      "Luxury Brand Packaging",
      "Label & Tag Design",
      "Box & Sleeve Design",
      "E-commerce Packaging",
      "Dieline & Print-Ready Files",
    ],
    color: "from-indigo-500 to-violet-600",
    bgGlow: "rgba(99,102,241,0.1)",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    tagline: "Growth that&apos;s measurable and sustainable",
    desc: "Data-driven digital marketing strategies that drive traffic, build communities, and generate revenue. From SEO to paid media, we help you dominate your market.",
    features: [
      "SEO Strategy & Execution",
      "Google & Meta Ads Management",
      "Social Media Marketing",
      "Content Marketing & Blogging",
      "Email Marketing Campaigns",
      "Analytics & Performance Reporting",
    ],
    color: "from-red-500 to-pink-600",
    bgGlow: "rgba(239,68,68,0.1)",
  },
];

export default function ServicesPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="orb orb-purple w-96 h-96 top-0 right-0 absolute animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="tag mb-8 inline-flex">What We Do</div>
            <h1 className="section-title mb-6 max-w-3xl mx-auto">
              Comprehensive Creative{" "}
              <span className="gradient-text">Services</span>
            </h1>
            <p className="section-subtitle mx-auto text-center">
              From brand strategy to development, we offer every creative service your business needs to grow, compete, and lead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 p-8 md:p-12"
                style={{ background: `radial-gradient(ellipse at top left, ${service.bgGlow} 0%, transparent 60%)` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                      <Icon size={26} className="text-slate-900 dark:text-white" />
                    </div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-widest">
                      {service.tagline}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-5">{service.title}</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{service.desc}</p>
                    <Link href="/contact" className="btn-primary text-sm py-3 px-7 w-full sm:w-auto justify-center">
                      <span className="flex items-center gap-2">Get a Quote <ArrowRight size={15} /></span>
                    </Link>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-5 font-semibold">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-sm">
                          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 p-5 glass rounded-2xl border border-black/5 dark:border-white/5">
                      <div className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-2">Service Number</div>
                      <div className="font-display text-5xl gradient-text">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
