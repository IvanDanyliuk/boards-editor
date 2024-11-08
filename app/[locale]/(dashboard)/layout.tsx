import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { Sidebar } from './_components/sidebar';
import { UserMenu } from '../../../components/user-menu';
import { Searchbar } from './_components/search-bar';
import { fetchTeams } from '@/lib/actions/team.actions';


interface IDashboardLayout  {
  children: React.ReactNode;
};

const teamsEmptyState = {
  data: [],
  error: null
};


const DashboardLayout = async ({ children }: IDashboardLayout) => {
  const { data, error } = await getCurrentUser();
  const fetchedTeams = data.user ? await fetchTeams(data.user?.id) : null;
  const teams = fetchedTeams ? fetchedTeams : teamsEmptyState;

  if (!data.user) {
    redirect('/login');
  }

  return (
    <main className='h-full'>
      <Sidebar teams={teams} />
      <div className='pl-[236px] flex-1 h-screen bg-page-bg'>
        <div className='px-3 h-[80px] flex justify-between items-center bg-amber-500'>
          <Searchbar />
          <UserMenu 
            user={data.user} 
            error={error} 
          />
        </div>
        <div className='h-[calc(100%-80px)] bg-cyan-500'>
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;