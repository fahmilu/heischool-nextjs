/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '72.60.78.177',
      },
    ],
  },
};

export default nextConfig;
