import { Jeux } from '@/payload-types';
import { PayloadRequest } from 'payload';

export async function borrowGame(game: Jeux, req: PayloadRequest) {
  return req.payload.update({
    id: game.id,
    collection: 'jeux',
    data: { nbGamesAvailable: game.nbGamesAvailable - 1 },
  });
}

export async function returnGame(game: Jeux, req: PayloadRequest) {
  return req.payload.update({
    id: game.id,
    collection: 'jeux',
    data: { nbGamesAvailable: game.nbGamesAvailable + 1 },
  });
}
