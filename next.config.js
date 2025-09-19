/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        // This allows images from your GitHub repository to be displayed.
        // If your image is hosted on a different domain, update the hostname.
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;