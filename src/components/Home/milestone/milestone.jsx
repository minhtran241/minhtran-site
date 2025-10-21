import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Image from 'next/image';

// Helper function to format date
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

// Helper function to calculate exact duration
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Adjust for negative months
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const yearStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
  const monthStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';

  return [yearStr, monthStr].filter(Boolean).join(' ');
};

// Helper function to split description into paragraphs
const getParagraphs = (description) =>
  description.split('#').filter((p) => p.trim().length > 0);

const Milestone = ({ milestone }) => {
  if (!milestone) return null;

  const startTimeStr = formatDate(milestone.start_date);
  const endTimeStr = milestone.current
    ? 'Present'
    : formatDate(milestone.end_date);

  const durationStr = milestone.current
    ? ''
    : calculateDuration(milestone.start_date, milestone.end_date);

  const timeStr = `${startTimeStr} - ${endTimeStr}`;
  const paragraphs = getParagraphs(milestone.description);

  return (
    <div className='p-3'>
      <Link
        href={milestone.link}
        target='_blank'
        className='group/link flex flex-col items-start gap-4 md:flex-row'
      >
        {/* Company Avatar */}
        {milestone.logo && (
          <div className='flex-shrink-0'>
            <div className='avatar'>
              <div className='ring-base-300/50 ring-offset-base-100 group-hover/link:ring-primary/30 h-12 w-12 rounded-lg ring-1 ring-offset-1 transition-all'>
                <Image
                  src={milestone.logo}
                  alt={`${milestone.title} logo`}
                  loading='lazy'
                  width={48}
                  height={48}
                  className='object-cover'
                  placeholder='blur'
                  blurDataURL={milestone.base64}
                />
              </div>
            </div>
          </div>
        )}

        {/* Milestone Content */}
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          {/* Date */}
          <div className='flex flex-wrap items-center gap-1.5'>
            <div className='badge badge-primary'>
              <FontAwesomeIcon
                icon='fa-solid fa-calendar'
                className='mr-1 h-2.5 w-2.5'
              />
              {milestone.current ? 'Current' : 'Past'}
            </div>
            <time className='text-primary text-xs font-semibold'>
              {milestone.current ? `${timeStr}` : `${timeStr} · ${durationStr}`}
            </time>
          </div>

          {/* Title & Link */}
          <div className='space-y-0.5'>
            <h1 className='group-hover/link:text-primary flex items-center gap-1.5 text-base font-bold transition-colors'>
              {milestone.title}
              <FontAwesomeIcon
                icon='fa-solid fa-external-link'
                className='opacity-0 transition-opacity group-hover/link:opacity-100'
              />
            </h1>
            <p className='text-sm'>
              {milestone.sub_title}{' '}
              {milestone.employment_type && (
                <span className='text-primary'>
                  · {milestone.employment_type}
                </span>
              )}
            </p>
          </div>

          {/* Location */}
          <div className='flex items-center gap-1.5'>
            <FontAwesomeIcon
              icon='fa-solid fa-map-marker-alt'
              className='text-primary'
            />
            <span>
              {milestone.location}{' '}
              {milestone.location_type && (
                <span className='text-primary'>
                  · {milestone.location_type}
                </span>
              )}
            </span>
          </div>

          {/* Grade */}
          {milestone.grade && (
            <div className='flex items-center gap-2'>
              <div className='badge badge-outline badge-secondary'>
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='mr-1 h-2.5 w-2.5'
                />
                Grade: {milestone.grade}
              </div>
            </div>
          )}

          {/* Collapsible Description */}
          {paragraphs.length > 0 && (
            <details className='group/details mt-1'>
              <summary className='text-primary hover:text-primary-focus cursor-pointer font-semibold transition-colors'>
                <span className='inline-flex items-center gap-1'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-chevron-right'
                    className='transition-transform group-open/details:rotate-90'
                  />
                  Details ({paragraphs.length})
                </span>
              </summary>
              <div className='mt-2 space-y-2'>
                {paragraphs.map((p, index) => (
                  <p key={index} className='text-sm leading-relaxed'>
                    · {p.trim()}
                  </p>
                ))}
              </div>
            </details>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Milestone;
