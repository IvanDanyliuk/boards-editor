import { getCurrentUser } from "@/lib/actions/user.actions";
import { ProfileSettingsForm } from "../../_components/profile-settings-form";

const ProfileSettingsPage = async ({ 
  params: { id } 
}: { 
  params: {
    id: string;
  }; 
}) => {
  const user = await getCurrentUser();

  return (
    <div>
      <ProfileSettingsForm 
        name={user.data.user?.user_metadata.name} 
        company={user.data.user?.user_metadata.company} 
        industry={user.data.user?.user_metadata.industry} 
        role={user.data.user?.user_metadata.role} 
      />
    </div>
  );
};

export default ProfileSettingsPage;