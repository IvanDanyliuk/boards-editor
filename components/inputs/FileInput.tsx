'use client';

import { useRef, useState } from 'react';
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
  defaultValue?: any; 
}

export const FileInput = ({
  name, 
  label, 
  userName,
  userColor, 
  defaultValue, 
}: IFileInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>(defaultValue || '')

  const initials = userName ? extractFirstLetters(userName) : 'A';
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    inputRef.current?.click();
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImagesUrl = URL.createObjectURL(filesArray[0]);
      setPreviewImageUrl(newImagesUrl);
    }
  };

  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name}>
        {label}
      </Label>
      {(previewImageUrl) ? (
        <Image src={previewImageUrl} alt='preview' width={50} height={50} />
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
        onChange={handleImageUrlChange}
        className='hidden'
      />
      <Button type='button' onClick={handleClick} className='bg-slate-500'>
        Select
      </Button>
    </div>
  );
};