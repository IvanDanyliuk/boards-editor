'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Clock, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Templates } from '../templates';
import { TeamsList } from '../teams-list';


export const Sidebar = () => {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  
  return (
    <aside className='fixed h-full flex'>
      <TeamsList />
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