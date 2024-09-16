'use client';

import { ThreeDots } from 'react-loader-spinner';


export const Loader = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <ThreeDots 
        visible={true}
        height="80"
        width="80"
        color='#256DDA'
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};