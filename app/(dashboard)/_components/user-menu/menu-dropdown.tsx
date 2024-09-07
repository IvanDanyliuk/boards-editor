import Image from 'next/image';
import Link from 'next/link';
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


interface IMenuDropdown {
  user: User;
}


export const MenuDropdown = ({ user }: IMenuDropdown) => {
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
            <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full font-semibold text-white bg-green-500'>
              {user.user_metadata.name.split(' ').map((char: string) => char[0]).slice(0, 2).join('').toUpperCase()}
            </div>
          } 
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='mb-3 flex items-center gap-3'>
          <Image 
            src={user.user_metadata.imageUrl} 
            alt='Profile image' 
            width={50} 
            height={50} 
            className='rounded-full' 
          />
          <div>
            <p className='text-base'>
              {user.user_metadata.name}
            </p>
            <p className='font-normal text-secondary-text'>
              {user.user_metadata.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={`/settings/${user.id}`} className='flex items-center font-medium text-base'>
            <Settings className='mr-3 w-5 h-5' />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='font-medium text-base' onClick={() => logout()}>
          <LogOut className='mr-3 w-5 h-5' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};