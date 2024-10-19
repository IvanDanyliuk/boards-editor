import Link from 'next/link';
import { RegisterForm } from '../_components/register-form';
import { useTranslations } from 'next-intl';


const RegisterPage = () => {
  const t = useTranslations('Auth');

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-5 bg-white'>
      <h2 className='text-xl font-semibold'>
        {t('RegisterPage.title')}
      </h2>
      <RegisterForm />
      <p className='text-center'>
        {t('RegisterPage.or')}
      </p>
      <div>
        Auth Providers will be here...
      </div>
      <div className='flex gap-1'>
        <p>
          {t('RegisterPage.accountPresentText')}  
        </p> 
        <Link href='/login' className='font-semibold'>
          {t('RegisterPage.signInLinkLabel')}
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;