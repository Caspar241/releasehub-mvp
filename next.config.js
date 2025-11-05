/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.prod.website-files.com'], // Falls wir später externe Images laden
  },
}

module.exports = nextConfig
