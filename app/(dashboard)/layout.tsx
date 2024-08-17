import { Sidebar } from './_components/sidebar';
import { TeamNavbar } from './_components/team-navbar';

interface ILayout {
  children: React.ReactNode;
}

const layout = ({ children }: ILayout) => {
  return (
    <main className='w-full h-full'>
      <Sidebar />
      <div className='pl-[70px] h-full flex bg-gray-100'>
        <TeamNavbar />
        <div className='h-full'>
          <div className='h-full'>
            Search bar & Action Buttons
          </div>
          <div className='h-full flex-1'>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default layout;