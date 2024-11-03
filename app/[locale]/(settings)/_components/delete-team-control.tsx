'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteTeam } from '@/lib/actions/team.actions';
import { useTranslations } from 'next-intl';
import { useState } from 'react';


interface IDeleteTeamControl {
  teamId: string;
  userId: string;
};


export const DeleteTeamControl = ({ teamId, userId }: IDeleteTeamControl) => {
  const t = useTranslations('Settings');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleTeamDelete = async () => {
    await deleteTeam(teamId, userId);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger 
        onClick={handleDialogOpen}
        className='w-36 h-10 block border border-red-500 bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-md'
      >
        {t('deleteTeamControl.triggerBtn')}
      </DialogTrigger>
      <DialogContent className='border border-blue-700'>
        <DialogHeader>
          <DialogTitle>
            {t('deleteTeamControl.confirmationMessage1')}
          </DialogTitle>
          <DialogDescription>
            {t('deleteTeamControl.confirmationMessage2')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-center items-center gap-3'>
          <Button 
            type='button'
            onClick={handleTeamDelete} 
            className='w-20 border-red-500 bg-white border hover:bg-red-500 text-red-500 hover:text-white'
          >
            {t('deleteTeamControl.submitBtn')}
          </Button>
          <Button 
            onClick={handleDialogOpen} 
            className='w-20 h-full border border-black bg-white hover:bg-black text-black hover:text-white rounded-md'
          >
            {t('deleteTeamControl.cancelBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};