'use client';

import { FileInput } from "@/components/inputs/FileInput";
import { TextField } from "@/components/inputs/TextField";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/lib/actions/auth.actions";
import { CircleAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};


export const UpdatePasswordForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, any>(updatePassword, initialState);

  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction]);

  return (
    <form action={formAction} className='flex flex-col gap-3'>
      <TextField name='currentPassword' label='Current password' />
      <TextField name='newPassword' label='New password' />
      <TextField name='confirmNewPassword' label='Confirm new password' />
      <Button type='submit'>OK</Button>
    </form>
  );
};