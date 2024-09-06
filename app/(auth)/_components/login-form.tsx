'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/auth.actions";
import { CircleAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";


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
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach(error => toast(error.join('. '), {
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
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </div>
      <Button type='submit' variant='ghost' className='w-full'>Submit</Button>
    </form>
  );
};