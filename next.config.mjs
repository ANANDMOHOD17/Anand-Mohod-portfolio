/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Anand-Mohod-portfolio' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['gsap', 'lenis'],
  experimental: {
    webpackBuildWorker: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;
