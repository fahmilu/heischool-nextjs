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
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // Build optimizations to prevent hanging on servers
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
