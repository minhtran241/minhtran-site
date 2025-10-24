import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const Loading = ({ fullPage = true }) => {
  return (
    <div
      className={`grid w-full place-items-center overflow-x-scroll lg:overflow-visible ${
        fullPage ? 'h-screen' : 'p-6'
      }`}
    >
      <div className='flex flex-col items-center gap-4'>
        <div className='relative'>
          {/* Outer ring */}
          <div className='border-primary/20 absolute inset-0 animate-pulse rounded-full border-4'></div>

          {/* Spinning border */}
          <div className='border-t-primary border-r-primary h-16 w-16 animate-spin rounded-full border-4 border-transparent'></div>

          {/* Center icon */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <FontAwesomeIcon icon='fa-duotone fa-solid fa-atom-simple text-primary' />
          </div>
        </div>

        {/* Loading text with dots animation */}
        <div className='text-base-content/70 flex items-center gap-1 text-sm font-medium'>
          <span>Loading</span>
          <span className='loading loading-dots loading-md text-primary'></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
