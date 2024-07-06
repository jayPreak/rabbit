/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [...(config.externals || []), 'socketio-client']
    }
    return config
  },
  experimental: {
    esmExternals: false,
  },
}
export default nextConfig;
