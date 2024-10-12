'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserData } from "@/lib/actions/user.actions";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { INDUSTRIES, ROLES } from '@/lib/constants';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TextField } from "@/components/inputs/TextField";


interface IProfileSettingsForm {
  name: string;
  company: string;
  industry: string;
  role: string;
}

const emptyState = {
  name: '',
  company: '',
  industry: '',
  role: ''
}


export const ProfileSettingsForm = ({
  name,
  company,
  industry,
  role
}: IProfileSettingsForm) => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, any>(updateUserData, {
    name,
    company,
    industry,
    role
  });

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex flex-col gap-3'
    >
      {/* <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input name='name' defaultValue={name} />
      </div> */}
      <TextField name='name' label='Name' defaultValue={name} />
      {/* <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='company'>Company</Label>
        <Input name='company' defaultValue={company} />
      </div> */}
      <TextField name='company' label='Company' defaultValue={company} />
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='industry'>Industry</Label>
        <Select name='industry' defaultValue={industry}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map(industryItem => (
              <SelectItem key={crypto.randomUUID()} value={industryItem.id}>
                {industryItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='role'>Role</Label>
        <Select name='role' defaultValue={role}>
          <SelectTrigger>
            <SelectValue />
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
      <Button type='submit' className='w-full md:w-52'>Submit</Button>
    </form>
  );
};