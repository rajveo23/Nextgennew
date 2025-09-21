/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental appDir as it's stable in Next.js 14
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
  },
  // Optimize for Vercel deployment
  output: 'standalone',
  // Enable SWC minification
  swcMinify: true,
  // Compress images
  compress: true,
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
