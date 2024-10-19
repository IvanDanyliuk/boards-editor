'use client';

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
import { CircleAlert, CircleCheckBig } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';


export const UpdateEmailSection = () => {
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
      <p className='text-sm font-semibold'>Email</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='min-w-44'>Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update email</DialogTitle>
          </DialogHeader>
          <form action={formAction} className='flex flex-col gap-3'>
            <TextField name='email' label='Email' />
            <Button type='submit'>Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}