"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Play } from "lucide-react";

const words = ["Brands", "Products", "Experiences", "Ideas", "Futures"];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-transparent/60 backdrop-blur-[2px]" />

      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-overlay" />

      {/* Orbs */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="orb orb-purple w-[600px] h-[600px] top-[-100px] left-[-150px] animate-pulse-glow" />
        <div className="orb orb-cyan w-[500px] h-[500px] bottom-[-100px] right-[-100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="orb orb-pink w-[300px] h-[300px] top-[40%] left-[60%] animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </motion.div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div
              className={`w-${4 + i * 2} h-${4 + i * 2} border border-violet-500/20 ${i % 2 === 0 ? "rounded-lg" : "rounded-full"}`}
              style={{ width: `${24 + i * 8}px`, height: `${24 + i * 8}px` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="tag">
            <Sparkles size={12} />
            Award-Winning Creative Consultant
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-title mb-6 max-w-5xl mx-auto"
        >
          My Design Experiences
          <br />
          That{" "}
          <span className="relative inline-block">
            <span className="gradient-text text-glow-purple">Define</span>
          </span>{" "}
          Brands
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="section-subtitle mx-auto text-center mb-10 text-lg"
        >
          SATHIYAMOORTHY K - Creative Consultant | Freelancer crafting bold identities,
          immersive digital experiences, and strategies that make your brand
          impossible to ignore.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/portfolio" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
            <span className="flex items-center gap-2">
              View Our Work <ArrowRight size={18} />
            </span>
          </Link>
          <Link href="/contact" className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center">
            <span className="flex items-center gap-2">
              <Play size={16} className="text-violet-400" /> Start a Project
            </span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "200+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
            { value: "7+", label: "Years of Expertise" },
            { value: "12", label: "Design Awards" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="stat-number mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-violet-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
