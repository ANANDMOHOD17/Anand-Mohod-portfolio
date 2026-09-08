/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
