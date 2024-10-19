import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { History, PanelsLeftBottom, Users } from 'lucide-react';


interface ISettingsMenu {
  userId: string;
};


export const SettingsMenu = ({ userId }: ISettingsMenu) => {
  const t = useTranslations('Example');
  
  const links = [
    {
      href: `/profile/${userId}/`,
      icon: <History />,
      label: 'Profile settings',
    },
    {
      href: `/profile/${userId}/team-profile`,
      icon: <PanelsLeftBottom />,
      label: 'Team profile',
    },
    {
      href: `/profile/${userId}/team-users`,
      icon: <Users />,
      label: 'Team users',
    },
  ];
  
  return (
    <div className='p-3 h-fit flex flex-col gap-3 rounded-md bg-white'>
      <div>Team Menu</div>
      <p>{t('title')}</p>
      <div className='w-full h-[1px] bg-page-bg' />
      {links.map(link => (
        <Link 
          key={crypto.randomUUID()} 
          href={link.href} 
          className='settings-menu-item'
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};