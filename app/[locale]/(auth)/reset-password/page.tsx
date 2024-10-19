import { useTranslations } from 'next-intl';
import { UpdatePasswordForm } from './_components/update-password-form';


const ResetPassword = async () => {
  const t = useTranslations('Auth');
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h2 className='text-xl font-semibold'>
        {t('ResetPasswordPage.title')}
      </h2>
      <UpdatePasswordForm />
    </div>
  );
};

export default ResetPassword;