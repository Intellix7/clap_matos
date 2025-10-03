import Icon from '@/utils/Icons';

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
        <a key={platform} href={href} target='_blank' rel='noopener noreferrer'>
          <Icon sprite='socials' id={platform} hoverColor={hoverColor} />
        </a>
      ))}
    </div>
  );
};

export default SocialButtons;
