import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import { Sidebar } from './_components/sidebar';
import { UserMenu } from './_components/user-menu';
import { Searchbar } from './_components/search-bar';


interface IDashboardLayout  {
  children: React.ReactNode;
};


const DashboardLayout = async ({ children }: IDashboardLayout) => {
  const { data, error } = await getCurrentUser();

  if (!data.user) {
    redirect('/login');
  }

  return (
    <main className='h-full'>
      <Sidebar />
      <div className='pl-[230px] flex-1 h-screen bg-page-bg'>
        <div className='px-3 h-[80px] flex justify-between items-center bg-amber-500'>
          <Searchbar />
          <UserMenu user={data.user} error={error} />
        </div>
        <div className='h-[calc(100%-80px)] bg-cyan-500'>
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;