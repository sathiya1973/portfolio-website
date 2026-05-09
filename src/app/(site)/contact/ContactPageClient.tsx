"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const services = [
  "UI/UX Design", "Logo & Branding", "Graphic Design",
  "Poster Design", "Website Design & Dev", "Packaging Design", "Digital Marketing"
];

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="orb orb-purple w-80 h-80 top-0 right-0 absolute animate-pulse-glow" />
        <div className="orb orb-cyan w-60 h-60 bottom-0 left-20 absolute animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="tag mb-8 inline-flex">Get in Touch</div>
            <h1 className="section-title mb-6 max-w-3xl mx-auto">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="section-subtitle mx-auto text-center">
              Tell us about your project. We respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact cards */}
            {[
              { Icon: Mail, title: "Email", value: "hello@sathiyamoorthyk.com", sub: "We reply within 24 hours" },
              { Icon: Phone, title: "Phone / WhatsApp", value: "+91 98765 43210", sub: "Mon–Sat, 9AM–7PM IST" },
              { Icon: MapPin, title: "Studio", value: "Mumbai, India", sub: "Available globally" },
              { Icon: MessageSquare, title: "WhatsApp Chat", value: "Chat directly", sub: "Instant response" },
            ].map(({ Icon, title, value, sub }) => (
              <div key={title} className="card-glass p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-slate-900 dark:text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1">{title}</div>
                  <div className="text-slate-900 dark:text-white font-semibold text-sm">{value}</div>
                  <div className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 relative"
              style={{ height: 200 }}
            >
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <iframe
                title="SATHIYAMOORTHY K Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.967!2d72.877!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzcuMiJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="200"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl border border-black/5 dark:border-white/5 p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 size={64} className="text-emerald-400 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Message Received!</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-input"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="contact-company">Company / Brand</label>
                    <input
                      id="contact-company"
                      type="text"
                      className="form-input"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="contact-service">Service Needed *</label>
                      <select
                        id="contact-service"
                        className="form-input"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-budget">Budget Range</label>
                      <select
                        id="contact-budget"
                        className="form-input"
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      >
                        <option value="">Select budget</option>
                        <option>Under ₹50,000</option>
                        <option>₹50K – ₹1 Lakh</option>
                        <option>₹1L – ₹5 Lakhs</option>
                        <option>₹5L – ₹10 Lakhs</option>
                        <option>₹10L+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="contact-message">Project Brief *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    id="contact-submit"
                    className="btn-primary w-full justify-center text-base py-4"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send size={16} />
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 dark:text-slate-500">
                    By submitting, you agree to our Privacy Policy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
