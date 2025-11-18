import Image from 'next/image';
import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ProjectCard = ({ project }) => {
  return (
    <article className='border-base-200/80 bg-base-100/95 flex h-full flex-col overflow-hidden rounded-2xl border p-5 shadow-sm'>
      {project.thumbnail && (
        <div className='bg-base-200 relative mb-5 overflow-hidden rounded-xl'>
          <Image
            src={`/projects/${project.thumbnail}`}
            alt={project.name}
            className='h-52 w-full object-cover'
            placeholder='blur'
            blurDataURL={project.base64}
            loading='lazy'
            width={640}
            height={360}
            style={{ objectFit: 'cover' }}
          />

          {project?.year && (
            <span className='badge badge-primary border-primary/40 text-primary-content absolute top-4 right-4 gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase shadow-md'>
              <FontAwesomeIcon
                icon='fa-duotone fa-calendar-alt'
                className='text-[10px]'
              />
              {project.year}
            </span>
          )}
        </div>
      )}

      <div className='flex flex-1 flex-col gap-4'>
        {project?.partner && (
          <div className='text-primary flex items-center gap-2 text-sm'>
            <FontAwesomeIcon icon='fa-duotone fa-handshake' />
            {project?.partner_url ? (
              <Link
                href={project.partner_url}
                target='_blank'
                rel='noopener noreferrer'
                className='underline-offset-2 hover:underline'
              >
                {project.partner}
              </Link>
            ) : (
              <span>{project.partner}</span>
            )}
          </div>
        )}

        <div className='space-y-3'>
          <h3 className='text-xl leading-tight font-semibold'>
            {project?.code ? (
              <Link
                href={project.code}
                target='_blank'
                rel='noopener noreferrer'
              >
                {project.name}
              </Link>
            ) : project?.demo ? (
              <Link
                href={project.demo}
                target='_blank'
                rel='noopener noreferrer'
              >
                {project.name}
              </Link>
            ) : (
              <span>{project.name}</span>
            )}
          </h3>
          <p className='text-sm leading-relaxed'>{project?.description}</p>
        </div>

        {project?.tech && (
          <div className='flex flex-wrap gap-2 text-xs'>
            {project.tech.split(',').map((tech, index) => (
              <span
                key={index}
                className='badge badge-soft badge-sm px-3 py-2 font-semibold tracking-wide uppercase'
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {(project?.code || project?.demo) && (
          <div className='mt-auto flex flex-wrap gap-2'>
            {project?.code && (
              <Link
                href={project.code}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-outline btn-sm border-base-200/80 text-xs font-semibold tracking-wide uppercase'
              >
                <FontAwesomeIcon
                  icon='fa-duotone fa-code'
                  className='text-[10px]'
                />
                Code
              </Link>
            )}
            {project?.demo && (
              <Link
                href={project.demo}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-primary btn-sm text-xs font-semibold tracking-wide uppercase'
              >
                <FontAwesomeIcon
                  icon='fa-duotone fa-arrow-up-right-from-square'
                  className='text-[10px]'
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
