import Image from 'next/image';
import Link from 'next/link';

interface LogoLinkProps {
  isActive: boolean;
}

const LogoLink: React.FC<LogoLinkProps> = ({ isActive }) => {
  return (
    <Link
      href='/'
      className='flex items-center justify-center space-x-2 header-link pointer-events-auto'
      aria-current={isActive ? 'page' : undefined}
    >
      <Image
        src='/logo-centrallgames.png'
        alt=''
        aria-hidden='true'
        width={40}
        height={40}
        className='block' // or 'align-middle'
      />
      <p className='text-xl font-bold leading-none'>Centr&apos;All Games</p>
    </Link>
  );
};

export default LogoLink;
