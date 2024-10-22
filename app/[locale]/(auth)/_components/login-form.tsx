'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/actions/auth.actions';
import { TextField } from '@/components/inputs/TextField';


const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  imageUrl: '',
  role: '',
  company: '',
  industry: '',
};


export const LoginForm = () => {
  const t = useTranslations('Auth');
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, any>(login, initialState);

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
      className='p-3 w-full max-w-[500px] flex flex-col justify-center items-center gap-4'
    >
      <TextField 
        name='email' 
        label={t('LoginForm.email')} 
      />
      <TextField 
        name='password' 
        label={t('LoginForm.password')} 
        type='password' 
      />
      <Button 
        type='submit' 
        variant='ghost' 
        className='w-full'
      >
        {t('LoginForm.submitBtn')}
      </Button>
    </form>
  );
};