"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Cpu, Layers, ArrowRight, Lightbulb, PenTool, Layout, Code, CheckCircle, Rocket, Download } from "lucide-react";
import Link from "next/link";

const experiences = [
  { role: "Sr.UI /UX- Visual Designer", company: "Integra Software Services Pvt ltd.", period: "Jan 2021 - Present", desc: "Leading the UI/UX design  team, creating comprehensive design systems and interactive prototypes." },
  { role: "UI/UX-Visual Designer", company: "PRIMUS GLOBAL TECHNOLOGIES Pvt.Ltd.", period: "Jan 2019 - June 2020", desc: "Designed responsive websites, brand identities, and marketing materials for diverse clients." },
];

const education = [
  { degree: "Diploma in Multimedia Designing", institution: "Soft View Design Institute", period: "2006 - 2007", desc: "Specialized in UI/UX, interaction design, and digital media." },
  { degree: "Bachelor of Engineering", institution: "Bharathidasan University", period: "2000 - 2004", desc: "Foundation in computer science, software engineering, and problem-solving." },
];

const skills = [
  { name: "Photoshop", percentage: 77, color: "text-blue-500" },
  { name: "Illustrator", percentage: 75, color: "text-orange-500" },
  { name: "Figma / Adobe Xd", percentage: 78, color: "text-purple-500" },
  { name: "Canva", percentage: 80, color: "text-green-500" },
  
];

const processes = [
  { name: "Idea", Icon: Lightbulb },
  { name: "Concept", Icon: PenTool },
  { name: "Design", Icon: Layout },
  { name: "Develop", Icon: Code },
  { name: "Test", Icon: CheckCircle },
  { name: "Launch", Icon: Rocket },
];

const values = [
  { Icon: Target, title: "Purpose-Driven Design", desc: "Every pixel has intent. We design with strategy, ensuring aesthetics align with business goals." },
  { Icon: Eye, title: "Obsessive Craft", desc: "We sweat the small stuff. Details distinguish good design from extraordinary design." },
  { Icon: Cpu, title: "Innovation First", desc: "We explore emerging technologies and design trends to keep your brand ahead of the curve." },
  { Icon: Layers, title: "Holistic Thinking", desc: "We see the full picture — brand, digital, print, marketing — and how they work together." },
];

export default function AboutPageClient() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="orb orb-purple w-96 h-96 top-0 right-0 absolute animate-pulse-glow" />
        <div className="orb orb-cyan w-80 h-80 bottom-0 left-0 absolute animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="tag mb-8 inline-flex">Our Story</div>
            <h1 className="section-title mb-6 max-w-4xl mx-auto">
              A Studio Built on{" "}
              <span className="gradient-text">Obsession</span> with Craft
            </h1>
            <p className="section-subtitle mx-auto text-center">
              Founded in 2017, SATHIYAMOORTHY K began as a two-person passion project and grew into a full-service creative powerhouse
              trusted by brands worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-slate-50 dark:bg-[#060609]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Visual placeholder */}
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Profile Image */}
              <img 
                src="/images/about-me.jpg" 
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl bg-slate-200 dark:bg-slate-800" 
              />
              <div className="absolute inset-0 rounded-3xl border border-black/10 dark:border-white/10 pointer-events-none" />
              {/* Corner badges */}
              <div className="absolute -top-4 -right-4 glass border border-black/10 dark:border-white/10 rounded-2xl p-4 text-center">
                <div className="stat-number text-3xl">15+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Years</div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass border border-black/10 dark:border-white/10 rounded-2xl p-4 text-center">
                <div className="stat-number text-3xl">200+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Projects</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="tag mb-6 inline-flex">Who I am</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Please Pursue my  <span className="gradient-text">Portfolio</span> to get the opportunity to show my Works.
            </h2>
            <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                SATHIYAMOORTHY K have over 15+ years of experience in the Creative Design, Visual and Web Designing. My experience includes the UX Process and wireframs,Prototype and Visual Mockups, Creative and Concept Based Design,I have client work has involved large, medium and small organizations spanning all Ecommerce and Coporate industries.
              </p>
              <p>
                A creative team player that can also work solo, I'm a perfectionist for details and extremely organized. I have a strong base of Graphic Design and Visual Design skills and up-to-date knowledge of the major graphic design programs, skills and strong business acumen. In my graphic design work, I respect and utilize color, typography, research, visual stimulation and sudden inspiration to effectively communicate a client's messages and identity.
              </p>
              <p>
                As a Creative designer, I have enhanced my business aptitude with a creative flair, working to design and execute impactful visual communications. Creative have been in my life since I was a child and I always loved anything related with Sketching and Colors, so I started to design at a very young age, most of my skills and knowledge are self taught.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/portfolio" className="btn-primary w-full sm:w-auto justify-center">
                <span className="flex items-center gap-2">View More <ArrowRight size={16} /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="tag mb-6 inline-flex">Our Philosophy</div>
            <h2 className="section-title mb-4">
              The Values That <span className="gradient-text">Drive</span> Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.Icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-glass p-7"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">{v.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resume & Experience */}
      <section className="section-padding bg-slate-50 dark:bg-[#060609]" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="tag mb-6 inline-flex">My Resume</div>
            <h2 className="section-title mb-8">
              Experience & <span className="gradient-text">Education</span>
            </h2>
            <a href="/resume.pdf" download className="btn-primary inline-flex items-center gap-2">
              <Download size={18} /> Download Resume
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                <span className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-500 flex items-center justify-center text-sm">💼</span>
                Experience
              </h3>
              <div className="space-y-8 border-l-2 border-black/5 dark:border-white/5 ml-4 pl-8 relative">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-violet-500 ring-4 ring-slate-50 dark:ring-[#060609]" />
                    <div className="text-sm font-bold text-violet-500 mb-1">{exp.period}</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">{exp.company}</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{exp.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center text-sm">🎓</span>
                Education
              </h3>
              <div className="space-y-8 border-l-2 border-black/5 dark:border-white/5 ml-4 pl-8 relative">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-slate-50 dark:ring-[#060609]" />
                    <div className="text-sm font-bold text-cyan-500 mb-1">{edu.period}</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">{edu.institution}</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{edu.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="tag mb-6 inline-flex">Expertise</div>
            <h2 className="section-title mb-4">
              Software <span className="gradient-text">Skills</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, i) => {
              const radius = 50;
              const circumference = radius * 2 * Math.PI;
              const offset = circumference - (skill.percentage / 100) * circumference;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-black/5 dark:text-white/5" />
                      <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} className={`${skill.color} drop-shadow-[0_0_8px_currentColor]`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{skill.percentage}%</span>
                    </div>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">{skill.name}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="section-padding bg-slate-50 dark:bg-[#060609]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="tag mb-6 inline-flex">How I Work</div>
            <h2 className="section-title mb-4">
              Work <span className="gradient-text">Process</span>
            </h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-black/5 dark:bg-white/5" />
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
              {processes.map((proc, i) => {
                const Icon = proc.Icon;
                return (
                  <motion.div
                    key={proc.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-[#0d0d14] border-2 border-black/10 dark:border-white/10 flex items-center justify-center mb-4 shadow-xl relative group hover:border-violet-500 transition-colors">
                      <div className="absolute -top-3 bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <Icon size={24} className="text-slate-600 dark:text-slate-300 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm">{proc.name}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
