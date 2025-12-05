/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '72.60.78.177',
      },
      {
        protocol: 'https',
        hostname: 'staging.heischools.co.id',
      },
      {
        protocol: 'https',
        hostname: 'heischools.co.id',
      },
    ],
  },
};

export default nextConfig;
