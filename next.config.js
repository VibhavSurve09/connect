module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'firebasestorage.googleapis.com',
    ],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    SOCKET_URI: process.env.SOCKET_URI,
    API_URI: process.env.API_URI,
    MONGO_URI: process.env.MONGO_URI,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
