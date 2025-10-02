import GamePageRender from '@/components/GamePage';
import { getGames } from '@/service/data';
import React from 'react';

export default async function GamePage() {
  const paginatedGames = await getGames();
  const games = paginatedGames.docs;

  return (
    <div>
      <GamePageRender games={games} />
    </div>
  );
}
