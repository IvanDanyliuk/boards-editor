'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { CircleAlert } from 'lucide-react';
import { FileInput } from '@/components/inputs/FileInput';
import { Button } from '@/components/ui/button';
import { removeProfilePhoto, updateProfilePhoto } from '@/lib/actions/user.actions';
import { extractFirstLetters } from '@/lib/helpers';
import { Label } from '@/components/ui/label';



interface IImageForm {
  name: string;
  color: string;
  imageUrl: string;
  label?: string;
  inputName: string;
  onImageChange: (prevState: any, formData: FormData) => void;
};


export const ImageForm = ({ 
  name, 
  color, 
  imageUrl, 
  inputName, 
  onImageChange
}: IImageForm) => {
  const t = useTranslations('Settings');
  const [state, formAction] = useFormState<any, any>(onImageChange, { imageUrl: '' });
  const initials = name ? extractFirstLetters(name) : 'A';

  const handleRemoveProfilePhoto = async () => {
    if(imageUrl) {
      await removeProfilePhoto(imageUrl);
    };
  }

  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction]);

  return (
    <div className='w-full md:w-96 flex flex-col gap-1.5'>
      <Label htmlFor='imageUrl'>
        {t('profileImageForm.formLabel')}
      </Label>
      {imageUrl ? (
        <div className='relative w-[300px] h-[300px] overflow-hidden rounded-md'>
          <Image src={imageUrl} alt={name} fill className='object-fill' />
        </div>
      ) : (
        <div 
          className='w-52 h-52 flex justify-center items-center rounded-md text-6xl text-white font-semibold' 
          style={{ background: color }}
        >
          {initials}
        </div>
      )}
      <form action={formAction} className=''>
        <FileInput name={inputName} />
        <div className='mt-3 w-full flex gap-3'>
          <Button type='submit' className='flex-1'>
            {t('profileImageForm.uploadBtnLabel')}
          </Button>
          <Button type='button' onClick={handleRemoveProfilePhoto} className='flex-1'>
            {t('profileImageForm.removeBtnLabel')}
          </Button>
        </div>
      </form>
    </div>
  );
};