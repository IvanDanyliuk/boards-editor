/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kevinsharuk.wordpress.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
