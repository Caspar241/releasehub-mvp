/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.prod.website-files.com'], // Falls wir später externe Images laden
  },

  // Prevent multiple concurrent builds
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Ensure middleware manifest is always generated
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Force middleware manifest generation
      config.optimization = {
        ...config.optimization,
        minimize: false,
      };
    }
    return config;
  },

  // Add build timeout
  staticPageGenerationTimeout: 180,

  // Safer file system handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
