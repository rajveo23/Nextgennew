/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
}

module.exports = nextConfig
