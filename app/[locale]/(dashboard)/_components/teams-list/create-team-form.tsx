import { FileInput } from '@/components/inputs/FileInput';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createTeam } from '@/lib/actions/team.actions';
import { CircleAlert, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';


const initialState = {
  name: '',
  teamLogo: '',
};


export const CreateTeamForm = () => {
  const [state, formAction] = useFormState<any, any>(createTeam, initialState);

  useEffect(() => {
    if(state && state.error) {
      Object.values(state.error).forEach((error: any) => toast(error.join('. '), {
        className: 'text-red-500',
        icon: <CircleAlert />
      }));
    }
  }, [state, formAction]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='w-full bg-create-btn font-light text-white text-3xl border-none'>
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a team</DialogTitle>
          
        </DialogHeader>
        <form action={formAction} className='flex flex-col gap-3'>
          <TextField name='name' label='Team name' />
          <FileInput name='teamLogo' label='Team logo' />
          <Button type='submit'>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};