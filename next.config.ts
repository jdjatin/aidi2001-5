import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  serverExternalPackages: ['@google/genai', 'pdf-parse', '@napi-rs/canvas'],
  turbopack: {
    root: path.resolve(__dirname),
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['pdfjs-dist/build/pdf.worker'] = path.join(
      __dirname,
      'node_modules/pdfjs-dist/build/pdf.worker.mjs'
    );
    return config;
  },
};

export default nextConfig;
