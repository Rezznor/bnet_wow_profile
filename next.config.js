/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['render.worldofwarcraft.com'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
