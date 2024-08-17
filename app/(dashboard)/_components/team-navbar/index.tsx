import { History, Star } from 'lucide-react';
import Link from 'next/link';
import { TemplatesModal } from './templates-modal';
import { TeamMenu } from './team-menu';

export const TeamNavbar = () => {
  return (
    <div className='px-5'>
      <div>Logo</div>
      <div className='flex flex-col gap-y-3'>
        <Link href='/recent-boards' className='flex gap-1'>
          <History className='w-[20px] h-[20px]' />
          <span>Recent boards</span>
        </Link>
        <Link href='/starred-boards' className='flex gap-1'>
          <Star className='w-[20px] h-[20px]' />
          <span>Starred boards</span>
        </Link>
        <TeamMenu />
        <TemplatesModal />
      </div>
    </div>
  );
};