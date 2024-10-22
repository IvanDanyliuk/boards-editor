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
import { Plus } from 'lucide-react';


export const CreateTeamForm = () => {
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
        <form action="">
          <TextField name='name' label='Team name' />
          <FileInput name='teamLogo' label='Team logo' />
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};