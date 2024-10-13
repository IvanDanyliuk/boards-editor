'use client';

import Image from 'next/image';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRef } from 'react';
import { Button } from '../ui/button';


interface IFileInput {
  name: string;
  label: string;
  userName: string;
  value?: any;
  defaultValue?: any; 
  onChange?: () => void;
}

export const FileInput = ({
  name, 
  label, 
  userName,
  value, 
  defaultValue, 
  onChange
}: IFileInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const splittedUserName = userName.split(' ');
  const initials = splittedUserName.filter((item, index) => index === 0 || index === splittedUserName.length - 1).map(item => item[0].toUpperCase()).join();
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name}>
        {label}
      </Label>
      {(value || defaultValue) ? (
        <Image src={value || defaultValue} alt='preview' />
      ) : (
        <div>
          {initials}
        </div>
      )}
      <Input 
        ref={inputRef}
        id={name}
        name={name} 
        type='file'
        value={value}
        defaultValue={defaultValue} 
        onChange={onChange}
        hidden
      />
      <div className='flex gap-3'>
        <Button>Upload</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
};