/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '54321',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
