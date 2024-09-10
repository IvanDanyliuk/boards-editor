const TeamSettingsPage = ({ 
  params: { id } 
}: { 
  params: {
    id: string;
  }; 
}) => {
  return (
    <div>
      {id}
    </div>
  );
};

export default TeamSettingsPage;