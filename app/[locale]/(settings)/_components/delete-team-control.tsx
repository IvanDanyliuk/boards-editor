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
import { useTranslations } from 'next-intl';


interface IDeleteTeamControl {
  teamId: string;
  userId: string;
};


export const DeleteTeamControl = ({ teamId, userId }: IDeleteTeamControl) => {
  const t = useTranslations('Settings');

  return (
    <Dialog>
      <DialogTrigger>
        <Button type='button' className='border border-red-500'>Delete team</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('deleteTeamControl.confirmationMessage1')}</DialogTitle>
          <DialogDescription>
            {t('deleteTeamControl.confirmationMessage2')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-center items-center'>
          <Button type='button'>
            {t('deleteTeamControl.submitBtn')}
          </Button>
          <Button type='button'>
            {t('deleteTeamControl.cancelBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};