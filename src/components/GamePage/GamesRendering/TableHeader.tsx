import Icon, { IconProps } from '@/utils/Icons';
import { TH, TR } from '@/utils/Table';

const TableHeader: React.FC = () => {
  const tableIconIds = [
    'book',
    'bookmark',
    'clock',
    'group',
    'warehouse',
  ] as const;

  const tableIcons: IconProps<'table'>[] = tableIconIds.map((id) => ({
    sprite: 'table',
    id,
  }));

  return (
    <thead className='bg-gray-200'>
      <TR>
        {tableIcons.map((icon, index) => (
          <TH key={index}>
            <Icon {...icon} />
          </TH>
        ))}
      </TR>
    </thead>
  );
};

export default TableHeader;
