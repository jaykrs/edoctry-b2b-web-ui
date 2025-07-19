/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.edoctry.com", "plus.unsplash.com", "images.unsplash.com"],
  },
  webpack(config: any) {
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
};

module.exports = nextConfig;
