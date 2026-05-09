"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, FolderOpen, FileText, Settings, Search,
  Image, Globe, Code, LogOut, Bell, ChevronRight, TrendingUp,
  Users, Eye, Plus, Edit, Trash2, X, Check
} from "lucide-react";

interface PortfolioProject {
  id: number;
  title: string;
  cat: string;
  year: string;
  status: string;
  image: string;
  images?: string[];
  description?: string;
  website_url?: string;
  [key: string]: unknown;
}

const sidebarLinks = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "portfolio", icon: FolderOpen, label: "Portfolio" },
  { id: "blog", icon: FileText, label: "Blog Posts" },
  { id: "media", icon: Image, label: "Media Library" },
  { id: "seo", icon: Search, label: "SEO Manager" },
  { id: "sitemap", icon: Globe, label: "Sitemap & Robots" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Projects", value: "24", icon: FolderOpen, color: "from-violet-500 to-purple-600", change: "+3 this month" },
  { label: "Blog Posts", value: "18", icon: FileText, color: "from-cyan-500 to-blue-600", change: "+2 this month" },
  { label: "Page Views", value: "12.4K", icon: Eye, color: "from-emerald-500 to-teal-600", change: "+18% this month" },
  { label: "Inquiries", value: "47", icon: Users, color: "from-pink-500 to-rose-600", change: "+8 this week" },
];

const recentPosts = [
  { title: "10 UI/UX Design Trends 2024", status: "Published", date: "Apr 18" },
  { title: "Anatomy of Brand Identity", status: "Published", date: "Apr 10" },
  { title: "Packaging Design in E-commerce", status: "Draft", date: "Mar 28" },
];

