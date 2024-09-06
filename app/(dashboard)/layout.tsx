import { getCurrentUser } from "@/lib/actions/auth.actions";
import { Sidebar } from "./_components/sidebar";
import { UserMenu } from "./_components/user-menu";
import { toast } from "sonner";
import { redirect } from "next/navigation";

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
        <div className='h-[80px] bg-amber-500'>
          <div>Search</div>
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