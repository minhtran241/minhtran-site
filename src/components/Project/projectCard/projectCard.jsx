import Image from 'next/image';
import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ProjectCard = ({ project }) => {
  return (
    <article className='border-base-200/80 bg-base-100 flex h-full flex-col rounded-2xl border shadow-sm'>
      {project.thumbnail && (
        <div className='bg-base-200 relative overflow-hidden rounded-t-2xl'>
          <Image
            src={`/projects/${project.thumbnail}`}
            alt={project.name}
            className='h-48 w-full object-cover'
            placeholder='blur'
            blurDataURL={project.base64}
            loading='lazy'
            width={640}
            height={360}
            style={{ objectFit: 'cover' }}
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />

          {project?.year && (
            <div className='bg-secondary/90 border-secondary absolute top-3 right-3 rounded-lg border px-2.5 py-1.5 shadow-lg backdrop-blur-sm'>
              <div className='text-secondary-content flex items-center gap-1.5'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-calendar-alt'
                  className='text-[10px]'
                />
                <span className='text-xs font-bold'>{project.year}</span>
              </div>
            </div>
          )}

          {project?.type && (
            <div
              className={`absolute bottom-3 left-3 rounded-lg border px-2.5 py-1.5 shadow-lg backdrop-blur-sm ${
                project.type === 'Startup'
                  ? 'bg-secondary/90 border-secondary'
                  : project.type === 'Contract'
                    ? 'bg-secondary/90 border-secondary'
                    : project.type === 'Academic'
                      ? 'bg-secondary/90 border-secondary'
                      : 'bg-secondary/90 border-secondary'
              }`}
            >
              <div className='text-secondary-content flex items-center gap-1.5'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-tag'
                  className='text-[10px]'
                />
                <span className='text-xs font-bold tracking-wide uppercase'>
                  {project.type}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className='flex flex-1 flex-col gap-4 p-5'>
        <div className='space-y-3'>
          <h3 className='text-xl leading-tight font-bold'>
            {project?.code ? (
              <Link
                href={project.code}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                {project.name}
              </Link>
            ) : project?.demo ? (
              <Link
                href={project.demo}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                {project.name}
              </Link>
            ) : (
              <span>{project.name}</span>
            )}
          </h3>

          <div className='flex flex-col gap-2'>
            {project?.partner && (
              <div className='flex items-center gap-2 text-sm'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-handshake'
                  className='text-primary text-base'
                />
                {project?.partner_url ? (
                  <Link
                    href={project.partner_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='link link-primary font-medium'
                  >
                    {project.partner}
                  </Link>
                ) : (
                  <span className='font-medium'>{project.partner}</span>
                )}
              </div>
            )}

            {project?.role && (
              <div className='flex items-center gap-2 text-sm'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-user-tie'
                  className='text-primary text-base'
                />
                <span className='font-medium'>{project.role}</span>
              </div>
            )}

            {project?.status && (
              <div className='flex items-center gap-2 text-sm'>
                <div
                  className={`text-base ${
                    project.status === 'In Progress'
                      ? 'text-success'
                      : project.status === 'Maintained'
                        ? 'text-warning'
                        : ''
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      project.status === 'In Progress'
                        ? 'fa-solid fa-circle'
                        : project.status === 'Maintained'
                          ? 'fa-duotone fa-wrench'
                          : 'fa-duotone fa-circle-check'
                    }
                  />
                </div>
                <span className='font-medium'>{project.status}</span>
              </div>
            )}
          </div>
        </div>

        <p className='text-sm leading-relaxed'>{project?.description}</p>

        {project?.tech && (
          <div className='flex flex-wrap gap-2'>
            {project.tech.split(',').map((tech, index) => (
              <span
                key={index}
                className='bg-base-200 rounded-md px-2.5 py-1 text-xs font-semibold'
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {(project?.code || project?.demo) && (
          <div className='mt-auto flex flex-wrap gap-2 pt-2'>
            {project?.code && (
              <Link
                href={project.code}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-outline btn-sm gap-2'
              >
                <FontAwesomeIcon icon='fa-duotone fa-code' />
                <span>View Code</span>
              </Link>
            )}
            {project?.demo && (
              <Link
                href={project.demo}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-primary btn-sm gap-2'
              >
                <FontAwesomeIcon icon='fa-duotone fa-arrow-up-right-from-square' />
                <span>Live Demo</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
