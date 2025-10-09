'use client';

import { usePathname } from 'next/navigation';
import LogoLink from './LogoLink';
import Links from './Links';
import SocialButtons from './SocialButtons';

export default function Header() {
  const pathname = usePathname();
  const links: { href: string; label: string }[] = [
    { href: '/', label: 'Accueil' },
    { href: '/games', label: 'Jeux' },
  ];

  return (
    <header className='text-dark flex flex-col items-center pt-15 pb-15 px-8 text-center'>
      <LogoLink isActive={pathname === '/'} />
      <p className='text-gray-500 mb-4'>
        Le site de Centr&apos;All Games, l&apos;association de jeux de société
        de Centrale Lille
      </p>
      <nav aria-label='Navigation principale'>
        <Links links={links} />
      </nav>
      <SocialButtons />
    </header>
  );
}
