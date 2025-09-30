import { Emprunt, Jeux } from '@/payload-types';
import { PayloadRequest } from 'payload';

export default async function getGamesFromEmprunt(
  emprunt: Emprunt,
  req: PayloadRequest
) {
  const games: Jeux[] = [];
  for (const gameRef of emprunt.games) {
    if (typeof gameRef === 'number') {
      const game = await req.payload.findByID({
        id: gameRef,
        collection: 'jeux',
      });
      games.push(game);
    } else {
      games.push(gameRef as Jeux);
    }
  }
  return games;
}
