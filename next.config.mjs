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
        source: "/offre-tech-ia",
        destination: "/",
        permanent: true,
      },
      {
        source: "/offre",
        destination: "/",
        permanent: true,
      },
      {
        source: "/offre-v2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/offre-v2/:profil",
        destination: "/offre/:profil",
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
