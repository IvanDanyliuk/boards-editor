import Link from 'next/link';
import { LoginForm } from '../_components/login-form';
import { useTranslations } from 'next-intl';


const LoginPage = () => {
  const t = useTranslations('Auth');

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-5 bg-white'>
      <h2 className='text-xl font-semibold'>
        {t('LoginPage.title')}
      </h2>
      <LoginForm />
      <p className='text-center'>
        {t("LoginPage.or")}
      </p>
      <div>
        Auth Providers will be here...
      </div>
      <div className='flex gap-1'>
        <p>
          {t('LoginPage.noAccountText')}
        </p> 
        <Link href='/register' className='font-semibold'>
          {t('LoginPage.signUpLinkLabel')}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;