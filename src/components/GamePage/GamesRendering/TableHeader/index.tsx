// TableHeader.tsx
import { TH, TR } from '@/utils/Table';
import Content from './Content';
import Icon from '@/utils/Icons';
import { SortState } from '../index';

interface TableHeaderProps {
  sortState: SortState;
  onReorder: (columnIndex: number, direction: 'asc' | 'desc') => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ sortState, onReorder }) => {
  const tableIconIds = [
    'book',
    'bookmark',
    'clock',
    'group',
    'warehouse',
    'external-link',
  ] as const;

  const columnLabels = [
    'Noms de jeux',
    'Catégories',
    'Durées',
    'Joueurs',
    'Disponibilités',
    'Règles',
  ];

  return (
    <thead className='table-header shadow-sm'>
      <TR>
        {columnLabels.map((label, index) => (
          <TH key={index} ariaLabel={label}>
            {index < 5 ? (
              <Content
                icon={tableIconIds[index]}
                isAscending={
                  sortState.column === index && sortState.direction === 'asc'
                }
                isDescending={
                  sortState.column === index && sortState.direction === 'desc'
                }
                onReorderAsc={() => onReorder(index, 'asc')}
                onReorderDesc={() => onReorder(index, 'desc')}
                columnLabel={label}
              />
            ) : (
              <>
                <span className='sr-only'>Voir les règles</span>
                <Icon sprite='table' id={tableIconIds[index]} />
              </>
            )}
          </TH>
        ))}
      </TR>
    </thead>
  );
};

export default TableHeader;
