  'use client';

import { CircleAlert, CircleCheckBig } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { sendPasswordVerificationEmail } from '@/lib/actions/auth.actions';


interface IUpdatePasswordSection {
  email: string;
}

export const UpdatePasswordSection = ({ email }: IUpdatePasswordSection) => {
  const handleSendVerificationLink = async () => {
    const verificationStatusMessage = await sendPasswordVerificationEmail(email);

    if(verificationStatusMessage.error) {
      toast(verificationStatusMessage.error, {
        className: 'text-red-500',
        icon: <CircleAlert />
      });
    }

    if(verificationStatusMessage.message) {
      toast(verificationStatusMessage.message, {
        className: 'text-green-500',
        icon: <CircleCheckBig />
      });
    }
  }
  return (
    <div className='w-full flex justify-between items-center'>
      <p className='text-sm font-semibold'>Password</p>
      <Button 
        type='button' 
        onClick={handleSendVerificationLink}
        className='min-w-44'
      >
        Update
      </Button>
    </div>
  );
};