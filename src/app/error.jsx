'use client';

import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const Error = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <p className='text-primary text-6xl font-black tracking-wider md:text-7xl lg:text-9xl'>
        Oops!
      </p>
      <p className='mt-4 text-2xl font-bold tracking-wider md:text-3xl lg:text-5xl'>
        Something went wrong.
      </p>
      <p className='mt-4 border-b-2 pb-4 text-center'>
        Sorry, the page you are looking for could not be found.
      </p>
      <Link
        href='/'
        className='btn btn-active btn-primary mt-4'
        title='Return Home'
        role='button'
      >
        <FontAwesomeIcon icon='fa-duotone fa-arrow-left' />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default Error;
