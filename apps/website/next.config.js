const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@gamba/core', '@gamba/react', '@gamba/react-ui'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        path: false,
        os: false
      }
    }
    config.externals = [...(config.externals || []), 'gamba-core-v2']
    return config
  },
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = withNextra(nextConfig)
