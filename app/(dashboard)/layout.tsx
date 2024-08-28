import { Sidebar } from "./_components/sidebar";

interface IDashboardLayout  {
  children: React.ReactNode;
};


const DashboardLayout = ({ children }: IDashboardLayout) => {
  return (
    <main className='h-full'>
      <Sidebar />
      <div className='pl-[220px] flex-1 h-screen bg-main-bg'>
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;