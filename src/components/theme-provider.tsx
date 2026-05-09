"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Render NextThemesProvider directly.
  // suppressHydrationWarning on <html> (in layout.tsx) handles
  // the theme-class mismatch between server and client.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
