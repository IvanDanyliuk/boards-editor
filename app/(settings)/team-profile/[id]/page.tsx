const TeamProfilePage = ({ 
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

export default TeamProfilePage;