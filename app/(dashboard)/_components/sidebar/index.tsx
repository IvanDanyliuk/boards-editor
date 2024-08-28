'use client';

import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';


export const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <aside className='fixed h-full flex'>
      <div className='w-[50px] h-full py-3 bg-secondary'>
        Team List
      </div>
      <div className='w-[170px] px-2 py-3 flex flex-col gap-y-3 bg-main-bg'>
        <Link href='/' className={`flex items-center gap-1 ${pathname === '/' ? 'text-primary' : 'text-black'}`}>
          <Clock className='w-5 h-5' />
          <span>Recent boards</span>
        </Link>
        <Link href='/starred-boards' className={`flex items-center gap-1 ${pathname === '/starred-boards' ? 'text-primary' : 'text-black'}`}>
          <Star className='w-5 h-5' />
          <span>Starred Boards</span>
        </Link>
        <div>Team Dropdown Menu</div>
        <div>Templates</div>
      </div>
    </aside>
  );
};