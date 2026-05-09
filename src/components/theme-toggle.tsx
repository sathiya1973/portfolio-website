"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-full flex items-center justify-center glass hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-slate-900 dark:text-white" />
      ) : (
        <Moon size={16} className="text-slate-900 dark:text-white" />
      )}
    </button>
  );
}
