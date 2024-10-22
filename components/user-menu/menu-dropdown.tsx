import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LogOut, Settings } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/actions/auth.actions';
import { Link } from '@/i18n/routing';
import { extractFirstLetters } from '@/lib/helpers';


interface IMenuDropdown {
  user: User;
};


export const MenuDropdown = ({ user }: IMenuDropdown) => {
  const t = useTranslations('Auth');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center'>
        <div>
          {user.user_metadata.imageUrl ? 
            <Image 
              src={user.user_metadata.imageUrl} 
              alt='Profile image' 
              width={50} 
              height={50} 
              className='rounded-full' 
            /> : 
            <div 
              className='w-[50px] h-[50px] flex justify-center items-center rounded-full font-semibold text-white' 
              style={{ background: user.user_metadata.userColor }}
            >
              {extractFirstLetters(user.user_metadata.name)}
            </div>
          } 
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='mb-3 flex items-center gap-3'>
        {user.user_metadata.imageUrl ? 
            <Image 
              src={user.user_metadata.imageUrl} 
              alt='Profile image' 
              width={50} 
              height={50} 
              className='rounded-full' 
            /> : 
            <div 
              className='w-[50px] h-[50px] flex justify-center items-center rounded-full font-semibold text-white' 
              style={{ background: user.user_metadata.userColor }}
            >
              {extractFirstLetters(user.user_metadata.name)}
            </div>
          } 
          <div>
            <p className='text-base'>
              {user.user_metadata.name}
            </p>
            <p className='font-normal text-secondary-text'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link 
            href={`/profile/${user.id}`} 
            className='flex items-center font-medium text-base'
          >
            <Settings className='mr-3 w-5 h-5' />
            {t('userMenu.settingsLinkLabel')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className='font-medium text-base' 
          onClick={() => logout()}
        >
          <LogOut className='mr-3 w-5 h-5' />
          {t('userMenu.logoutBtnLabel')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};