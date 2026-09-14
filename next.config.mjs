/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [70, 75],
  },
  reactCompiler: true,
};

export default nextConfig;