const seoPages = [
  { page: "Home", title: "SATHIYAMOORTHY K — Creative Agency", score: 98 },
  { page: "About", title: "About Us | SATHIYAMOORTHY K", score: 95 },
  { page: "Services", title: "Services | SATHIYAMOORTHY K", score: 93 },
  { page: "Portfolio", title: "Portfolio | SATHIYAMOORTHY K", score: 97 },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [seoForm, setSeoForm] = useState({ page: "Home", title: "SATHIYAMOORTHY K — Creative Agency", description: "Premium creative design agency", keywords: "creative agency, UI UX design" });
  const [toast, setToast] = useState("");
  const [mediaItems, setMediaItems] = useState(
    [...Array(12)].map((_, i) => ({
      id: i,
      url: "",
      icon: ["🎨", "📐", "🖌️", "✨", "💎", "🎯"][i % 6],
      color: `hsl(${240 + i * 20}, 60%, 15%)`,
    }))
  );

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([
    { id: 1, title: "Luminary Brand Identity", cat: "Branding", year: "2024", status: "Live", image: "/images/portfolio_luminary.png" },
    { id: 2, title: "Nexus Finance App", cat: "UI/UX", year: "2024", status: "Live", image: "" },
    { id: 3, title: "Terra Packaging", cat: "Packaging", year: "2024", status: "Live", image: "" },
    { id: 4, title: "Phantom Website", cat: "Web Design", year: "2023", status: "Draft", image: "" },
  ]);

  const [editingProject, setEditingProject] = useState<any>(null);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  // Portfolio filter & selection state
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState("All");
  const [portfolioYearFilter, setPortfolioYearFilter] = useState("All");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Fetch projects from Supabase
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        // Map database fields to UI state (e.g., category -> cat)
        const mapped: PortfolioProject[] = data.map((p: Record<string, unknown>) => ({
          id: p.id as number,
          title: (p.title as string) || "",
          cat: (p.category as string) || "",
          year: (p.year as string) || "",
          status: (p.status as string) || "Draft",
          image: (p.image as string) || "",
          images: Array.isArray(p.images) ? (p.images as string[]) : undefined,
          description: (p.description as string) || undefined,
          website_url: (p.website_url as string) || undefined,
        }));
        setPortfolioProjects(mapped);
      }
    }
    fetchProjects();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      showToast(`Uploading: ${file.name}...`);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setMediaItems((prev) => [
            {
              id: Date.now(),
              url: event.target!.result as string,
              icon: "🖼️",
              color: "#1A3263",
            },
            ...prev,
          ]);
          showToast(`Uploaded successfully!`);
        }
      };
      reader.readAsDataURL(file);
      
      // Reset input value so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1A3263]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-black/5 dark:border-white/5 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="font-display text-sm text-slate-900 dark:text-white">PE</span>
            </div>
            <div>
              <div className="text-slate-900 dark:text-white font-bold text-sm">SATHIYAMOORTHY K</div>
              <div className="text-slate-500 dark:text-slate-500 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              id={`admin-nav-${id}`}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === id
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:bg-white/5 hover:text-slate-900 dark:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
              {activeSection === id && <ChevronRight size={12} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={16} />
            Logout
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-black/5 dark:border-white/5 bg-[#142856]">
          <div>
            <h1 className="text-slate-900 dark:text-white font-bold capitalize">{activeSection}</h1>
            <div className="text-xs text-slate-500 dark:text-slate-500">Welcome back, Admin</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 glass border border-black/5 dark:border-white/5 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white">
              <Bell size={15} />
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center text-slate-900 dark:text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">

          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="card-glass p-5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                        <Icon size={18} className="text-slate-900 dark:text-white" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                      <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp size={10} /> {stat.change}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Recent Blog Posts</h3>
                    <button onClick={() => setActiveSection("blog")} className="text-xs text-violet-400 hover:text-violet-300">View all</button>
                  </div>
                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <div key={post.title} className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5">
                        <div>
                          <div className="text-sm text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{post.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-500">{post.date}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${post.status === "Published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                          {post.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">SEO Overview</h3>
                    <button onClick={() => setActiveSection("seo")} className="text-xs text-violet-400 hover:text-violet-300">Manage</button>
                  </div>
                  <div className="space-y-3">
                    {seoPages.map((p) => (
                      <div key={p.page} className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5">
                        <div>
                          <div className="text-sm text-slate-900 dark:text-white font-medium">{p.page}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-500 truncate max-w-[180px]">{p.title}</div>
                        </div>
                        <div className={`text-sm font-bold ${p.score >= 95 ? "text-emerald-400" : "text-amber-400"}`}>
                          {p.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Portfolio Manager */}
          {activeSection === "portfolio" && (() => {
            // Derived filter values
            const allCategories = ["All", ...Array.from(new Set(portfolioProjects.map(p => p.cat).filter(Boolean)))];
            const allYears = ["All", ...Array.from(new Set(portfolioProjects.map(p => p.year).filter(Boolean))).sort((a,b) => Number(b)-Number(a))];

            const filtered = portfolioProjects.filter(p => {
              const matchSearch = portfolioSearch === "" || p.title?.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.cat?.toLowerCase().includes(portfolioSearch.toLowerCase());
              const matchCat = portfolioCategoryFilter === "All" || p.cat === portfolioCategoryFilter;
              const matchYear = portfolioYearFilter === "All" || p.year === portfolioYearFilter;
              return matchSearch && matchCat && matchYear;
            });

            const allFilteredIds = filtered.map(p => p.id);
            const allSelected = allFilteredIds.length > 0 && allFilteredIds.every(id => selectedRows.has(id));

            const toggleRow = (id: number) => {
              setSelectedRows(prev => {
                const next = new Set(prev);
                next.has(id) ? next.delete(id) : next.add(id);
                return next;
              });
            };

            const toggleAll = () => {
              if (allSelected) {
                setSelectedRows(prev => { const n = new Set(prev); allFilteredIds.forEach(id => n.delete(id)); return n; });
              } else {
                setSelectedRows(prev => { const n = new Set(prev); allFilteredIds.forEach(id => n.add(id)); return n; });
              }
            };

            const bulkDelete = async () => {
              const ids = Array.from(selectedRows);
              const { error } = await supabase.from('portfolio_projects').delete().in('id', ids);
              if (!error) {
                setPortfolioProjects(prev => prev.filter(p => !selectedRows.has(p.id)));
                setSelectedRows(new Set());
                showToast(`${ids.length} project(s) deleted`);
              } else {
                showToast("Bulk delete failed");
              }
            };

            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                {/* Header row */}
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white shrink-0">Portfolio Projects</h2>
                  <button
                    id="add-project-btn"
                    className="btn-primary text-sm py-2 px-5 shrink-0"
                    onClick={() => setEditingProject({ title: "", cat: "", year: new Date().getFullYear().toString(), status: "Draft", image: "", images: [], description: "", website_url: "", isNew: true })}
                  >
                    <span className="flex items-center gap-2"><Plus size={14} /> Add Project</span>
                  </button>
                </div>

                {/* Filters bar */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[180px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      id="portfolio-search"
                      type="text"
                      placeholder="Search projects…"
                      value={portfolioSearch}
                      onChange={e => setPortfolioSearch(e.target.value)}
                      className="form-input text-sm pl-8 py-2"
                    />
                  </div>

                  {/* Category filter */}
                  <select
                    id="portfolio-category-filter"
                    value={portfolioCategoryFilter}
                    onChange={e => setPortfolioCategoryFilter(e.target.value)}
                    className="form-input text-sm py-2 w-auto min-w-[140px]"
                  >
                    {allCategories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
                  </select>

                  {/* Year filter */}
                  <select
                    id="portfolio-year-filter"
                    value={portfolioYearFilter}
                    onChange={e => setPortfolioYearFilter(e.target.value)}
                    className="form-input text-sm py-2 w-auto min-w-[110px]"
                  >
                    {allYears.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
                  </select>

                  {/* Result count */}
                  <span className="text-xs text-slate-400 shrink-0">
                    {filtered.length} / {portfolioProjects.length} projects
                  </span>
                </div>

                {/* Bulk-delete toolbar */}
                {selectedRows.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30"
                  >
                    <span className="text-sm text-red-300 font-medium flex-1">
                      {selectedRows.size} row{selectedRows.size > 1 ? "s" : ""} selected
                    </span>
                    <button
                      onClick={() => setSelectedRows(new Set())}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >Clear</button>
                    <button
                      onClick={bulkDelete}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-colors font-semibold"
                    >
                      <Trash2 size={12} /> Delete Selected
                    </button>
                  </motion.div>
                )}

                {/* Table */}
                <div className="card-glass rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/5 dark:border-white/5">
                        {/* Checkbox: select all */}
                        <th className="py-4 pl-5 pr-2 w-8">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleAll}
                            className="w-4 h-4 accent-[var(--accent-neon)] cursor-pointer rounded"
                          />
                        </th>
                        {["Thumb", "Title", "Category", "Year", "Status", "Actions"].map(h => (
                          <th key={h} className="text-left py-4 px-3 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                            No projects match your filters.
                          </td>
                        </tr>
                      ) : filtered.map((row) => (
                        <tr
                          key={row.id}
                          className={`border-b border-black/5 dark:border-white/5 transition-colors ${
                            selectedRows.has(row.id)
                              ? "bg-[var(--accent-neon)]/5 dark:bg-[var(--accent-neon)]/5"
                              : "hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="py-3 pl-5 pr-2">
                            <input
                              type="checkbox"
                              checked={selectedRows.has(row.id)}
                              onChange={() => toggleRow(row.id)}
                              className="w-4 h-4 accent-[var(--accent-neon)] cursor-pointer rounded"
                            />
                          </td>

                          {/* Thumbnail */}
                          <td className="py-3 px-3">
                            <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                              {row.image ? (
                                <img src={row.image} alt={row.title} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[10px] text-slate-500">No img</span>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-3 text-slate-900 dark:text-white font-medium max-w-[200px] truncate">{row.title}</td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{row.cat}</td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{row.year}</td>
                          <td className="py-3 px-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              row.status === "Live" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <button
                                className="w-7 h-7 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                                title="Edit"
                                onClick={() => setEditingProject({ ...row, images: row.images ?? (row.image ? [row.image] : []), description: row.description ?? "", website_url: row.website_url ?? "" })}
                              >
                                <Edit size={12} />
                              </button>
                              <button
                                className="w-7 h-7 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                title="Delete"
                                onClick={async () => {
                                  const { error } = await supabase.from('portfolio_projects').delete().eq('id', row.id);
                                  if (!error) {
                                    setPortfolioProjects(prev => prev.filter(p => p.id !== row.id));
                                    setSelectedRows(prev => { const n = new Set(prev); n.delete(row.id); return n; });
                                    showToast("Project deleted");
                                  } else {
                                    showToast("Failed to delete project");
                                  }
                                }}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            );
          })()}

          {/* Blog Manager */}
          {activeSection === "blog" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Blog Posts</h2>
                <button id="add-post-btn" className="btn-primary text-sm py-2 px-5">
                  <span className="flex items-center gap-2"><Plus size={14} /> New Post</span>
                </button>
              </div>
              <div className="card-glass rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/5 dark:border-white/5">
                      {["Title", "Category", "Date", "Status", "Actions"].map(h => (
                        <th key={h} className="text-left py-4 px-5 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map((post) => (
                      <tr key={post.title} className="border-b border-black/5 dark:border-white/5 hover:bg-white/2 transition-colors">
                        <td className="py-4 px-5 text-slate-900 dark:text-white font-medium">{post.title}</td>
                        <td className="py-4 px-5 text-slate-600 dark:text-slate-400">Design</td>
                        <td className="py-4 px-5 text-slate-600 dark:text-slate-400">{post.date}</td>
                        <td className="py-4 px-5">
                          <span className={`text-xs px-2 py-1 rounded-full ${post.status === "Published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <button className="w-7 h-7 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-violet-400 transition-colors">
                              <Edit size={12} />
                            </button>
                            <button className="w-7 h-7 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-red-400 transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* SEO Manager */}
          {activeSection === "seo" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">SEO Manager</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-glass p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-5">Edit Page SEO</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Page</label>
                      <select className="form-input text-sm" value={seoForm.page} onChange={e => setSeoForm({...seoForm, page: e.target.value})}>
                        {seoPages.map(p => <option key={p.page}>{p.page}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Meta Title</label>
                      <input type="text" className="form-input text-sm" value={seoForm.title} onChange={e => setSeoForm({...seoForm, title: e.target.value})} />
                      <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{seoForm.title.length}/60 characters</div>
                    </div>
                    <div>
                      <label className="form-label">Meta Description</label>
                      <textarea rows={3} className="form-input text-sm resize-none" value={seoForm.description} onChange={e => setSeoForm({...seoForm, description: e.target.value})} />
                      <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{seoForm.description.length}/160 characters</div>
                    </div>
                    <div>
                      <label className="form-label">Keywords</label>
                      <input type="text" className="form-input text-sm" value={seoForm.keywords} onChange={e => setSeoForm({...seoForm, keywords: e.target.value})} />
                    </div>
                    <button onClick={() => showToast("SEO settings saved!")} id="save-seo-btn" className="btn-primary text-sm py-2.5 px-6">
                      <span>Save SEO Settings</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="card-glass p-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Search Preview</h3>
                    <div className="p-4 rounded-xl bg-white/3 border border-black/5 dark:border-white/5">
                      <div className="text-blue-400 text-sm">sathiyamoorthyk.com/{seoForm.page.toLowerCase()}</div>
                      <div className="text-lg font-medium text-blue-300 mt-1">{seoForm.title}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{seoForm.description}</div>
                    </div>
                  </div>
                  <div className="card-glass p-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Page SEO Scores</h3>
                    {seoPages.map(p => (
                      <div key={p.page} className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5">
                        <span className="text-sm text-slate-700 dark:text-slate-300">{p.page}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${p.score}%` }} />
                          </div>
                          <span className={`text-sm font-bold ${p.score >= 95 ? "text-emerald-400" : "text-amber-400"}`}>{p.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sitemap & Robots */}
          {activeSection === "sitemap" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sitemap & Robots</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white">sitemap.xml</h3>
                    <button onClick={() => showToast("Sitemap regenerated!")} id="regen-sitemap-btn" className="text-xs text-violet-400 border border-violet-500/20 px-3 py-1.5 rounded-lg hover:bg-violet-500/10 transition-colors">
                      Regenerate
                    </button>
                  </div>
                  <pre className="text-xs text-slate-600 dark:text-slate-400 bg-black/20 rounded-xl p-4 overflow-auto max-h-64 border border-black/5 dark:border-white/5">{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sathiyamoorthyk.com/</loc>
    <lastmod>2024-04-25</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sathiyamoorthyk.com/about</loc>
    <lastmod>2024-04-25</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sathiyamoorthyk.com/services</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sathiyamoorthyk.com/portfolio</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sathiyamoorthyk.com/blog</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sathiyamoorthyk.com/contact</loc>
    <priority>0.7</priority>
  </url>
</urlset>`}</pre>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><Code size={16} /> robots.txt</h3>
                    <button onClick={() => showToast("robots.txt saved!")} id="save-robots-btn" className="text-xs text-violet-400 border border-violet-500/20 px-3 py-1.5 rounded-lg hover:bg-violet-500/10 transition-colors">
                      Save
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    className="form-input font-mono text-xs resize-none"
                    defaultValue={`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://sathiyamoorthyk.com/sitemap.xml`}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Media Library */}
          {activeSection === "media" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Media Library</h2>
                <div className="relative">
                  <input
                    type="file"
                    id="media-upload-input"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,video/*"
                  />
                  <button 
                    id="upload-media-btn" 
                    className="btn-primary text-sm py-2 px-5"
                    onClick={() => document.getElementById('media-upload-input')?.click()}
                  >
                    <span className="flex items-center gap-2"><Plus size={14} /> Upload Media</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square rounded-xl border border-black/5 dark:border-white/5 overflow-hidden relative group cursor-pointer"
                    style={{ background: item.color }}
                  >
                    {item.url ? (
                      <img src={item.url} alt="Uploaded Media" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-30">
                        {item.icon}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="w-7 h-7 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center text-white hover:bg-violet-500/50 transition-colors">
                        <Eye size={12} />
                      </button>
                      <button 
                        className="w-7 h-7 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center text-white hover:bg-red-500/50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMediaItems(prev => prev.filter(m => m.id !== item.id));
                          showToast("Media deleted");
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-glass p-6 space-y-5">
                  <h3 className="font-semibold text-slate-900 dark:text-white">General Settings</h3>
                  {[
                    { label: "Site Name", value: "SATHIYAMOORTHY K" },
                    { label: "Site URL", value: "https://sathiyamoorthyk.vercel.app" },
                    { label: "Contact Email", value: "sathiyamurthyk@gmail.com" },
                    { label: "Phone / WhatsApp", value: "+91 96001 63557" },
                    { label: "Google Analytics ID", value: "G-XXXXXXXXXX" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="form-label">{label}</label>
                      <input type="text" className="form-input text-sm" defaultValue={value} />
                    </div>
                  ))}
                  <button onClick={() => showToast("Settings saved!")} id="save-settings-btn" className="btn-primary text-sm py-2.5 px-6">
                    <span>Save Settings</span>
                  </button>
                </div>

                <div className="card-glass p-6 space-y-5">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Security</h3>
                  {[
                    { label: "Current Password", placeholder: "••••••••" },
                    { label: "New Password", placeholder: "••••••••" },
                    { label: "Confirm Password", placeholder: "••••••••" },
                  ].map(({ label, placeholder }) => (
                    <div key={label}>
                      <label className="form-label">{label}</label>
                      <input type="password" className="form-input text-sm" placeholder={placeholder} />
                    </div>
                  ))}
                  <button onClick={() => showToast("Password updated!")} id="change-password-btn" className="btn-outline text-sm py-2.5 px-6">
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </main>
      </div>

      {/* Project Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl card-glass bg-[#142856] p-6 rounded-2xl border border-black/10 dark:border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProject.isNew ? "Add New Project" : "Edit Project"}
              </h3>
              <button 
                onClick={() => setEditingProject(null)}
                className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-2">
                  <label className="form-label">Project Title</label>
                  <input 
                    type="text" 
                    className="form-input text-sm" 
                    value={editingProject.title} 
                    onChange={e => setEditingProject({...editingProject, title: e.target.value})} 
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    className="form-input text-sm resize-none"
                    placeholder="Describe the project, goals, and outcomes…"
                    value={editingProject.description ?? ""}
                    onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                  />
                </div>

                {/* Website URL */}
                <div className="col-span-2">
                  <label className="form-label">Website / Live URL</label>
                  <input 
                    type="url" 
                    className="form-input text-sm" 
                    placeholder="https://example.com"
                    value={editingProject.website_url ?? ""}
                    onChange={e => setEditingProject({...editingProject, website_url: e.target.value})} 
                  />
                </div>

                {/* Category + Year */}
                <div>
                  <label className="form-label">Category</label>
                  <input 
                    type="text" 
                    className="form-input text-sm" 
                    value={editingProject.cat} 
                    onChange={e => setEditingProject({...editingProject, cat: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="form-label">Year</label>
                  <input 
                    type="text" 
                    className="form-input text-sm" 
                    value={editingProject.year} 
                    onChange={e => setEditingProject({...editingProject, year: e.target.value})} 
                  />
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-input text-sm"
                    value={editingProject.status} 
                    onChange={e => setEditingProject({...editingProject, status: e.target.value})} 
                  >
                    <option value="Draft">Draft</option>
                    <option value="Live">Live</option>
                  </select>
                </div>

                {/* Multiple Images Upload */}
                <div className="col-span-2">
                  <label className="form-label">Project Images <span className="text-slate-500 normal-case font-normal">(multiple allowed)</span></label>

                  {/* Thumbnails */}
                  {(editingProject.images ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(editingProject.images as string[]).map((url: string, idx: number) => (
                        <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const imgs = [...(editingProject.images as string[])];
                              imgs.splice(idx, 1);
                              setEditingProject({...editingProject, images: imgs, image: imgs[0] ?? ""});
                            }}
                            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={10} />
                          </button>
                          {idx === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-violet-600/80 text-white text-[9px] text-center py-0.5">Cover</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Drop zone */}
                  <div className="relative border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl p-4 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        if (!e.target.files || e.target.files.length === 0) return;
                        const files = Array.from(e.target.files);
                        showToast(`Uploading ${files.length} image(s)…`);
                        const uploaded: string[] = [];
                        for (const file of files) {
                          const fileExt = file.name.split('.').pop();
                          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                          const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
                          if (!error) {
                            const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
                            uploaded.push(publicUrl);
                          }
                        }
                        const merged = [...(editingProject.images ?? []), ...uploaded];
                        setEditingProject({...editingProject, images: merged, image: merged[0] ?? editingProject.image});
                        showToast(`${uploaded.length} image(s) uploaded!`);
                        e.target.value = '';
                      }}
                    />
                    <div className="py-6 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 pointer-events-none">
                      <Image size={24} className="mb-2 opacity-50" />
                      <span className="text-sm font-medium">Click or drag images to upload</span>
                      <span className="text-xs mt-1 opacity-60">PNG, JPG, WebP — multiple files OK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-black/10 dark:border-white/10 mt-4">
                <button 
                  className="btn-outline text-sm py-2 px-5"
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary text-sm py-2 px-5"
                  onClick={async () => {
                    if (!editingProject.title) return showToast("Title is required");

                    showToast("Saving project...");

                    // Full payload — works after DB migration
                    const fullPayload: Record<string, any> = {
                      title: editingProject.title,
                      category: editingProject.cat,
                      year: editingProject.year,
                      status: editingProject.status,
                      image: (editingProject.images ?? [])[0] ?? editingProject.image ?? "",
                      images: editingProject.images ?? [],
                      description: editingProject.description ?? "",
                      website_url: editingProject.website_url ?? "",
                    };

                    // Safe payload — only legacy columns, used as fallback
                    const safePayload: Record<string, any> = {
                      title: editingProject.title,
                      category: editingProject.cat,
                      year: editingProject.year,
                      status: editingProject.status,
                      image: (editingProject.images ?? [])[0] ?? editingProject.image ?? "",
                    };

                    const tryUpsert = async (payload: Record<string, any>) => {
                      if (editingProject.isNew) {
                        return supabase.from('portfolio_projects').insert([payload]).select().single();
                      } else {
                        return supabase.from('portfolio_projects').update(payload).eq('id', editingProject.id).select().single();
                      }
                    };

                    let { data, error } = await tryUpsert(fullPayload);

                    // If new columns don't exist yet in DB, retry with safe (legacy) payload
                    const isColumnError = error && (
                      (error as any).code === "42703" ||
                      (error as any).code === "PGRST204" ||
                      (error?.message ?? "").toLowerCase().includes("column") ||
                      (error?.message ?? "").toLowerCase().includes("does not exist")
                    );
                    if (isColumnError) {
                      console.warn("New columns missing in DB — falling back to safe payload:", error?.message);
                      const res = await tryUpsert(safePayload);
                      data = res.data; error = res.error;
                    }

                    if (data && !error) {
                      const savedRow: PortfolioProject = {
                        id: (data as Record<string, unknown>).id as number,
                        title: ((data as Record<string, unknown>).title as string) || "",
                        cat: ((data as Record<string, unknown>).category as string) || "",
                        year: ((data as Record<string, unknown>).year as string) || "",
                        status: ((data as Record<string, unknown>).status as string) || "Draft",
                        image: ((data as Record<string, unknown>).image as string) || "",
                        images: Array.isArray((data as Record<string, unknown>).images)
                          ? ((data as Record<string, unknown>).images as string[])
                          : undefined,
                        description: ((data as Record<string, unknown>).description as string) || undefined,
                        website_url: ((data as Record<string, unknown>).website_url as string) || undefined,
                      };
                      if (editingProject.isNew) {
                        setPortfolioProjects([savedRow, ...portfolioProjects]);
                        showToast("Project created successfully ✓");
                      } else {
                        setPortfolioProjects(portfolioProjects.map(p =>
                          p.id === editingProject.id ? savedRow : p
                        ));
                        showToast("Project updated successfully ✓");
                      }
                      setEditingProject(null);
                    } else {
                      const msg = error?.message ?? "Unknown error";
                      console.error("Save error:", error);
                      showToast(`Save failed: ${msg}`);
                    }
                  }}
                >
                  Save Project
                </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium z-50"
        >
          <Check size={16} />
          {toast}
          <button onClick={() => setToast("")} className="ml-2 text-emerald-300 hover:text-slate-900 dark:text-white">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
