/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gestor-dron.netlify.app',
            }
        ]
    }
};

export default nextConfig;
