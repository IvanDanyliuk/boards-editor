'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SelectField } from '@/components/inputs/SelectField';
import { useRouter, usePathname } from '@/i18n/routing';
import { LANGUAGE_PARAMS } from '@/lib/constants';
import { Language } from '@/lib/types';


export const LanguageMenu = () => {
  const t = useTranslations('Settings');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (value: Language) => {
    startTransition(() => {
      router.replace(pathname, {
        locale: value
      });
    });
  };

  return (
    <div className='flex justify-between items-center'>
      <p className='text-sm font-semibold'>
        {t('languageMenu.formLabel')}
      </p>
      <SelectField 
        name='language' 
        defaultValue={params!.locale!.toString()} 
        options={LANGUAGE_PARAMS} 
        onChange={handleLanguageChange} 
        disabled={isPending} 
        className='w-44'
      />
    </div>
  );
};