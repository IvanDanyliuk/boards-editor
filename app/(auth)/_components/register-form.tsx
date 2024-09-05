'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { register } from '@/lib/actions/auth.actions';
import { INDUSTRIES, ROLES } from '@/lib/constants';


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
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(register, initialState);

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
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input id='confirmPassword' name='confirmPassword' type='password' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='imageUrl'>Profile Image</Label>
        <Input id='imageUrl' name='imageUrl' type='file' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='company'>Company</Label>
        <Input id='company' name='company' />
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='industry'>Industry</Label>
        <Select name='industry'>
          <SelectTrigger>
            <SelectValue placeholder='Select an industry' />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map(industry => (
              <SelectItem key={crypto.randomUUID()} value={industry.id}>
                {industry.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='role'>Role</Label>
        <Select name='role'>
          <SelectTrigger>
            <SelectValue placeholder='Select a role' />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map(role => (
              <SelectItem key={crypto.randomUUID()} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type='submit' variant='ghost' className='w-full'>Submit</Button>
    </form>
  );
};