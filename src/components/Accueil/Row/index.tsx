import Image from 'next/image';
import TextBubble from '../TextBubble';

interface ImageProps {
  src: string;
  alt: string;
}

interface RowProps {
  imageProperties: ImageProps;
  children: React.ReactNode;
  title: string;
  reverse?: boolean;
  className?: string;
}

const Row: React.FC<RowProps> = ({
  imageProperties,
  children,
  title,
  reverse,
  className = '',
}) => {
  return (
    <div
      className={`md:flex mb-8 ${reverse ? 'md:flex-row' : 'md:flex-row-reverse'} ${className}`}
    >
      <TextBubble className='md:mx-0 mx-8 flex-1 md:mb-0 mb-8' title={title}>
        {children}
      </TextBubble>
      <div
        className={`relative w-auto md:w-7/12 md:h-auto h-80 flex-none md:mx-6 mx-8 ${reverse ? 'md:mr-0' : 'md:ml-0'}`}
      >
        <Image
          src={imageProperties.src}
          alt={imageProperties.alt}
          fill={true}
          className='rounded-4xl'
          objectFit='cover'
        />
      </div>
    </div>
  );
};

export default Row;
