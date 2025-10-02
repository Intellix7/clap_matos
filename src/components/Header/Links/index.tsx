import Link from 'next/link';

interface LinksProps {
  links: { href: string; label: string }[];
}

const Links: React.FC<LinksProps> = ({ links }) => {
  return (
    <div className='container mx-auto flex py-3 space-x-2'>
      {links.map((link, idx) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-lg font-bold header-link ${idx === links.length - 1 ? '' : 'mr-8'}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Links;
