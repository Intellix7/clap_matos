'use server';
import config from '@/payload.config';
import { getPayload } from 'payload';

export async function getGames() {
  const payload = await getPayload({ config });
  const jeux = await payload.find({
    collection: 'jeux',
    pagination: false,
    sort: 'name',
  });

  return jeux;
}
