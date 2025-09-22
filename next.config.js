/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    unoptimized: false,
  },
  // Enable SWC minification
  swcMinify: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Ensure proper module resolution
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
