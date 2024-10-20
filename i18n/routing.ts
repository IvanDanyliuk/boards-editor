import {defineRouting} from 'next-intl/routing';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';


export const routing = defineRouting({
  locales: ['en', 'pl', 'ua'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      pl: '/pathnames',
      ua: '/pathnames'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
 
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);