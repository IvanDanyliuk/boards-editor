import { Sidebar } from "./_components/sidebar";
import { UserMenu } from "./_components/user-menu";

interface IDashboardLayout  {
  children: React.ReactNode;
};


const DashboardLayout = ({ children }: IDashboardLayout) => {
  return (
    <main className='h-full'>
      <Sidebar />
      <div className='pl-[230px] flex-1 h-screen bg-page-bg'>
        <div className='h-[80px] bg-amber-500'>
          <div>Search</div>
          <UserMenu />
        </div>
        <div className='h-[calc(100%-80px)] bg-cyan-500'>
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;