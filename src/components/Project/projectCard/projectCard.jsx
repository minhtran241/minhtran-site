import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { TIMEZONE } from '@/common/constants/timezone';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ProjectCard = async ({ project }) => {
  // Format project name
  const projectName = project?.name
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Format last updated time
  const getLastUpdated = () => {
    if (!project?.pushedAt) return null;
    const zonedDate = toZonedTime(
      fromZonedTime(project.pushedAt, TIMEZONE),
      TIMEZONE,
    );
    return formatDistanceToNowStrict(zonedDate, { addSuffix: true });
  };

  const lastUpdated = getLastUpdated();
  const projectUrl = project?.homepageUrl || project?.url;
  const topics = project?.repositoryTopics?.nodes || [];
  const displayTopics = topics.slice(0, 4);
  const remainingTopics = topics.length > 4 ? topics.length - 4 : 0;

  return (
    <div className='card bg-base-100 border-base-200/50 group flex h-full flex-col border shadow-sm transition-all duration-300 hover:shadow-lg'>
      {/* Project Image */}
      <figure className='relative overflow-hidden'>
        <Link href={projectUrl} target='_blank' rel='noopener noreferrer'>
          <Image
            src={
              project.thumbnail
                ? `/projects/${project.thumbnail}`
                : project?.openGraphImageUrl
            }
            alt={projectName}
            className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
            placeholder='blur'
            blurDataURL={project.base64}
            loading='lazy'
            width={400}
            height={192}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </Link>
      </figure>

      {/* Content */}
      <div className='card-body flex flex-1 flex-col p-5'>
        {/* Header */}
        <div className='flex-1'>
          <Link
            href={projectUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='card-title hover:text-primary group/title mb-3 inline-flex items-center gap-2 text-lg transition-colors duration-200'
          >
            <span className='line-clamp-2'>{projectName}</span>
            <FontAwesomeIcon
              icon='fa-duotone fa-arrow-up-right-from-square'
              className='flex-shrink-0 text-xs opacity-0 transition-opacity duration-200 group-hover/title:opacity-100'
            />
          </Link>

          <p className='text-base-content/80 mb-4 line-clamp-3 text-sm leading-relaxed'>
            {project?.description}
          </p>

          {/* Topics */}
          {displayTopics.length > 0 && (
            <div className='mb-4 flex flex-wrap gap-1.5'>
              {displayTopics.map((node, index) => (
                <span
                  key={index}
                  className='badge badge-outline badge-sm hover:badge-primary transition-colors'
                >
                  {node?.topic?.name}
                </span>
              ))}
              {remainingTopics > 0 && (
                <span className='badge badge-ghost badge-xs'>
                  +{remainingTopics}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className='mt-auto'>
          {/* Main Stats */}
          <div className='mb-4 flex items-center justify-between gap-4 text-sm font-medium'>
            {/* Language */}
            {project?.primaryLanguage && (
              <div className='flex items-center gap-1.5'>
                <div
                  className='h-2.5 w-2.5 flex-shrink-0 rounded-full'
                  style={{
                    backgroundColor: project.primaryLanguage.color || '#6b7280',
                  }}
                />
                <span className='truncate text-xs font-medium'>
                  {project.primaryLanguage.name}
                </span>
              </div>
            )}

            {/* Stars */}
            <div className='flex items-center gap-1.5'>
              <FontAwesomeIcon
                icon='fa-duotone fa-star'
                className='text-warning flex-shrink-0 text-xs'
              />
              <span className='text-xs font-semibold'>
                {project?.stargazerCount?.toLocaleString() || 0}
              </span>
            </div>

            {/* Forks */}
            <div className='flex items-center gap-1.5'>
              <FontAwesomeIcon
                icon='fa-duotone fa-code-fork'
                className='flex-shrink-0 text-xs'
              />
              <span className='text-xs font-semibold'>
                {project?.forkCount?.toLocaleString() || 0}
              </span>
            </div>

            {/* Contributors */}
            <div className='flex items-center gap-1.5'>
              <FontAwesomeIcon
                icon='fa-duotone fa-users'
                className='flex-shrink-0 text-xs'
              />
              <span className='text-xs font-semibold'>
                {project?.collaborators?.nodes?.length || 0}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className='border-base-200 space-y-2 border-t pt-3 text-xs'>
            <div className='flex items-center justify-between'>
              {project?.createdAt && (
                <div className='flex items-center gap-1.5'>
                  <FontAwesomeIcon
                    icon='fa-duotone fa-calendar-days'
                    className='text-xs'
                  />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {lastUpdated && (
                <div className='flex items-center gap-1.5'>
                  <FontAwesomeIcon
                    icon='fa-duotone fa-clock'
                    className='text-xs'
                  />
                  <span className='whitespace-nowrap'>{lastUpdated}</span>
                </div>
              )}
            </div>
            {project?.licenseInfo?.name && (
              <div className='flex items-center gap-1.5'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-scale-balanced'
                  className='text-xs'
                />
                <span className='truncate'>{project.licenseInfo.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
