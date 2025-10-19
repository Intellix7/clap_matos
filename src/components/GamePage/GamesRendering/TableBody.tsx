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
    <tbody>
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
          <TR key={game.id} className='backdrop-blur-xs bg-white/10 shadow-sm'>
            <TD>{name}</TD>
            <TD>{category}</TD>
            <TD>{time}</TD>
            <TD>{players}</TD>
            <TD>{available ? 'Disponible' : 'Emprunté'}</TD>
            <TD>
              {game.ruleUrl ? (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={game.ruleUrl}
                  aria-label={`Voir les règles du jeu ${name}`}
                  className='after:absolute sm:after:inset-0 link'
                >
                  Voir les règles
                </a>
              ) : (
                '-'
              )}
            </TD>
          </TR>
        );
      })}
    </tbody>
  );
};

export default TableBody;
