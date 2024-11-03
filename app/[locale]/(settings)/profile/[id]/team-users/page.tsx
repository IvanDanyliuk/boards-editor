import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { fetchCurrentTeam, fetchTeams } from '@/lib/actions/team.actions';
import { TeamMembersTable } from '../../../_components/team-members-table';


const TeamUsersPage = async ({ params: { id } }: { 
  params: { 
    id: string 
  } 
}) => {
  const t = await getTranslations('Settings');

  const currentTeamId = cookies().get('currentTeam');
  const { data, error } = currentTeamId && currentTeamId.value ? 
    await fetchCurrentTeam(currentTeamId?.value!) : 
    await fetchTeams(id);

  if(error) {
    
  }

  const currentTeam = Array.isArray(data) ? data[0] : data;

  return (
    <div>
      <TeamMembersTable users={currentTeam?.memberIds!} />
    </div>
  );
};

export default TeamUsersPage;