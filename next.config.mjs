/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Anand-Mohod-portfolio' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'gsap', 'lenis'],
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;
