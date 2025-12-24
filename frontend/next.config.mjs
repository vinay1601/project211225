/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.propspace.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//  images: {
//     formats: ["image/avif", "image/webp"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "photos.propspace.com",
//       },
//       {
//         protocol: "https",
//         hostname: "**.cloudinary.com",
//       },
//       {
//         protocol: "https",
//         hostname: "**.amazonaws.com",
//       },
//     ],
//   },
//   compiler: {
//     removeConsole: true,
//   },
// };
// // 
// export default nextConfig;
