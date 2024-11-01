import { getCurrentUser, updateProfilePhoto } from '@/lib/actions/user.actions';
import { ProfileSettingsForm } from '../../_components/profile-settings-form';
import { ImageForm } from '../../_components/image-form';
import { UpdatePasswordSection } from '../../_components/update-password-section';
import { UpdateEmailSection } from '../../_components/update-email-section';
import { LanguageMenu } from '../../_components/language-menu';


const ProfileSettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className='flex flex-col md:flex-row gap-3 md:gap-8'>
      <div className='flex flex-col flex-1 gap-3'>
        <ProfileSettingsForm 
          name={user.data.user?.user_metadata.name} 
          company={user.data.user?.user_metadata.company} 
          industry={user.data.user?.user_metadata.industry} 
          role={user.data.user?.user_metadata.role} 
        />
        <UpdatePasswordSection email={user.data.user?.email!} />
        <UpdateEmailSection />
        <LanguageMenu />
      </div>
      <ImageForm 
        name={user.data.user?.user_metadata.name} 
        color={user.data.user?.user_metadata.userColor} 
        imageUrl={user.data.user?.user_metadata.imageUrl}
        inputName='profileImage'
        onImageChange={updateProfilePhoto}
      />
    </div>
  );
};

export default ProfileSettingsPage;