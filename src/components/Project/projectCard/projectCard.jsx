import Image from 'next/image';
import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ProjectCard = ({ project }) => {
  return (
    <div className='group border-base-300 bg-base-100 hover:border-primary/30 hover:shadow-primary/10 flex h-full flex-col overflow-hidden rounded-xl border shadow-md hover:shadow-xl'>
      {/* Project Image */}
      {project.thumbnail && (
        <div className='from-base-200 to-base-300 relative h-48 w-full overflow-hidden bg-linear-to-b'>
          <Image
            src={`/projects/${project.thumbnail}`}
            alt={project.name}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
            placeholder='blur'
            blurDataURL={project.base64}
            loading='lazy'
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </div>
      )}

      {/* Content */}
      <div className='flex flex-1 flex-col p-5'>
        {/* Title with Year Badge */}
        <div className='mb-4 flex items-start justify-between gap-3'>
          <h3 className='text-base-content group-hover:text-primary flex-1 text-lg leading-snug font-bold'>
            {project.name}
          </h3>
          {project?.year && (
            <span className='badge badge-sm badge-outline badge-primary'>
              {project.year}
            </span>
          )}
        </div>

        {/* Tech Stack Badges */}
        {project?.tech && (
          <div className='mb-4 flex flex-wrap gap-2'>
            {project.tech.split(',').map((tech, index) => (
              <span
                key={index}
                className='badge badge-sm badge-soft badge-primary'
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className='mb-5 flex-1 text-sm leading-relaxed'>
          {project?.description}
        </p>

        {/* Divider */}
        <div className='from-base-200 via-base-200 mb-4 h-px bg-linear-to-r to-transparent' />

        {/* Action Buttons */}
        <div className='flex gap-3'>
          {project?.code && (
            <Link
              href={project.code}
              target='_blank'
              rel='noopener noreferrer'
              className='border-primary/40 bg-primary/8 text-primary hover:border-primary/60 hover:bg-primary/15 hover:shadow-primary/20 focus-visible:ring-primary/50 flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none'
            >
              <FontAwesomeIcon icon='fa-duotone fa-code' className='text-xs' />
              Code
            </Link>
          )}
          {project?.demo && (
            <Link
              href={project.demo}
              target='_blank'
              rel='noopener noreferrer'
              className='from-primary to-primary/80 text-primary-content hover:shadow-primary/30 focus-visible:ring-primary/50 flex flex-1 items-center justify-center gap-2 rounded-lg bg-linear-to-r px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none active:scale-95'
            >
              <FontAwesomeIcon
                icon='fa-duotone fa-arrow-up-right-from-square'
                className='text-xs'
              />
              Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
