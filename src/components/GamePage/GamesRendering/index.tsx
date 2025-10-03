import { Jeux } from '@/payload-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useMemo, useState } from 'react';

interface GamesRenderingProps {
  games: Jeux[];
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: number | null;
  direction: SortDirection;
}

const GamesRendering: React.FC<GamesRenderingProps> = ({ games }) => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const handleReorder = (
    columnIndex: number,
    direction: Exclude<SortDirection, null>
  ) => {
    setSortState((prev) => {
      // if the same column and same direction -> deactivate
      if (prev.column === columnIndex && prev.direction === direction) {
        return { column: null, direction: null };
      }
      return { column: columnIndex, direction };
    });
  };

  const sortedGames = useMemo(() => {
    if (sortState.column === null || sortState.direction === null) return games;

    const sorted = [...games];

    sorted.sort((a, b) => {
      switch (sortState.column) {
        case 0: {
          // Name
          return sortState.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        case 1: {
          // Category (based on first category name alphabetically)
          const catA = b.categorie
            .filter((c) => typeof c === 'object')
            .map((c) => c.name)
            .sort((a, b) => a.localeCompare(b))
            .join(', ');
          const catB = a.categorie
            .filter((c) => typeof c === 'object')
            .map((c) => c.name)
            .sort((a, b) => a.localeCompare(b))
            .join(', ');

          return sortState.direction === 'asc'
            ? catA.localeCompare(catB)
            : catB.localeCompare(catA);
        }
        case 2: {
          // Time
          const valA =
            sortState.direction === 'desc'
              ? a.maxPlayingTime
              : a.minPlayingTime;
          const valB =
            sortState.direction === 'desc'
              ? b.maxPlayingTime
              : b.minPlayingTime;

          // Handle null/undefined -> push to bottom
          if (valA == null && valB == null) return 0;
          if (valA == null) return 1; // A goes after B
          if (valB == null) return -1; // B goes after A

          // Compare valid numbers
          return sortState.direction === 'asc' ? valA - valB : valB - valA;
        }

        case 3: {
          // Players
          const valA =
            sortState.direction === 'asc'
              ? (a.nbMaxPlayers ?? a.nbMinPlayers)
              : (a.nbMinPlayers ?? a.nbMaxPlayers);

          const valB =
            sortState.direction === 'asc'
              ? (b.nbMaxPlayers ?? b.nbMinPlayers)
              : (b.nbMinPlayers ?? b.nbMaxPlayers);

          // If both are still null, they go to bottom
          if (valA == null && valB == null) return 0;
          if (valA == null) return 1;
          if (valB == null) return -1;

          return sortState.direction === 'desc' ? valA - valB : valB - valA;
        }

        case 4: {
          // Availability
          return sortState.direction === 'asc'
            ? a.nbGamesAvailable - b.nbGamesAvailable
            : b.nbGamesAvailable - a.nbGamesAvailable;
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [games, sortState]);

  return (
    <div className='w-full overflow-x-auto mb-4'>
      <table className='w-full table-auto border-collapse game-table'>
        <TableHeader sortState={sortState} onReorder={handleReorder} />
        <TableBody games={sortedGames} />
      </table>
    </div>
  );
};

export default GamesRendering;
