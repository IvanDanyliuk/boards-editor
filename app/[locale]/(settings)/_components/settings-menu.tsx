import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { History, PanelsLeftBottom, Users } from 'lucide-react';


interface ISettingsMenu {
  userId: string;
};


export const SettingsMenu = ({ userId }: ISettingsMenu) => {
  const t = useTranslations('Settings');
  
  const links = [
    {
      href: `/profile/${userId}/`,
      icon: <History />,
      label: t('settingsMenu.link1'),
    },
    {
      href: `/profile/${userId}/team-profile`,
      icon: <PanelsLeftBottom />,
      label: t('settingsMenu.link2'),
    },
    {
      href: `/profile/${userId}/team-users`,
      icon: <Users />,
      label: t('settingsMenu.link3'),
    },
  ];
  
  return (
    <div className='p-3 h-fit flex flex-col gap-3 rounded-md bg-white'>
      <div>Team Menu</div>
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