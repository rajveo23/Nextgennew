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
  // Enable static generation for better SEO
  output: 'standalone',
  // Generate static pages at build time
  generateBuildId: async () => {
    return 'nextgen-registry-build'
  },
  // Enable experimental features for better SEO
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issue
  },
  // Compress responses
  compress: true,
  // Enable trailing slash for better SEO
  trailingSlash: false,
  // Optimize for production
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
