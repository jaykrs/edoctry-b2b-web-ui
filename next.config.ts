/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.edoctry.com", "plus.unsplash.com", "via.placeholder.com", "images.unsplash.com"],
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
};

module.exports = nextConfig;
