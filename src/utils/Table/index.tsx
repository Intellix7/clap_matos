import { Jeux } from '@/payload-types';

export const TR: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr className='border-b'>{children}</tr>
);

export const TD: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className='py-2 px-4'>{children}</td>
);

export const TH: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className='py-2 px-4'>{children}</th>
);

export function getPlayerFormatFromGame(game: Jeux): string {
  if (!game.nbMinPlayers) return '-';
  else if (!game.nbMaxPlayers) return `${game.nbMinPlayers}`;
  else if (game.nbMaxPlayers > 100) return `${game.nbMinPlayers}+`;
  else if (game.nbMinPlayers === game.nbMaxPlayers)
    return `${game.nbMinPlayers}`;
  else return `${game.nbMinPlayers}-${game.nbMaxPlayers}`;
}

export function getHourMinFromMinutes(totalMinutes: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function getGameTimeFormatFromGame(game: Jeux): string {
  if (!game.minPlayingTime) return '-';
  const { hours: minHours, minutes: minMinutes } = getHourMinFromMinutes(
    game.minPlayingTime
  );
  if (!game.maxPlayingTime) {
    if (minHours === 0) {
      return `${minMinutes} min`;
    }
    return `${minHours}h${minMinutes === 0 ? '' : minMinutes}`;
  }

  const { hours: maxHours, minutes: maxMinutes } = getHourMinFromMinutes(
    game.maxPlayingTime
  );
  if (minHours === 0 && maxHours === 0)
    return `${minMinutes}-${maxMinutes} min`;
  else if (minHours === 0) {
    return `{minMinutes}min-${maxHours}h${minMinutes === 0 ? '' : minMinutes}`;
  }

  return `${minHours}h${minMinutes === 0 ? '' : minMinutes}-${maxHours}h${maxMinutes}`;
}
