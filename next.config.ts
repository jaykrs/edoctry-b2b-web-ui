/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["edgeadmin.teqtoeducation.com", "plus.unsplash.com", "via.placeholder.com", "images.unsplash.com"],
  },
  webpack(config : any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: "@svgr/webpack",
        options: {
          icon: true,
          titleProp: true,
        },
      }],
    });
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match requests starting with /api/
        destination: 'https://edgeadmin.teqtoeducation.com*', // Proxy to your HTTP API
      },
    ];
  }
};

module.exports = nextConfig;
