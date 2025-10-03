import Icon, { IconProps } from '@/utils/Icons';
import ReorderingButton from './ReorderingButton';

interface ContentProps {
  icon: IconProps<'table'>['id'];
  isAscending: boolean;
  isDescending: boolean;
  onReorderAsc: () => void;
  onReorderDesc: () => void;
  columnLabel: string;
}

const Content: React.FC<ContentProps> = ({
  icon,
  isAscending,
  isDescending,
  onReorderAsc,
  onReorderDesc,
  columnLabel,
}) => {
  return (
    <div className='flex items-center'>
      <Icon sprite='table' id={icon} className='mr-3' />
      <div className='flex flex-col items-center'>
        <ReorderingButton
          onClick={onReorderAsc}
          direction='asc'
          isActive={isAscending}
          columnLabel={columnLabel}
        />
        <ReorderingButton
          onClick={onReorderDesc}
          direction='desc'
          isActive={isDescending}
          columnLabel={columnLabel}
        />
      </div>
    </div>
  );
};

export default Content;
