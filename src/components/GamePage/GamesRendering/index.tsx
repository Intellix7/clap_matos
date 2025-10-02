import { Jeux } from '@/payload-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface GamesRenderingProps {
  games: Jeux[];
}

const GamesRendering: React.FC<GamesRenderingProps> = ({ games }) => {
  return (
    <table>
      <TableHeader />
      <TableBody games={games} />
    </table>
  );
};

export default GamesRendering;
