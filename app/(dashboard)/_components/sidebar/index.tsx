import { CreateTeamButton } from '../create-team-button';

export const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 w-[70px] h-full flex flex-col items-center bg-sidebar-primary'>
      <ul className='py-3 flex flex-col items-center gap-y-3'>
        <li className='w-[40px] h-[40px] rounded-md text-center bg-lime-400'>1</li>
        <li className='w-[40px] h-[40px] rounded-md text-center bg-lime-400'>2</li>
        <li className='w-[40px] h-[40px] rounded-md text-center bg-lime-400'>3</li>
      </ul>
      <CreateTeamButton />
    </div>
  );
};