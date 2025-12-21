/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.propspace.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
