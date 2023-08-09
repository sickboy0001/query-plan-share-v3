/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //   appDir: true,
    // },
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ['sntloreazdprzuoszttx.supabase.co'],
    },
  }
  
  module.exports = nextConfig
  