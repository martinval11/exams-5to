const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);
