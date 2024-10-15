import { getCurrentUser } from "@/lib/actions/user.actions";
import { ProfileSettingsForm } from "../../_components/profile-settings-form";
import { ProfileImageForm } from "../../_components/profile-image-form";


const ProfileSettingsPage = async ({ 
  params: { id } 
}: { 
  params: {
    id: string;
  }; 
}) => {
  const user = await getCurrentUser();

  return (
    <div className='flex flex-col md:flex-row gap-3 md:gap-8'>
      <ProfileSettingsForm 
        name={user.data.user?.user_metadata.name} 
        company={user.data.user?.user_metadata.company} 
        industry={user.data.user?.user_metadata.industry} 
        role={user.data.user?.user_metadata.role} 
      />
      <ProfileImageForm 
        userName={user.data.user?.user_metadata.name} 
        userColor={user.data.user?.user_metadata.userColor} 
        userImageUrl={user.data.user?.user_metadata.imageUrl}
      />
    </div>
  );
};

export default ProfileSettingsPage;