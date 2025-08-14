/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xdwfpeoyyofrxkqdlpad.supabase.co",
      },
    ],
  },
};
export default nextConfig;
