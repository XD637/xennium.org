/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/:path*",
          destination: "https://xennium.org/:path*",
          permanent: true,
        },
        {
          source: "/www/:path*",
          destination: "https://xennium.org/:path*",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  