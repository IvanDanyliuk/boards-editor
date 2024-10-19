'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { register } from '@/lib/actions/auth.actions';
import { INDUSTRIES, ROLES } from '@/lib/constants';
import { TextField } from '@/components/inputs/TextField';
import { SelectField } from '@/components/inputs/SelectField';
import { FileInput } from '@/components/inputs/FileInput';
import { useTranslations } from 'next-intl';


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


export const RegisterForm = () => {
  const t = useTranslations('Auth');
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, any>(register, initialState);

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
        name='name' 
        label={t('RegisterForm.name')} 
      />
      <TextField 
        name='email' 
        label={t('RegisterForm.email')} 
      />
      <TextField 
        name='password' 
        label={t('RegisterForm.password')} 
        type='password' 
      />
      <TextField 
        name='confirmPassword' 
        label={t('RegisterForm.confirmPassword')} 
        type='password' 
      />
      <FileInput 
        name='imageUrl' 
        label={t('RegisterForm.imageUrl')} 
      />
      <TextField 
        name='company' 
        label={t('RegisterForm.company')} 
      />
      <SelectField 
        name='industry'
        label={t('RegisterForm.industry')}
        placeholder='Select an industry'
        options={INDUSTRIES}
      />
      <SelectField 
        name='role'
        label={t('RegisterForm.role')}
        placeholder='Select a role'
        options={ROLES}
      />
      <Button 
        type='submit' 
        variant='ghost' 
        className='w-full'
      >
        {t('RegisterForm.submitBtn')}
      </Button>
    </form>
  );
};