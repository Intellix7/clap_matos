type SpriteMap = {
  socials: 'facebook' | 'linkedin' | 'instagram';
  chevron: 'chevron-right' | 'chevron-left' | 'chevron-up' | 'chevron-down';
  table:
    | 'book'
    | 'bookmark'
    | 'clock'
    | 'group'
    | 'warehouse'
    | 'external-link';
};

export type IconProps<T extends keyof SpriteMap = keyof SpriteMap> = {
  sprite: T;
  id: SpriteMap[T];
  hoverColor?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

function Icon<T extends keyof SpriteMap>({
  sprite,
  id,
  hoverColor,
  width = 25,
  height = 25,
  className,
}: IconProps<T>) {
  const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (hoverColor) {
      e.currentTarget.style.color = hoverColor;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (hoverColor) {
      e.currentTarget.style.color = 'inherit';
    }
  };

  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-hidden='true'
      style={{
        color: 'inherit',
      }}
      onMouseEnter={hoverColor ? handleMouseEnter : undefined}
      onMouseLeave={hoverColor ? handleMouseLeave : undefined}
      fill='currentColor'
    >
      <use href={`/${sprite}-sprite.svg#${id}`} />
    </svg>
  );
}

export default Icon;
