'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
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
        label='Name' 
        defaultValue={name} 
      />
      <TextField 
        name='company' 
        label='Company' 
        defaultValue={company} 
      />
      <SelectField 
        name='industry' 
        label='Industry' 
        defaultValue={industry} 
        options={INDUSTRIES} 
      />
      <SelectField 
        name='role' 
        label='Role' 
        defaultValue={role} 
        options={ROLES} 
      />
      <Button 
        type='submit' 
        className='w-full md:w-52'
      >
        Submit
      </Button>
    </form>
  );
};