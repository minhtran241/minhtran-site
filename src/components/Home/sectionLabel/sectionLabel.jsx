const SectionLabel = ({ title, description, icon }) => {
  return (
    <div className='mb-4 max-w-xl'>
      <div className='flex flex-col gap-4'>
        <h1 className='flex items-center gap-3 text-lg font-bold md:text-xl lg:text-2xl'>
          {icon && <span className='text-primary'>{icon}</span>}
          <span>{title}</span>
        </h1>
        {description && <p className='text-sm lg:text-base'>{description}</p>}
      </div>
    </div>
  );
};

export default SectionLabel;
