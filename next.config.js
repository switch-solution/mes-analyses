/** @type {import('next').NextConfig} */


const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'my-blob-store.public.blob.vercel-storage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'gaarltlslp2rg4a1.public.blob.vercel-storage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },

        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/api/auth/signin',
                permanent: true,
            },
        ]
    }
};

module.exports = nextConfig
