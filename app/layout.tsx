import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import FloatingContactButton from '@/components/ui/FloatingContactButton';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import NameFillPreloader from '@/components/ui/NameFillPreloader';

import { profileData } from '@/data/profile';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${profileData.name} | ${profileData.title}`,
  description: `${profileData.name} is a Computer Engineering Student passionate about building, learning, and solving with technology. Explore software projects, engineering skills, and verified technical credentials.`,
  keywords: [
    'Anand Mohod',
    'Computer Engineering Student',
    'Software Developer Portfolio',
    'Full Stack Web Development',
    'Python',
    'React.js',
    'Node.js',
    'SQL',
    'C++',
  ],
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anandmohod.vercel.app',
    title: `${profileData.name} | ${profileData.title}`,
    description: profileData.tagline,
    siteName: `${profileData.name} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${profileData.name} - ${profileData.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} | ${profileData.title}`,
    description: profileData.tagline,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://anandmohod.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} dark scroll-smooth is-loading`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash inline style: prevents any 1-second reveal of the site before JS mounts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background-color: #050505 !important;
              }
              html.is-loading,
              body.is-loading {
                overflow: hidden !important;
              }
              html.is-loading #portfolio-main-wrapper {
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                height: 100vh !important;
                overflow: hidden !important;
              }
            `,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                html.is-loading #portfolio-main-wrapper {
                  visibility: visible !important;
                  opacity: 1 !important;
                  height: auto !important;
                  overflow: visible !important;
                  pointer-events: auto !important;
                }
                #portfolio-preloader-root {
                  display: none !important;
                }
              `,
            }}
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
              // Failsafe watchdog: guarantees content is never permanently locked
              setTimeout(function() {
                try {
                  document.documentElement.classList.remove('is-loading');
                  if (document.body) document.body.classList.remove('is-loading');
                } catch (_) {}
              }, 4000);
            `,
          }}
        />
      </head>
      <body className="bg-[#050505] text-slate-800 dark:text-slate-100 min-h-screen selection:bg-accent/20 selection:text-white relative transition-colors duration-300 is-loading">
        {/* Unique Name Fill Preloader */}
        <NameFillPreloader name="ANAND MOHOD" />

        {/* Main Portfolio Content — hidden until curtain exit begins */}
        <div id="portfolio-main-wrapper">
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <ScrollProgressBar />
            <CustomCursor />
            <Navbar />
            <main id="main-content" className="relative z-10">{children}</main>
            <Footer />
            <FloatingContactButton />
          </SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}
