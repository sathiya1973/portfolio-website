"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "919600163557"; // +91 96001 63557 (matches number shown on page)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build a clean WhatsApp message from form fields
    const lines: string[] = [
      "Hi Sathiyamoorthy! I found you through your portfolio website.",
      "",
      `*Name:* ${form.name}`,
    ];
    if (form.email)   lines.push(`*Email:* ${form.email}`);
    if (form.company) lines.push(`*Company:* ${form.company}`);
    if (form.service) lines.push(`*Service needed:* ${form.service}`);
    if (form.budget)  lines.push(`*Budget:* ${form.budget}`);
    if (form.message) {
      lines.push("", `*Project brief:*`, form.message);
    }
    lines.push("", "Looking forward to hearing from you!");

    const text = encodeURIComponent(lines.join("\n"));
    const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    // Open WhatsApp in a new tab, then show success state
    window.open(url, "_blank", "noopener,noreferrer");
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
              { Icon: Mail, title: "Email", value: "sathiyamurthyk@gmail.com", sub: "We reply within 24 hours" },
              { Icon: Phone, title: "Phone / WhatsApp", value: "+91 96001 63557", sub: "Mon–Sat, 9AM–7PM IST" },
              { Icon: MapPin, title: "Studio", value: "Chennai, India", sub: "Available globally" },
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.591477625141!2d80.19456629999999!3d13.061655499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266b6ca1151db%3A0xbf6a6fe88cb1c07f!2s160%2C%206th%20Main%20Rd%2C%20Chinmaya%20Nagar%2C%20Natesan%20Nagar%2C%20Sri%20Iyappa%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu%20600092!5e0!3m2!1sen!2sin!4v1778341878437!5m2!1sen!2sin"
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
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">WhatsApp Opened!</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                    Your message has been pre-filled in WhatsApp. Just hit send and we&apos;ll get back to you shortly.
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
                        {/* WhatsApp icon */}
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Send via WhatsApp
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 dark:text-slate-500">
                    Clicking send will open WhatsApp with your message pre-filled.
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
