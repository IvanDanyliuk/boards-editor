'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserData } from '@/lib/actions/user.actions';
import { INDUSTRIES, ROLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/inputs/TextField';
import { SelectField } from '@/components/inputs/SelectField';


interface IProfileSettingsForm {
  name: string;
  company: string;
  industry: string;
  role: string;
};


export const ProfileSettingsForm = ({
  name,
  company,
  industry,
  role
}: IProfileSettingsForm) => {
  const t = useTranslations('Settings');
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, any>(updateUserData, {
    name,
    company,
    industry,
    role
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
        label={t('profileSettingsForm.name')} 
        defaultValue={name} 
      />
      <TextField 
        name='company' 
        label={t('profileSettingsForm.company')} 
        defaultValue={company} 
      />
      <SelectField 
        name='industry' 
        label={t('profileSettingsForm.industry')} 
        defaultValue={industry} 
        options={INDUSTRIES} 
      />
      <SelectField 
        name='role' 
        label={t('profileSettingsForm.role')} 
        defaultValue={role} 
        options={ROLES} 
      />
      <Button 
        type='submit' 
        className='w-full md:w-52'
      >
        {t('profileSettingsForm.submitBtnLabel')}
      </Button>
    </form>
  );
};