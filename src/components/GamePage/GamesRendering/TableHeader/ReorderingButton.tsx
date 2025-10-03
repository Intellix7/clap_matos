import Icon from '@/utils/Icons';

interface ReorderingButtonProps {
  onClick: () => void;
  direction: 'asc' | 'desc';
  isActive: boolean;
  columnLabel: string;
}

const ReorderingButton: React.FC<ReorderingButtonProps> = ({
  onClick,
  direction,
  isActive,
  columnLabel,
}) => {
  return (
    <button
      onClick={onClick}
      className={`reordering-button text-zinc-500 p-1 reordering-button ${isActive ? 'active' : ''} ${direction === 'asc' ? 'mb-1' : ''}`}
      aria-label={
        direction === 'asc'
          ? `Trier les ${columnLabel} par ordre croissant`
          : `Trier les ${columnLabel} par ordre décroissant`
      }
    >
      {direction === 'asc' ? (
        <Icon sprite='chevron' id='chevron-up' width={15} height={15} />
      ) : (
        <Icon sprite='chevron' id='chevron-down' width={15} height={15} />
      )}
    </button>
  );
};

export default ReorderingButton;
