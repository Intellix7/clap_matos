import GamePageRender from '@/components/GamePage';
import { getGames } from '@/service/data';
import React from 'react';

export default async function GamePage() {
  const paginatedGames = await getGames();
  const games = paginatedGames.docs;

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Catalogue des jeux
      </h1>
      <GamePageRender games={games} />
    </div>
  );
}
