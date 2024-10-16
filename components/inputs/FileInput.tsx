'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { extractFirstLetters } from '@/lib/helpers';
import { X } from 'lucide-react';


interface IFileInput {
  name: string;
  label?: string;
  userName?: string;
  userColor?: string;
  defaultValue?: any; 
}

export const FileInput = ({
  name, 
  label, 
  defaultValue, 
}: IFileInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>(defaultValue || '');
  
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

  const handleClearSelectedFile = () => {
    setPreviewImageUrl('');
  };

  return (
    <div className='grid w-full items-center gap-1.5'>
      {label && (
        <Label htmlFor={name}>
        {label}
      </Label>
      )}
      {(previewImageUrl) && (
        <div className='relative w-[50px] h-[50px]'>
          <Image 
            src={previewImageUrl} 
            alt='preview' 
            width={50} 
            height={50} 
          />
          <Button 
            type='button' 
            onClick={handleClearSelectedFile}
            className='absolute -top-[10px] -right-[10px] m-0 p-0 w-[20px] h-[20px] flex justify-center items-center rounded-full bg-gray-400 text-white'
          >
            <X className='w-[14px] h-[14px]' />
          </Button>
        </div>
      )}
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