import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import WhatsAppFAB from "@/components/ui/WhatsAppFAB";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sathiyamoorthyk.vercel.app"),
  title: {
    default: "SATHIYAMOORTHY K — Creative Design Agency | UI/UX, Branding & Web Design",
    template: "%s | SATHIYAMOORTHY K",
  },
  description:
    "SATHIYAMOORTHY K is a premium creative agency specializing in UI/UX design, brand identity, web design & development, packaging, and digital marketing. We craft experiences that define brands.",
  keywords: [
    "creative agency", "UI UX design", "branding agency", "logo design",
    "web design", "graphic design", "packaging design", "digital marketing", "SATHIYAMOORTHY K",
  ],
  authors: [{ name: "SATHIYAMOORTHY K", url: "https://sathiyamoorthyk.vercel.app" }],
  creator: "SATHIYAMOORTHY K",
  publisher: "SATHIYAMOORTHY K",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sathiyamoorthyk.vercel.app",
    siteName: "SATHIYAMOORTHY K",
    title: "SATHIYAMOORTHY K — Creative Design Agency",
    description: "Premium creative agency specializing in UI/UX, branding, and digital experiences.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SATHIYAMOORTHY K Creative Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SATHIYAMOORTHY K — Creative Design Agency",
    description: "Premium creative agency. UI/UX, Branding, Web Design & more.",
    images: ["/og-image.jpg"],
    creator: "@sathiyamoorthyk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sathiyamoorthyk.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SATHIYAMOORTHY K",
              url: "https://sathiyamoorthyk.vercel.app",
              logo: "https://sathiyamoorthyk.vercel.app/logo.png",
              description: "Premium creative design agency specializing in UI/UX, branding, web design and digital marketing.",
              address: { "@type": "PostalAddress", addressCountry: "IN" },
              sameAs: [
                "https://twitter.com/sathiyamoorthyk",
                "https://www.instagram.com/patterenedge/?hl=en",
                "https://www.linkedin.com/in/sathiyamurthyk/",
              ],
              contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "hello@sathiyamoorthyk.com" },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-slate-900 dark:text-white transition-colors duration-300">
        {/* Skip-to-content link — WCAG 2.4.1: Bypass Blocks */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
