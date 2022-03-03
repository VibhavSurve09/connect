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
    MONGO_URI:
      'mongodb+srv://dev:utkvib01@connect-notifications.kay2p.mongodb.net/Connect?retryWrites=true&w=majority',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
