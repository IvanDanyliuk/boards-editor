'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CircleAlert, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@/i18n/routing';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Team } from '@/lib/types';
import { extractFirstLetters } from '@/lib/helpers';
import { Templates } from '../templates';
import { CreateTeamModal } from './create-team-modal';
import { TeamsMenu } from '../../../../../components/teams-menu';


interface ISidebar {
  teams: {
    data: Team[];
    error: any;
  };
};


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
        <CreateTeamModal />
        <ul className='flex flex-col gap-1.5'>
          {teams.data.map(team => (
            <li 
              key={crypto.randomUUID()} 
               className='rounded-md overflow-hidden'
              style={{ background: team.teamColor }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger 
                    className='w-10 h-10 flex justify-center items-center'
                  >
                    <Link 
                      href={`/teams/${team.id}`} 
                      className='relative w-full h-full flex justify-center items-center text-center font-semiboldr hover:opacity-55 transition-opacity duration-100'
                    >
                      {team.teamLogo ? (
                          <Image src={team.teamLogo} alt={team.name} fill className='object-cover' />
                        ) : 
                        extractFirstLetters(team.name)}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>{team.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              
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
        <TeamsMenu teams={teams.data} />
        <Templates />
      </div>
    </aside>
  );
};