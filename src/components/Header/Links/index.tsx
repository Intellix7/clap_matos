import Link from 'next/link';

interface LinksProps {
  links: { href: string; label: string }[];
}

const Links: React.FC<LinksProps> = ({ links }) => {
  return (
    <div className='flex flex-col md:flex-row md:space-x-4 text-center md:space-y-0 space-y-4'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className='font-bold header-link'
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Links;
