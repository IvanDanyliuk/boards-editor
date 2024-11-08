import { useTranslations } from "next-intl";
import { CreateTeamForm } from "../../../components/create-team-form";

const CreateTeamPage = () => {
  const t = useTranslations('CreateTeam');
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-6'>
      <h1 className='text-lg font-semibold'>
        {t('pageTitle')}
      </h1>
      <CreateTeamForm />
    </div>
  );
};

export default CreateTeamPage;