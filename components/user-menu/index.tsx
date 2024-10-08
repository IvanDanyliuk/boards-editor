'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { MenuDropdown } from './menu-dropdown';


interface IUserMenu {
  user: User | null;
  error: any;
}


export const UserMenu = ({ user, error }: IUserMenu) => {
  if (error) {
    toast.error(error.message);
  }
  
  return (
    <div>
      {user ? <MenuDropdown user={user} /> : <Link href='/login'>Sign In</Link>}
    </div>
  );
};