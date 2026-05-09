"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, LuminaTech",
    rating: 5,
    text: "SATHIYAMOORTHY K completely transformed our brand. The new identity increased our conversion rate by 280% within 3 months of launch. Truly exceptional work.",
    avatar: "SC",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, Nexus Finance",
    rating: 5,
    text: "The UI/UX redesign they delivered was nothing short of revolutionary. Our app went from 2.1 to 4.8 stars overnight. SATHIYAMOORTHY K just gets it.",
    avatar: "MR",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Priya Sharma",
    role: "Brand Director, Terra Organics",
    rating: 5,
    text: "Our packaging redesign went viral. 1M+ organic impressions, 400% increase in retail sales. SATHIYAMOORTHY K delivered beyond our wildest expectations.",
    avatar: "PS",
    color: "from-emerald-500 to-teal-600",
  },
];

const logos = [
  "LuminaTech", "Nexus Finance", "Terra Organics", "Phantom Studio",
  "Vortex Media", "Crest Capital", "BloomHouse", "Arcano Labs"
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative bg-slate-50 dark:bg-[#060609]" id="testimonials">
      <div className="orb orb-cyan w-96 h-96 -bottom-48 -left-48 absolute animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag mb-6 inline-flex">Client Love</div>
          <h2 className="section-title mb-4">
            Results That{" "}
            <span className="gradient-text">Matter</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Don&apos;t take our word for it — hear from the brands we&apos;ve helped transform.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-glass p-7 relative"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-violet-500/30 absolute top-6 right-6"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-slate-900 dark:text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-slate-900 dark:text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-slate-500 dark:text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-center text-xs uppercase tracking-widest text-slate-600 mb-8">
            Trusted by leading brands
          </p>
          <div className="marquee-container">
            <div className="marquee-inner">
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-6 py-3 glass rounded-full border border-black/5 dark:border-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
