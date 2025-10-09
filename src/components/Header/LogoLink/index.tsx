import Image from 'next/image';
import Link from 'next/link';

interface LogoLinkProps {
  isActive: boolean;
}

const LogoLink: React.FC<LogoLinkProps> = ({ isActive }) => {
  return (
    <Link
      href='/'
      className='flex flex-col items-center header-link mb-2'
      aria-current={isActive ? 'page' : undefined}
    >
      <Image
        src='/logo-centrallgames.png'
        alt=''
        aria-hidden='true'
        width={100}
        height={100}
        className='mb-3'
      />
      <p className='text-3xl font-bold'>Centr&apos;All Games</p>
    </Link>
  );
};

export default LogoLink;
