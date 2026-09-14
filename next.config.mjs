/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is a one-page, Tailwind-based site. Delivering the small generated
  // stylesheet with the initial HTML removes the render-blocking CSS requests
  // that delay the first paint for new visitors.
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [70, 75],
  },
  reactCompiler: true,
};

export default nextConfig;
