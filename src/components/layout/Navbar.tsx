"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import { CATEGORIES } from "@/lib/categories";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobilePfOpen,  setMobilePfOpen]  = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setPortfolioOpen(false);
    setMobilePfOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPortfolioOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPortfolioActive = pathname.startsWith("/portfolio");

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark py-3 border-b border-black/5 dark:border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-400 rounded-lg rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-transparent rounded-lg flex items-center justify-center">
                <span className="font-display text-lg gradient-text font-bold">SK</span>
              </div>
            </div>
            <span className="font-display text-xl tracking-wider text-slate-900 dark:text-white">
              Sathiyamoorthy<span className="gradient-text"> K</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Portfolio Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="portfolio-nav-btn"
                onClick={() => setPortfolioOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setPortfolioOpen(false);
                }}
                aria-haspopup="true"
                aria-expanded={portfolioOpen}
                className={`nav-link flex items-center gap-1 ${isPortfolioActive ? "active" : ""}`}
              >
                Portfolio
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${portfolioOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {portfolioOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    role="menu"
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 rounded-2xl glass-dark border border-white/10 overflow-hidden shadow-2xl py-2"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/portfolio/${cat.slug}`}
                        role="menuitem"
                        className={`block px-5 py-2.5 text-sm font-medium transition-all duration-150 ${
                          pathname === `/portfolio/${cat.slug}`
                            ? "text-violet-400 bg-violet-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-6">
              <span>Start a Project</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg glass border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-0 z-40 pt-24 pb-8 px-6 glass-dark border-b border-black/5 dark:border-white/5 overflow-y-auto max-h-screen"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 px-4 rounded-lg text-base font-medium transition-all ${
                    pathname === link.href
                      ? "bg-violet-500/10 text-violet-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Portfolio with nested items */}
              <div>
                <button
                  onClick={() => setMobilePfOpen((v) => !v)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium transition-all ${
                    isPortfolioActive
                      ? "bg-violet-500/10 text-violet-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:text-white"
                  }`}
                >
                  Portfolio
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobilePfOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobilePfOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-1 pb-2 flex flex-col gap-1">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/portfolio/${cat.slug}`}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              pathname === `/portfolio/${cat.slug}`
                                ? "text-violet-400 bg-violet-500/10"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-white/5"
                            }`}
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/contact" className="btn-primary mt-4 justify-center">
                <span>Start a Project</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
