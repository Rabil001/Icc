/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'impactcentrechretien.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
