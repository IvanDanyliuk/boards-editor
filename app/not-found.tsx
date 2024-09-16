import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


const NotFoundPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-3'>
      <p className='text-xl font-semibold'>Page not found</p>
      <Link href='/' className='flex items-center'>
        <ArrowLeft className='mr-1' />
        Go back
      </Link>
    </div>
  );
};

export default NotFoundPage;