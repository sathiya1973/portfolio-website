import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import WhatsAppFAB from "@/components/ui/WhatsAppFAB";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sathiyamoorthyk.com"),
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
  authors: [{ name: "SATHIYAMOORTHY K", url: "https://sathiyamoorthyk.com" }],
  creator: "SATHIYAMOORTHY K",
  publisher: "SATHIYAMOORTHY K",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sathiyamoorthyk.com",
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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="canonical" href="https://sathiyamoorthyk.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SATHIYAMOORTHY K",
              url: "https://sathiyamoorthyk.com",
              logo: "https://sathiyamoorthyk.com/logo.png",
              description: "Premium creative design agency specializing in UI/UX, branding, web design and digital marketing.",
              address: { "@type": "PostalAddress", addressCountry: "IN" },
              sameAs: [
                "https://twitter.com/sathiyamoorthyk",
                "https://instagram.com/sathiyamoorthyk",
                "https://linkedin.com/company/sathiyamoorthyk",
              ],
              contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "hello@sathiyamoorthyk.com" },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-slate-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
