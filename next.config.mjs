/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kevinsharuk.wordpress.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'edtbinjkmfbdbpsugiiu.supabase.co',
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;
