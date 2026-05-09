"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden bg-transparent">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="orb orb-purple w-80 h-80 -top-20 -right-20 absolute" />
          <div className="orb orb-cyan w-60 h-60 -bottom-10 -left-10 absolute" />

          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="tag">
                <Zap size={12} className="text-amber-400" />
                Ready to Transform Your Brand?
              </div>
            </div>
            <h2 className="section-title mb-6 max-w-3xl mx-auto">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Extraordinary</span> Together
            </h2>
            <p className="section-subtitle mx-auto text-center mb-10">
              Whether you&apos;re launching a new brand or refreshing an existing one, we&apos;re here to make it legendary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-10 py-4 w-full sm:w-auto justify-center">
                <span className="flex items-center gap-2">
                  Get a Free Consultation <ArrowRight size={18} />
                </span>
              </Link>
              <Link href="/portfolio" className="btn-outline text-base px-10 py-4 w-full sm:w-auto justify-center">
                View Case Studies
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                "No commitment required",
                "Response within 24 hours",
                "100% confidential",
                "Fixed-price projects",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
