import { headers as getHeaders } from 'next/headers.js';
import { getPayload } from 'payload';
import React from 'react';

import config from '@/payload.config';

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  return <p>y&apos;a rien pour l&apos;instant, faut bosser</p>;
}
