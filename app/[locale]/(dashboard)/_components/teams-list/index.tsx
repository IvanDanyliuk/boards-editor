import { CreateTeamForm } from './create-team-form';

export const TeamsList = () => {
  return (
    <div className='w-[50px] h-full px-1 py-3 flex flex-col gap-1 bg-secondary-bg'>
      <CreateTeamForm />
      <ul>
        List
      </ul>
    </div>
  );
};