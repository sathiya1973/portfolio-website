"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    // Demo credentials
    if (email === "admin@sathiyamoorthyk.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Use admin@sathiyamoorthyk.com / admin123");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* BG */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="orb orb-purple w-96 h-96 top-0 left-0 absolute animate-pulse-glow" />
      <div className="orb orb-cyan w-80 h-80 bottom-0 right-0 absolute animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mx-auto px-6"
      >
        <div className="glass rounded-3xl border border-white/8 p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
              <Shield size={26} className="text-slate-900 dark:text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">SATHIYAMOORTHY K CMS</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} id="admin-login-form" className="space-y-5">
            <div>
              <label className="form-label" htmlFor="admin-email">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500" />
                <input
                  id="admin-email"
                  type="email"
                  className="form-input pl-10"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="admin-password">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input pl-10 pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-login-submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Signing in...
                </span>
              ) : (
                <span>Sign In to Admin</span>
              )}
            </button>
          </form>

          {/* <div className="mt-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Demo: <span className="text-violet-400">admin@sathiyamoorthyk.com</span> /{" "}
              <span className="text-violet-400">admin123</span>
            </p>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}
