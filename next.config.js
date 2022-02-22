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
  },
};
