/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xdwfpeoyyofrxkqdlpad.supabase.co", // your Supabase images
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // allow Google profile images
      },
    ],
  },
};

export default nextConfig;
