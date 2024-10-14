'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { extractFirstLetters } from '@/lib/helpers';


interface IFileInput {
  name: string;
  label: string;
  userName?: string;
  userColor?: string;
  value?: any;
  defaultValue?: any; 
  onChange?: () => void;
}

export const FileInput = ({
  name, 
  label, 
  userName,
  userColor, 
  value, 
  defaultValue, 
  onChange
}: IFileInput) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const initials = userName ? extractFirstLetters(userName) : 'A';
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    inputRef.current?.click();
  };

  console.log('USER DATA', {userName, userColor})

  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name}>
        {label}
      </Label>
      {(value || defaultValue) ? (
        <Image src={value || defaultValue} alt='preview' />
      ) : userName && userColor ? (
        <div 
          className='w-52 h-52 flex justify-center items-center rounded-md text-6xl text-white font-semibold' 
          style={{ background: userColor }}
        >
          {initials}
        </div>
      ) : null}
      <Input 
        ref={inputRef}
        id={name}
        name={name} 
        type='file'
        value={value}
        defaultValue={defaultValue} 
        onChange={onChange}
        className='hidden'
      />
      <Button onClick={handleClick} className='bg-slate-500'>
        Select
      </Button>
    </div>
  );
};