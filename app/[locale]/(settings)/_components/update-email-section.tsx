'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateEmail } from '@/lib/actions/auth.actions';
import { DialogTitle } from '@radix-ui/react-dialog';


export const UpdateEmailSection = () => {
  const t = useTranslations('Settings');
  const [state, formAction] = useFormState<any, any>(updateEmail, { email: '' });
  
  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction]);

  return (
    <div className='w-full flex justify-between items-center'>
      <p className='text-sm font-semibold'>
        {t('updateEmailForm.formLabel')}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='min-w-44'>
            {t('updateEmailForm.openDialogBtnLabel')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {t('updateEmailForm.dialogTitle')}
            </DialogTitle>
          </DialogHeader>
          <form action={formAction} className='flex flex-col gap-3'>
            <TextField 
              name='email' 
              label={t('updateEmailForm.textFieldLabel')} 
            />
            <Button type='submit'>
              {t('updateEmailForm.submitBtnLabel')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};