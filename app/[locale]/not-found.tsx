import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';


const NotFoundPage = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-6'>
      <div className='w-full flex flex-col justify-center items-center gap-1'>
        <p className='text-6xl text-gray-300 font-extrabold'>404</p>
        <Image 
          src='/images/not-found-placeholder.jpg' 
          alt='image' 
          width={400} 
          height={400} 
          className='my-3' 
        />
        <p className='text-2xl text-gray-400 font-bold'>
          {t('mainMessage')}
        </p>
        <p className='text-lg text-gray-400 font-normal'>
          {t('secondaryMessage')}
        </p>
      </div>
      <Link 
        href='/' 
        className='flex items-center'
      >
        <ArrowLeft className='mr-1' />
        {t('backLink')}
      </Link>
    </div>
  );
};

export default NotFoundPage;