import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchCurrentTeam, fetchTeams, setCurrentTeam } from '@/lib/actions/team.actions';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import { TeamSettingsForm } from '../../../_components/team-settings-form';
import { setCookie } from 'cookies-next';


const TeamProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const t = await getTranslations('Settings');

  const currentTeamId = cookies().get('currentTeam');

  if(!currentTeamId) {
    const teams = await fetchTeams(id);
    if(teams.data && teams.data.length > 0) {
      setCookie('currentTeam', teams.data[0].id);
    } else {
      redirect('/create-team');
    }
  }

  const currentTeam = currentTeamId ? 
    await fetchCurrentTeam(currentTeamId.value) : 
    null;

  if(!currentTeam) {
    redirect('/create-team');
  }

  return (
    <div>
      <h1 className='py-3 text-lg font-semibold'>
        {t('teamProfile.title')}
      </h1>
      <Separator />
      <div className='pt-3 flex flex-col md:flex-row gap-3 md:gap-8'>
        <div className='flex flex-col flex-1 gap-3'>
          <TeamSettingsForm teamName={currentTeam.data!.name!} />
        </div>
      </div>
    </div>
  );
};

export default TeamProfilePage;