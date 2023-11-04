/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "nurserylive.com",
      "res.cloudinary.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.shopify.com",
      "www.google.com"
    ]
  }
};

module.exports = nextConfig;
