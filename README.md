# Anand Mohod — Personal Developer Portfolio

> **Computer Engineering Student**  
> *“Passionate About Building, Learning & Solving with Technology.”*

[![Deploy Portfolio to GitHub Pages](https://github.com/ANANDMOHOD17/Anand-Mohod-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/ANANDMOHOD17/Anand-Mohod-portfolio/actions/workflows/deploy.yml)

A custom-crafted, production-ready personal developer portfolio engineered with a **Charcoal & Deep Indigo** aesthetic, **Liquid Glass UI**, interactive components, editorial typography, and high-performance micro-interactions.

---

## 💎 Features

- **Charcoal & Deep Indigo System**: Minimalist, high-end developer design language with calibrated backdrop blur, subtle borders (`#272733`), soft highlights, and dynamic cursor reflections.
- **Process Methodology**: Dedicated *"HOW I BUILD — FROM IDEA TO ITERATION"* interactive connected timeline.
- **Engineering Growth Architecture**: Asymmetric milestone roadmap representing progression and core competencies.
- **Truthful & Authentic Content**: Engineered specifically for an undergraduate Computer Engineering student—strictly zero fake percentages, zero fake metrics, and zero generic AI templates.
- **Strict Contact Integration**: Exactly 4 direct contact options:
  - 📞 **Phone** (`tel:` link)
  - ✉️ **Email** (`mailto:` link)
  - 💼 **LinkedIn**
  - 🐙 **GitHub**
- **Project Case Studies**: Dedicated routes (`/projects/[slug]`) featuring deep architectural breakdowns, problems, solutions, tech stacks, and engineering learnings.
- **Full-Screen Certificate Viewer**: Liquid Glass modal with credential IDs and external verification buttons (`/certificates`).
- **Curriculum Vitae & Resume**: Dedicated preview and direct PDF download hub (`/resume`).
- **Accessibility & Responsive**: Full keyboard navigation, ARIA semantics, `prefers-reduced-motion` detection, zero horizontal overflow, and mobile-to-ultrawide responsiveness.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glass & Indigo Tokens
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/) + [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Directory Structure

```
Anand-Mohod-portfolio/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata & custom cursor
│   ├── page.tsx                # Homepage with continuous narrative flow
│   ├── globals.css             # Liquid glass utilities & dark graphite styles
│   ├── not-found.tsx           # Custom 404 page
│   ├── robots.ts               # Robots.txt configuration
│   ├── sitemap.ts              # Automated sitemap generator
│   ├── projects/
│   │   ├── page.tsx            # Filterable projects gallery
│   │   └── [slug]/page.tsx     # Deep-dive case studies
│   ├── certificates/
│   │   └── page.tsx            # Full certificates archive
│   └── resume/
│       └── page.tsx            # Dedicated CV preview & download
├── components/
│   ├── navigation/             # Liquid Glass Navbar & Minimal Footer
│   ├── ui/                     # GlassCard, GlassButton, CustomCursor, SectionHeading, etc.
│   └── viewer/                 # Full-screen CertificateViewer modal
├── sections/                   # Modular portfolio sections (Hero, About, Skills, Process, Projects, etc.)
├── data/
│   ├── profile.ts              # Profile details & contact links
│   ├── skills.ts               # Categorized skills (no fake percentages)
│   ├── projects.ts             # Detailed project data & case studies
│   ├── certificates.ts         # Verified credentials
│   ├── achievements.ts         # Honors & hackathons
│   ├── journey.ts              # Engineering development timeline
│   └── education.ts            # Academic credentials
├── public/
│   ├── favicon.svg             # AM monogram favicon
│   ├── certificates/           # Verified certificate PDFs
│   ├── images/                 # Project screenshots & profile assets
│   └── resume/                 # Replaceable resume PDF files
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/ANANDMOHOD17/Anand-Mohod-portfolio.git
cd Anand-Mohod-portfolio

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```

---

## 🔐 Environment Variables

This static portfolio requires no runtime secret keys or database credentials.
If you integrate third-party services in the future, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

---

## 🌐 Deployment

### GitHub Pages (Automated via GitHub Actions)
A pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys static export artifacts to the `gh-pages` branch on push to `main`.

### Vercel
1. Import `https://github.com/ANANDMOHOD17/Anand-Mohod-portfolio` in [Vercel](https://vercel.com/new).
2. Framework preset will automatically detect **Next.js**.
3. Click **Deploy**.

---

## 📄 License
MIT License © Anand Mohod.
