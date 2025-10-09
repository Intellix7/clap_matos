import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  // outputFileTracingIncludes: {
  //   '/admin/**': ['./node_modules/@libsql/**/*'],
  // },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
