import Icon from '@/utils/Icons';
import Link from 'next/link';

const SocialButtons: React.FC = () => {
  const socials: Array<{
    href: string;
    platform: 'facebook' | 'instagram' | 'linkedin';
    hoverColor: string;
  }> = [
    {
      href: 'https://www.facebook.com/centrallgames',
      platform: 'facebook',
      hoverColor: '#1877F2',
    },
    {
      href: 'https://www.instagram.com/lille_aux_jeux/',
      platform: 'instagram',
      hoverColor: '#E1306C',
    },
    {
      href: 'https://www.linkedin.com/company/centr-all-games/',
      platform: 'linkedin',
      hoverColor: '#0A66C2',
    },
  ];

  return (
    <div className='flex space-x-4'>
      {socials.map(({ href, platform, hoverColor }) => (
        <Link key={platform} href={href}>
          <Icon sprite='socials' id={platform} hoverColor={hoverColor} />
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
