"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Palette,
  Globe,
  TrendingUp,
  Package,
  Monitor,
  FileImage,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "UI/UX Design",
    desc: "Intuitive, beautiful interfaces that users love. From wireframes to high-fidelity prototypes.",
    color: "from-violet-500 to-purple-600",
    href: "/portfolio/ui-ux",
  },
  {
    icon: Palette,
    title: "Logo & Branding",
    desc: "Distinctive brand identities that communicate your values and stand the test of time.",
    color: "from-cyan-500 to-blue-600",
    href: "/portfolio/logo-design",
  },
  {
    icon: FileImage,
    title: "Graphic Design",
    desc: "Stunning visuals that captivate attention — from social media to print collateral.",
    color: "from-pink-500 to-rose-600",
    href: "/portfolio/graphic-design",
  },
  {
    icon: ImageIcon,
    title: "Poster Design",
    desc: "Bold, expressive poster design that commands attention and communicates powerfully.",
    color: "from-amber-500 to-orange-600",
    href: "/portfolio/graphic-design",
  },
  {
    icon: Globe,
    title: "Website Design & Dev",
    desc: "Pixel-perfect websites built for performance, SEO, and conversion optimization.",
    color: "from-emerald-500 to-teal-600",
    href: "/portfolio/web-design",
  },
  {
    icon: Package,
    title: "Packaging Design",
    desc: "Product packaging that tells a story and creates an unforgettable unboxing experience.",
    color: "from-indigo-500 to-violet-600",
    href: "/portfolio/packaging-design",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Data-driven strategies that grow your audience and drive measurable ROI.",
    color: "from-red-500 to-pink-600",
    href: "/portfolio/digital-marketing",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative bg-slate-50 dark:bg-[#060609]" id="services">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag mb-6 inline-flex">Our Expertise</div>
          <h2 className="section-title mb-4">
            Services That Move the{" "}
            <span className="gradient-text">Needle</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            From concept to launch, we deliver holistic creative solutions
            tailored to ambitious brands.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={item}>
                <Link href={service.href} className="block h-full group">
                  <div className="card-glass p-6 h-full flex flex-col gap-4 relative overflow-hidden">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon size={22} className="text-slate-900 dark:text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-1 text-violet-400 text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Gradient hover overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-[20px]`}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-outline">
            Explore All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
