const SkeletonLoader = ({ variant = 'card', count = 1, className = '' }) => {
  const variants = {
    card: (
      <div className={`card border-base-300 animate-pulse border ${className}`}>
        <div className='card-body gap-4'>
          <div className='bg-base-300 h-6 w-3/4 rounded'></div>
          <div className='bg-base-300 h-4 w-full rounded'></div>
          <div className='bg-base-300 h-4 w-5/6 rounded'></div>
          <div className='flex gap-2'>
            <div className='bg-base-300 h-8 w-20 rounded'></div>
            <div className='bg-base-300 h-8 w-20 rounded'></div>
          </div>
        </div>
      </div>
    ),
    list: (
      <div className={`animate-pulse space-y-3 ${className}`}>
        <div className='bg-base-300 h-4 w-full rounded'></div>
        <div className='bg-base-300 h-4 w-5/6 rounded'></div>
        <div className='bg-base-300 h-4 w-4/6 rounded'></div>
      </div>
    ),
    post: (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className='bg-base-300 h-48 w-full rounded-lg'></div>
        <div className='bg-base-300 h-8 w-3/4 rounded'></div>
        <div className='space-y-2'>
          <div className='bg-base-300 h-4 w-full rounded'></div>
          <div className='bg-base-300 h-4 w-full rounded'></div>
          <div className='bg-base-300 h-4 w-2/3 rounded'></div>
        </div>
      </div>
    ),
    text: (
      <div
        className={`bg-base-300 h-4 w-full animate-pulse rounded ${className}`}
      ></div>
    ),
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{variants[variant] || variants.card}</div>
      ))}
    </>
  );
};

export default SkeletonLoader;
