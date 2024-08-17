'use client';

import { Plus } from 'lucide-react';

export const CreateTeamButton = () => {
  return (
    <button className='w-[40px] h-[40px] flex justify-center items-center rounded-md bg-sidebar-secondary text-white'>
      <Plus />
    </button>
  );
};