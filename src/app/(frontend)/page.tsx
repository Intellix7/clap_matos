import { getGames } from '@/service/data';
import React from 'react';

export default async function HomePage() {
  const paginatedGames = await getGames();
  const games = paginatedGames.docs;

  return (
    <div>
      <ul>
        {games.map((game) => {
          return (
            <p>{`${game.name} - ${typeof game.categorie === 'object' ? game.categorie.name + ' +' : ' +'} ${game.playingTime || ''} + ${game.nbMinPlayers || ''} - ${game.nbMaxPlayers || ''}`}</p>
          );
        })}
      </ul>
    </div>
  );
}
