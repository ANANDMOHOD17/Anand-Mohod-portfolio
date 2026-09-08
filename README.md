# Anand Mohod — Personal Developer Portfolio

> **Computer Engineering Student**  
> *“Passionate About Building, Learning & Solving with Technology.”*

A custom-crafted, production-ready personal developer portfolio engineered with a **Dark Graphite** aesthetic, **Liquid Glass UI**, interactive **Three.js / React Three Fiber** 3D environment, editorial typography, and high-performance micro-interactions.

---

## 💎 Features

- **Dark Graphite & Liquid Glass System**: Bespoke design language with calibrated backdrop blur, subtle borders (`rgba(255, 255, 255, 0.08)`), soft highlights, and dynamic cursor specular reflections.
- **Controlled 3D Environment**: Interactive Glass + Metal geometric tech structure built using Three.js and React Three Fiber. Includes mouse parallax, scroll reaction, and accessible high-fidelity WebGL fallback.
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
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glass Tokens
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Directory Structure

```
anand-mohod-portfolio/
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
│   ├── 3d/                     # Three.js canvas, materials, & WebGL fallback
│   ├── navigation/             # Liquid Glass Navbar & Minimal Footer
│   ├── ui/                     # GlassCard, GlassButton, CustomCursor, SectionHeading
│   └── viewer/                 # Full-screen CertificateViewer modal
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
│   └── resume/                 # Replaceable resume PDF file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/anand-mohod/anand-mohod-portfolio.git
cd anand-mohod-portfolio

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
npm run start
```

---

## ✏️ Customizing Your Content

All data is structured in `/data` for quick updates without touching layout code:
- **Update Contact Info**: Edit `/data/profile.ts` (Phone, Email, LinkedIn, GitHub URLs).
- **Add Projects**: Edit `/data/projects.ts` (Title, description, slug, features, challenges).
- **Add Certificates**: Edit `/data/certificates.ts` (Name, issuer, date, credential ID, verification URL).
- **Update Resume PDF**: Replace the file at `/public/resume/anand-mohod-resume.pdf`.

---

## 🌐 Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete developer portfolio for Anand Mohod"
   git branch -M main
   git remote add origin https://github.com/anand-mohod/anand-mohod-portfolio.git
   git push -u origin main
   ```
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset will automatically detect **Next.js**.
4. Click **Deploy**.

---

## 📄 License
MIT License © Anand Mohod.
