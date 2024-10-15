'use client';

import { useFormState } from 'react-dom';
import { FileInput } from '@/components/inputs/FileInput';
import { Button } from '@/components/ui/button';
import { updateProfilePhoto } from '@/lib/actions/user.actions';


interface IProfileImageForm {
  userName: string;
  userColor: string;
  userImageUrl: string;
};


export const ProfileImageForm = ({ userName, userColor, userImageUrl }: IProfileImageForm) => {
  const [state, formAction] = useFormState<any, any>(updateProfilePhoto, { imageUrl: userImageUrl });

  return (
    <div className='w-full md:w-96'>
      <form action={formAction} className=''>
        <FileInput 
          name='profileImage' 
          label='Profile photo' 
          userName={userName} 
          userColor={userColor}
          // defaultValue={userImageUrl}
        />
        <div className='mt-3 w-full flex gap-3'>
          <Button type='submit' className='flex-1'>
            Upload
          </Button>
          <Button type='button' className='flex-1'>
            Remove
          </Button>
        </div>
      </form>
    </div>
  );
};