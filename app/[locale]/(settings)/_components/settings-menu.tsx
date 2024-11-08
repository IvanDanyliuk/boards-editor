import { useTranslations } from 'next-intl';
import { History, PanelsLeftBottom, Users } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Separator } from '@/components/ui/separator';
import { TeamsMenu } from '@/components/teams-menu';
import { Team } from '@/lib/types';


interface ISettingsMenu {
  userId: string;
  teams: Team[];
};


export const SettingsMenu = ({ userId, teams }: ISettingsMenu) => {
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
      <TeamsMenu teams={teams} />
      <Separator />
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