'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CircleAlert, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@/i18n/routing';
import { Templates } from '../templates';
import { CreateTeamForm } from './create-team-form';
import { Team } from '@/lib/types';
import { extractFirstLetters } from '@/lib/helpers';


interface ISidebar {
  teams: {
    data: Team[];
    error: any;
  };
}


export const Sidebar = ({ teams }: ISidebar) => {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();

  useEffect(() => {
    if(teams.error) {
      Object.values(teams.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [teams]);
  
  return (
    <aside className='fixed h-full flex'>
      <div className='w-[56px] h-full px-1.5 py-2 flex flex-col items-center gap-1.5 bg-secondary-bg'>
        <CreateTeamForm />
        <ul className='flex flex-col gap-1.5'>
          {teams.data.map(team => (
            <li key={crypto.randomUUID()} className='w-10 h-10 flex justify-center items-center rounded-md overflow-hidden' style={{ background: team.teamColor }}>
              <Link href={`/teams/${team.id}`} className='w-full h-fit text-center font-semibold'>
                {extractFirstLetters(team.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-[180px] px-2 py-3 flex flex-col gap-y-3 bg-page-bg'>
        <Link 
          href='/' 
          className={`flex items-center gap-1 ${pathname === '/' ? 'text-primary-bg' : 'text-black'}`}
        >
          <Clock className='w-5 h-5' />
          <span>
            {t('sidebar.recentBoards')}
          </span>
        </Link>
        <Link 
          href='/starred-boards' 
          className={`flex items-center gap-1 ${pathname === '/starred-boards' ? 'text-primary-bg' : 'text-black'}`}
        >
          <Star className='w-5 h-5' />
          <span>
            {t('sidebar.starredBoards')}
          </span>
        </Link>
        <div>Team Dropdown Menu</div>
        <Templates />
      </div>
    </aside>
  );
};