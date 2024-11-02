'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';
import { updateTeamData } from '@/lib/actions/team.actions';


interface ITeamSettingsForm {
  teamName: string;
  teamId: string;
};


export const TeamSettingsForm = ({ teamName, teamId }: ITeamSettingsForm) => {
  const t = useTranslations('Settings');
  const ref = useRef<HTMLFormElement>(null);

  const [currentTeamName, setCurrentTeamName] = useState<string>(teamName);
  const [state, formAction] = useFormState<any, any>(updateTeamData.bind(null, { teamId }), {
    name: ''
  });

  const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTeamName(e.target.value);
  };

  useEffect(() => {
    setCurrentTeamName(teamName);
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction, teamName]);

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex flex-1 flex-col gap-3'
    >
      <TextField 
        name='name' 
        label={t('teamSettingsForm.name')} 
        value={currentTeamName}
        onChange={handleTeamNameChange}
      />
      <Button 
        type='submit' 
        className='w-full md:w-52'
      >
        {t('teamSettingsForm.submitBtnLabel')}
      </Button>
    </form>
  );
};