import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import IntroLoader from '@/components/ui/IntroLoader';
import FloatingContactButton from '@/components/ui/FloatingContactButton';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import ReduceMotionToggle from '@/components/ui/ReduceMotionToggle';
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`} suppressHydrationWarning>
      <head>
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
                const savedMotion = localStorage.getItem('am_reduce_motion');
                if (savedMotion === 'true') {
                  document.documentElement.classList.add('reduced-motion');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-graphite-950 dark:bg-graphite-950 text-slate-800 dark:text-slate-100 min-h-screen selection:bg-accent/20 selection:text-white relative transition-colors duration-300">
        <SmoothScrollProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <IntroLoader />
          <ScrollProgressBar />
          <CustomCursor />
          <Navbar />
          <main id="main-content" className="relative z-10">{children}</main>
          <Footer />
          <FloatingContactButton />
          <ReduceMotionToggle />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
