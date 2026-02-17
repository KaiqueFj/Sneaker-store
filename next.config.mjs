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
      {
        protocol: "https",
        hostname: "images.stockx.com", // allow StockX images
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
    ],
  },
};

export default nextConfig;
