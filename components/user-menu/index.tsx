'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Link } from '@/i18n/routing';
import { MenuDropdown } from './menu-dropdown';


interface IUserMenu {
  user: User | null;
  error: any;
};


export const UserMenu = ({ user, error }: IUserMenu) => {
  const t = useTranslations('Auth');

  if (error) {
    toast.error(error.message);
  }
  
  return (
    <div>
      {user ? 
        <MenuDropdown user={user} /> : 
        <Link href='/login'>
          {t('userMenu.signInBtnLabel')}
        </Link>
      }
    </div>
  );
};