'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { updateTeamData } from '@/lib/actions/team.actions';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';


interface ITeamSettingsForm {
  teamName: string;
};


export const TeamSettingsForm = ({ teamName }: ITeamSettingsForm) => {
  const t = useTranslations('Settings');
  const ref = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState<any, any>(updateTeamData, {
    name: teamName
  });

  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex flex-1 flex-col gap-3'
    >
      <TextField 
        name='name' 
        label={t('teamSettingsForm.name')} 
        defaultValue={teamName} 
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