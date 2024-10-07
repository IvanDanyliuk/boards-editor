import { UserMenu } from '@/components/user-menu';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SettingsMenu } from './_components/settings-menu';

interface ISettingsLayout {
  children: React.ReactNode;
};


const SettingsLayout = async ({ children }: ISettingsLayout) => {
  const { data, error } = await getCurrentUser();

  if (!data.user) {
    redirect('/login');
  }

  return (
    <>
      <header className='px-3 md:px-10 w-full h-[80px] flex justify-between items-center bg-white'>
        <Link href='/' className='flex'>
          <LayoutGrid className='mr-3' />
          Go to boards
        </Link>
        <UserMenu 
          user={data.user} 
          error={error} 
        />
      </header>
      <div className='h-[calc(100vh-80px)] bg-page-bg'>
        <div className='container py-3 h-full flex gap-3'>
          <SettingsMenu userId={data.user.id} />
          <div className='p-3  flex-1 rounded-md bg-white'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;