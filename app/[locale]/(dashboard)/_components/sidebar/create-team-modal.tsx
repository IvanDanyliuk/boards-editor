import { CreateTeamForm } from '@/components/create-team-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


export const CreateTeamModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant='outline' 
          className='w-10 h-10 bg-create-btn font-light text-white text-3xl border-none'
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a team</DialogTitle>
        </DialogHeader>
        <CreateTeamForm />
      </DialogContent>
    </Dialog>
  );
};