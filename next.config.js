/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"]
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  env : {
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    cloudinary_url: process.env.CLOUDINARY_URL
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
