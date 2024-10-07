import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';


const NotFoundPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-6'>
      <div className='w-full flex flex-col justify-center items-center gap-1'>
        <p className='text-6xl text-gray-300 font-extrabold'>404</p>
        <Image src='/images/not-found-placeholder.jpg' alt='image' width={400} height={400} className='my-3' />
        <p className='text-2xl text-gray-400 font-bold'>Page not found</p>
        <p className='text-lg text-gray-400 font-normal'>Sorry, the page you are looking for cannot be found</p>
      </div>
      <Link href='/' className='flex items-center'>
        <ArrowLeft className='mr-1' />
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;