'use client';

import { User } from '@supabase/supabase-js';


interface IUserMenu {
  user: User | null;
}

export const UserMenu = ({ user }: IUserMenu) => {
  return (
    <div>
      {user ? user.email : 'Logged Out'}
    </div>
  );
};