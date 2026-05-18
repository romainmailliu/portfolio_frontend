/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/future",
        destination: "/production-documentaire",
        permanent: true,
      },
      {
        source: "/future.md",
        destination: "/production-documentaire.md",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
