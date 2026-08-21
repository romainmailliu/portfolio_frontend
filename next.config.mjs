/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
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
      {
        source: "/tarifs",
        destination: "/site-vitrine",
        permanent: true,
      },
      {
        source: "/tarifs.md",
        destination: "/site-vitrine.md",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
