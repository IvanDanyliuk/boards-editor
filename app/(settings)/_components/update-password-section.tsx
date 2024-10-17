'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UpdatePasswordForm } from './update-password-form';


export const UpdatePasswordSection = () => {
  return (
    <div className='w-full flex justify-between items-center'>
      <p>Password</p>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <UpdatePasswordForm />
      </DialogContent>
    </Dialog>
    </div>
  );
};