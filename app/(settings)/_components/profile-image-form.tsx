import { FileInput } from '@/components/inputs/FileInput';
import { Button } from '@/components/ui/button';


interface IProfileImageForm {
  userName: string;
  userColor: string;
};


export const ProfileImageForm = ({ userName, userColor }: IProfileImageForm) => {
  return (
    <div className='w-full md:w-96'>
      <form action="" className=''>
        <FileInput 
          name='imageUrl' 
          label='Profile photo' 
          userName={userName} 
          userColor={userColor}
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