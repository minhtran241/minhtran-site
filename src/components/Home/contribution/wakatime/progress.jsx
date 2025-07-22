import { cn } from '@/common/libs/cn';

const Progress = ({ data, className }) => {
  const { name, percent = 0 } = data;

  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='w-28 text-sm'>{name}</div>
      <progress
        className={cn(className, 'progress progress-primary flex-1')}
        value={percent}
        max='100'
      ></progress>
      <div className='w-8 text-right text-sm'>{percent.toFixed(0)}%</div>
    </div>
  );
};

export default Progress;
