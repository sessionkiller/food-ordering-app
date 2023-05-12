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
    paypal_client_id: process.env.PAYPAL_CLIENT_ID
}
}

module.exports = nextConfig
