/** @type {import('next').NextConfig} */
const nextConfig = {
  // The images configuration must be a property inside this main object
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;