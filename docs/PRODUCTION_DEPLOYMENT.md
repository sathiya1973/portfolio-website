# Production Deployment Documentation

> **SATHIYAMOORTHY K — Portfolio Website**
> Framework: Next.js 16.2.4 (App Router, Turbopack)
> Deployment Target: Vercel

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Tech Stack](#2-tech-stack)
3. [Pre-Deployment Checklist](#3-pre-deployment-checklist)
4. [Environment Variables](#4-environment-variables)
5. [Build & Verification](#5-build--verification)
6. [Vercel Deployment](#6-vercel-deployment)
7. [Supabase Configuration](#7-supabase-configuration)
8. [TypeScript Fixes Applied](#8-typescript-fixes-applied)
9. [Known Limitations & Future Work](#9-known-limitations--future-work)
10. [Route Map](#10-route-map)

---

## 1. Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── (site)/                 # Public-facing pages (Navbar + Footer layout)
│   │   │   ├── page.tsx            # Home (/)
│   │   │   ├── about/              # /about
│   │   │   ├── blog/               # /blog & /blog/[slug]
│   │   │   ├── contact/            # /contact
│   │   │   ├── portfolio/          # /portfolio (index) & /portfolio/[slug] (category/detail)
│   │   │   └── services/           # /services
│   │   ├── admin/                  # Admin panel (/admin login + /admin/dashboard)
│   │   ├── globals.css             # Global CSS (design tokens, Tailwind utilities)
│   │   ├── layout.tsx              # Root layout (metadata, ThemeProvider, schema.org)
│   │   ├── robots.ts               # /robots.txt generation
│   │   └── sitemap.ts             # /sitemap.xml generation
│   ├── components/
│   │   ├── home/                   # Homepage section components
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── ui/                     # WhatsAppFAB
│   │   ├── theme-provider.tsx      # next-themes wrapper
│   │   └── theme-toggle.tsx        # Dark/light toggle (currently unused in nav)
│   └── lib/
│       ├── categories.ts           # Portfolio category definitions (slug, label, dbValue)
│       └── supabase.ts             # Supabase client initialisation
├── public/                         # Static assets
├── next.config.ts                  # Next.js config (image domains, security headers)
├── tsconfig.json                   # TypeScript (strict mode)
├── eslint.config.mjs               # ESLint (next/core-web-vitals + next/typescript)
└── package.json
```

---

## 2. Tech Stack

| Layer | Package | Version |
|---|---|---|
| Framework | Next.js | 16.2.4 |
| React | react / react-dom | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Animations | Framer Motion | ^12 |
| Icons | Lucide React | ^1.11 |
| Database | Supabase JS | ^2 |
| Forms | React Hook Form + Zod | ^7 / ^4 |
| Theme | next-themes | ^0.4 |
| SEO | next-seo | ^7 |

---

## 3. Pre-Deployment Checklist

### ✅ TypeScript
- [x] Build passes with `strict: true` — **zero TypeScript errors**
- [x] All Supabase response objects explicitly cast to typed interfaces
- [x] `PortfolioProject` interface added to admin dashboard

### ✅ Next.js Config
- [x] `domains` replaced with `remotePatterns` (deprecated API removed)
- [x] Supabase storage hostname added to `remotePatterns`
- [x] Security headers configured (CSP, X-Frame-Options, etc.)
- [x] `poweredByHeader: false` — server identity hidden
- [x] `compress: true` — Brotli/gzip enabled

### ✅ SEO
- [x] `metadataBase` configured for all pages
- [x] `title` template set (`%s | SATHIYAMOORTHY K`)
- [x] `openGraph` and `twitter` metadata on root layout
- [x] Schema.org JSON-LD (Organization) in root layout
- [x] `/robots.txt` generated via `robots.ts` — admin routes disallowed
- [x] `/sitemap.xml` generated via `sitemap.ts`
- [x] `robots: { index: false }` on admin pages

### ✅ Performance
- [x] Static generation for all known routes (`generateStaticParams`)
- [x] Images: AVIF + WebP formats enabled
- [x] Turbopack used for compilation
- [x] `framer-motion` animations are client-side only

### ✅ Admin Security
- [x] Admin pages have `robots: { index: false, follow: false }`
- [x] Admin routes disallowed in `robots.txt`
- [x] Admin layout isolated — no public Navbar/Footer rendered

---

## 4. Environment Variables

Create a `.env.local` file (never commit this) with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
# OR
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Vercel Setup**: Add these under **Project → Settings → Environment Variables**.
> Both `Production` and `Preview` environments should have the same keys.

The Supabase client (`src/lib/supabase.ts`) checks `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` first, then falls back to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 5. Build & Verification

### Local Build
```bash
npm run build
npm run start   # Test the production bundle locally
```

### Expected Output
```
Route (app)
├ ○ /                        (Static)
├ ○ /about                   (Static)
├ ○ /admin                   (Static)
├ ○ /admin/dashboard         (Static)
├ ○ /blog                    (Static)
├ ƒ /blog/[slug]             (Dynamic)
├ ○ /contact                 (Static)
├ ○ /portfolio               (Static)
├ ● /portfolio/[slug]        (SSG — 7 category pages prerendered)
├ ○ /robots.txt              (Static)
├ ○ /services                (Static)
└ ○ /sitemap.xml             (Static)
```

**Total pages: 20** (including 7 portfolio category static pages).

---

## 6. Vercel Deployment

### First Deployment
1. Push code to GitHub / GitLab / Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Framework detected automatically as **Next.js**
4. Add all environment variables (see §4)
5. Click **Deploy**

### Subsequent Deployments
```bash
git push origin main  # Vercel auto-deploys on push to main
```

### Build Command (Vercel auto-detects)
```
npm run build
```

### Output Directory
`.next` — Vercel handles this automatically.

---

## 7. Supabase Configuration

### Required Table: `portfolio_projects`

| Column | Type | Notes |
|---|---|---|
| `id` | `int8` (PK, auto-increment) | |
| `created_at` | `timestamptz` | default `now()` |
| `title` | `text` | |
| `category` | `text` | Must match `dbValue` in `categories.ts` |
| `year` | `text` | e.g., "2024" |
| `status` | `text` | `"Live"` or `"Draft"` |
| `image` | `text` | URL of the primary/cover image |
| `images` | `text[]` | Array of image URLs (multi-image support) |
| `description` | `text` | Project description |
| `website_url` | `text` | Live URL link |
| `tags` | `text[]` | Tag array (optional) |

### Storage Bucket
Create a bucket named `portfolio-images` with **public access** enabled.

### Row Level Security (RLS)
- **Public (read):** Allow `SELECT` on `status = 'Live'` rows
- **Admin (write):** Allow all operations using your service role key or a custom policy

---

## 8. TypeScript Fixes Applied

### Fix 1 — `PortfolioProject` Interface (admin/dashboard/page.tsx)

**Problem:** The `portfolioProjects` state was inferred from the initial array literal which only had `{ id, title, cat, year, status, image }`. TypeScript strict mode then flagged `row.images` on the edit button click handler (line 452) as non-existent.

**Fix Applied:**
```typescript
// NEW: Explicit interface added at top of file
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

// State now explicitly typed
const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([...]);
```

### Fix 2 — Supabase Data Mapping (admin/dashboard/page.tsx)

**Problem:** `data.map(p => ({ ...p, cat: p.category }))` spread `any` from Supabase, creating an implicit `any[]` that doesn't satisfy `PortfolioProject[]`.

**Fix Applied:** Explicit field mapping with type assertions for each field.

### Fix 3 — Save Handler Casting (admin/dashboard/page.tsx)

**Problem:** The save button's `setPortfolioProjects` call spread raw Supabase `data` which is typed as `any`, conflicting with the now-strict `PortfolioProject[]` state.

**Fix Applied:** Construct a `savedRow: PortfolioProject` object with explicit casts before updating state.

### Fix 4 — next.config.ts: `remotePatterns` Migration

**Problem:** `images.domains` is deprecated in Next.js 14+ and raises warnings.

**Fix Applied:**
```typescript
// Before (deprecated)
images: { domains: ["patternedge.com"] }

// After (current API)
images: {
  remotePatterns: [
    { protocol: "https", hostname: "patternedge.com" },
    { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
  ]
}
```

---

## 9. Known Limitations & Future Work

| Item | Status | Notes |
|---|---|---|
| Blog `[slug]` page | Dynamic (SSR) | No blog posts in DB yet; page renders empty gracefully |
| Admin authentication | Client-side only | Uses `.env` password check in `AdminLoginClient.tsx`; consider adding Supabase Auth for production hardening |
| `<img>` vs `<Image>` | Uses `<img>` in many places | Functional, but migrating to Next.js `<Image>` would improve LCP/CLS scores |
| OG image (`/og-image.jpg`) | Referenced in metadata | Ensure this file exists in `public/` before deploying |
| `tags` field | Optional in DB | Frontend handles empty tags gracefully with fallback |
| Admin password | Hardcoded comparison | Move to environment variable or Supabase Auth before going live |

---

## 10. Route Map

| Route | Type | Component |
|---|---|---|
| `/` | Static | `src/app/(site)/page.tsx` |
| `/about` | Static | `src/app/(site)/about/page.tsx` |
| `/services` | Static | `src/app/(site)/services/page.tsx` |
| `/portfolio` | Static | `src/app/(site)/portfolio/page.tsx` |
| `/portfolio/[slug]` | SSG (7 paths) | `CategoryPageClient.tsx` / `ProjectDetailFallback.tsx` |
| `/blog` | Static | `src/app/(site)/blog/page.tsx` |
| `/blog/[slug]` | Dynamic | `src/app/(site)/blog/[slug]/page.tsx` |
| `/contact` | Static | `src/app/(site)/contact/page.tsx` |
| `/admin` | Static | `AdminLoginClient.tsx` |
| `/admin/dashboard` | Static (client) | `src/app/admin/dashboard/page.tsx` |
| `/sitemap.xml` | Static | `src/app/sitemap.ts` |
| `/robots.txt` | Static | `src/app/robots.ts` |

---

*Last updated: 2026-05-09 — Build verified clean (Exit code 0, 20 pages, 0 TypeScript errors)*
