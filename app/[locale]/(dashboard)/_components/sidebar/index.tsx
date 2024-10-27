'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getCookie } from 'cookies-next';
import { CircleAlert, Clock, Star, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';
import clsx from 'clsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/routing';
import { Templates } from '../templates';
import { Team } from '@/lib/types';
import { extractFirstLetters } from '@/lib/helpers';
import { CreateTeamModal } from './create-team-modal';
import { setCurrentTeam } from '@/lib/actions/team.actions';


interface ISidebar {
  teams: {
    data: Team[];
    error: any;
  };
}


export const Sidebar = ({ teams }: ISidebar) => {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();

  // const currentTeamId = getCookie('currentTeam');
  // const [currentTeamName, setCurrentTeamName] = useState('No teams');

  useEffect(() => {
    // if(teams.data.length > 0) {
    //   const currentTeam = teams.data.find(team => team.id === currentTeamId);
    //   if(currentTeam) {
    //     setCurrentTeamName(currentTeam.name);
    //   }
    // }

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
        <CreateTeamModal />
        <ul className='flex flex-col gap-1.5'>
          {teams.data.map(team => (
            <li 
              key={crypto.randomUUID()} 
              className='w-10 h-10 flex justify-center items-center rounded-md overflow-hidden hover:opacity-55 transition-opacity duration-100' 
              style={{ background: team.teamColor }}>
              <Link 
                href={`/teams/${team.id}`} 
                className='w-full h-fit text-center font-semibold'
              >
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
        {/* {teams.data.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='flex justify-between items-center text-left'>
              {currentTeamName}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {teams.data.map(team => (
                <DropdownMenuItem 
                  key={crypto.randomUUID()} 
                  onClick={() => setCurrentTeam(team.id)}
                  className={clsx('bg-white', team.id === currentTeamId && 'bg-slate-400')}
                >
                  {team.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>No teams</div>
        )} */}
        <Templates />
      </div>
    </aside>
  );
};