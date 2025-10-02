'use client';

import { Jeux } from '@/payload-types';
import Input from './Input';
import { useState } from 'react';
import GamesRendering from './GamesRendering';

interface GamePageRenderProps {
  games: Jeux[];
}

const GamePageRender: React.FC<GamePageRenderProps> = ({ games }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter games using regex based on searchTerm
  const filteredGames = games.filter((game) => {
    if (!searchTerm) return true;
    try {
      const regex = new RegExp(searchTerm, 'i');
      return regex.test(game.name);
    } catch {
      // If invalid regex, show nothing
      return false;
    }
  });

  return (
    <div>
      <Input
        placeholder='Rechercher un jeu...'
        value={searchTerm}
        onChange={setSearchTerm}
        className='mb-4'
      />
      <GamesRendering games={filteredGames} />
    </div>
  );
};

export default GamePageRender;
