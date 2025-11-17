import Image from 'next/image';
import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ProjectCard = ({ project }) => {
  return (
    <article className='card bg-base-100 group shadow-sm'>
      {project.thumbnail && (
        <figure className='relative h-48'>
          <Image
            src={`/projects/${project.thumbnail}`}
            alt={project.name}
            className='h-full w-full object-cover'
            placeholder='blur'
            blurDataURL={project.base64}
            loading='lazy'
            fill
            style={{ objectFit: 'cover' }}
          />

          {/* Year Badge */}
          {project?.year && (
            <div className='absolute top-4 left-4'>
              <span className='badge badge-primary gap-1.5 px-3 py-2.5 shadow-lg'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-calendar'
                  className='text-xs'
                />
                {project.year}
              </span>
            </div>
          )}
        </figure>
      )}

      <div className='card-body'>
        {/* Tech Stack */}
        {project?.tech && (
          <div className='card-actions mb-3 justify-start'>
            {project.tech.split(',').map((tech, index) => (
              <div key={index} className='badge badge-outline badge-sm'>
                {tech.trim()}
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className='card-title group-hover:text-primary line-clamp-2'>
          {project?.code ? (
            <Link href={project.code} target='_blank' rel='noopener noreferrer'>
              {project.name}
            </Link>
          ) : project?.demo ? (
            <Link href={project.demo} target='_blank' rel='noopener noreferrer'>
              {project.name}
            </Link>
          ) : (
            <span>{project.name}</span>
          )}
        </h3>

        {/* Description */}
        <p className='mb-4 flex-1 text-sm leading-relaxed'>
          {project?.description}
        </p>

        {/* Action Buttons */}
        {(project?.code || project?.demo) && (
          <div className='card-actions justify-end'>
            {project?.code && (
              <Link
                href={project.code}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-outline btn-primary btn-sm gap-2'
              >
                <FontAwesomeIcon
                  icon='fa-duotone fa-code'
                  className='text-xs'
                />
                Code
              </Link>
            )}
            {project?.demo && (
              <Link
                href={project.demo}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-primary btn-sm gap-2'
              >
                <FontAwesomeIcon
                  icon='fa-duotone fa-arrow-up-right-from-square'
                  className='text-xs'
                />
                Demo
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
