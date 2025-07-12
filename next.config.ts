/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.edoctry.com", "plus.unsplash.com", "images.unsplash.com"],
  },
  webpack(config : any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
