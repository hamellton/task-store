/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// module.exports = {
//   // i18n: {
//   //   locales: ["en", "es"],
//   //   defaultLocale: "en",
//   // },
//   poweredByHeader: false,
//   generateEtags: false,
//   // eslint-disable-next-line require-await
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-DNS-Prefetch-Control',
//             value: 'on',
//           },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=63072000; includeSubDomains; preload',
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block',
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'SAMEORIGIN',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//         ],
//       },
//       {
//         source: '/login',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/signup',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/mon-compte',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/mon-project',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/reset-password',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/api/password/:slug*',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/api/user/:slug*',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//       {
//         source: '/api/projects/:slug*',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-store',
//           },
//         ],
//       },
//     ];
//   },
//   images: {
//     domains: [
//       process.env.NEXT_IMAGE_DOMAIN,
//       'photo-ws.kohler.com',
//       'img.youtube.com',
//       'files.machinalis.eu',
//       'fr-qa.jdm-jacobdelafon.fr',
//       'fr-prod.jdm-jacobdelafon.fr',
//     ],
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: /\.(js|ts)x?$/,
//       use: ['@svgr/webpack'],
//     });
//     return config;
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   // async rewrites() {
//   //   return [
//   //     {
//   //       source: "/es",
//   //       destination: "/es/principal",
//   //       locale: false,
//   //     },
//   //     {
//   //       source: "/en/principal",
//   //       destination: "/",
//   //       locale: false,
//   //     },
//   //   ]
//   // },
// };
