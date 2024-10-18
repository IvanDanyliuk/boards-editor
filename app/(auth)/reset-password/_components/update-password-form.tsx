'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';
import { updatePassword } from '@/lib/actions/auth.actions';


const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};


export const UpdatePasswordForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, any>(updatePassword, initialState);

  const handleDeclinePasswordChange = () => {
    redirect('/');
  };

  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction]);

  return (
    <form ref={ref} action={formAction} className='w-full md:w-72 flex flex-col gap-3'>
      <TextField 
        name='newPassword' 
        label='New password' 
        type='password' 
      />
      <TextField 
        name='confirmNewPassword' 
        label='Confirm new password' 
        type='password' 
      />
      <div className='flex gap-3'>
        <Button 
          type='submit' 
          className='flex-1'
        >
          OK
        </Button>
        <Button 
          type='button' 
          onClick={handleDeclinePasswordChange}
          className='flex-1'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};