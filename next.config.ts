/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://piperku.com",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://piperku.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
