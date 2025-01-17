/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://piperku.com http://localhost:3000",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
