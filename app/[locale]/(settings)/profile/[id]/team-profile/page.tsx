const TeamProfilePage = ({ 
  params: { id } 
}: { 
  params: {
    id: string;
  }; 
}) => {
  return (
    <div>
      Team{id}
    </div>
  );
};

export default TeamProfilePage;