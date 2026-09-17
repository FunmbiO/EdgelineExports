/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next's client-side Router Cache otherwise keeps a dynamic page's
    // last-rendered result for 30s and reuses it on soft navigation
    // (e.g. clicking a sidebar link), even though the page reads fresh
    // data server-side on every request. That's fine for public pages,
    // but confusing on admin pages where staff expect to see the latest
    // leads/submissions/inventory immediately after clicking into them.
    staleTimes: {
      dynamic: 0,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
