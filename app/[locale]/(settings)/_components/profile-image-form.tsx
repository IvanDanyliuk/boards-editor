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



interface IProfileImageForm {
  userName: string;
  userColor: string;
  userImageUrl: string;
};


export const ProfileImageForm = ({ 
  userName, 
  userColor, 
  userImageUrl 
}: IProfileImageForm) => {
  const t = useTranslations('Settings');
  const [state, formAction] = useFormState<any, any>(updateProfilePhoto, { imageUrl: '' });
  const initials = userName ? extractFirstLetters(userName) : 'A';

  const handleRemoveProfilePhoto = async () => {
    if(userImageUrl) {
      await removeProfilePhoto(userImageUrl);
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
      {userImageUrl ? (
        <div className='relative w-[300px] h-[300px] overflow-hidden rounded-md'>
          <Image src={userImageUrl} alt={userName} fill className='object-fill' />
        </div>
      ) : (
        <div 
          className='w-52 h-52 flex justify-center items-center rounded-md text-6xl text-white font-semibold' 
          style={{ background: userColor }}
        >
          {initials}
        </div>
      )}
      <form action={formAction} className=''>
        <FileInput name='profileImage' />
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