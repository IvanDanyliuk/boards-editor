'use client';

import { User } from '@supabase/supabase-js';
import { MenuDropdown } from './menu-dropdown';
import Link from 'next/link';


interface IUserMenu {
  user: User | null;
}

export const UserMenu = ({ user }: IUserMenu) => {
  return (
    <div>
      {user ? <MenuDropdown user={user} /> : <Link href='/login'>Sign In</Link>}
    </div>
  );
};