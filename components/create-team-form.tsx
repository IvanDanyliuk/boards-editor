'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { FileInput } from '@/components/inputs/FileInput';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';
import { createTeam } from '@/lib/actions/team.actions';



const initialState = {
  name: '',
  teamLogo: '',
};


export const CreateTeamForm = () => {
  const [state, formAction] = useFormState<any, any>(createTeam, initialState);

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
      action={formAction} 
      className='flex flex-col gap-3'
    >
      <TextField 
        name='name' 
        label='Team name' 
      />
      <FileInput 
        name='teamLogo' 
        label='Team logo' 
      />
      <Button type='submit'>
        Create
      </Button>
    </form>
  );
};