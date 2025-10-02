import { Jeux } from '@/payload-types';
import {
  getGameTimeFormatFromGame,
  getPlayerFormatFromGame,
  TD,
  TR,
} from '@/utils/Table';

interface TableBodyProps {
  games: Jeux[];
}

const TableBody: React.FC<TableBodyProps> = ({ games }) => {
  return (
    <tbody className='bg-gray-200'>
      {games.map((game) => {
        const name = game.name;
        const category = game.categorie
          .filter((cat) => typeof cat === 'object')
          .map((cat) => cat.name)
          .join(', ');

        const players = getPlayerFormatFromGame(game);
        const time = getGameTimeFormatFromGame(game);
        const available = game.nbGamesAvailable > 0;

        return (
          <TR key={game.id}>
            <TD>{name}</TD>
            <TD>{category}</TD>
            <TD>{time}</TD>
            <TD>{players}</TD>
            <TD>{available ? 'Disponible' : 'Emprunté'}</TD>
          </TR>
        );
      })}
    </tbody>
  );
};

export default TableBody;
