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
  const displayTopics = topics.slice(0, 5);
  const remainingTopics = topics.length > 5 ? topics.length - 5 : 0;

  return (
    <div className='card bg-base-100 border-base-200/50 group h-full border shadow-sm transition-all duration-300 hover:shadow-lg'>
      <div className='flex h-full flex-col lg:flex-row'>
        {/* Project Image */}
        <div className='relative h-48 flex-shrink-0 group-hover:overflow-hidden lg:h-auto lg:w-1/3'>
          <Link
            href={projectUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='block h-full'
          >
            <div className='relative h-full w-full overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none'>
              <Image
                src={
                  project.thumbnail
                    ? `/projects/${project.thumbnail}`
                    : project?.openGraphImageUrl
                }
                alt={projectName}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                priority
                placeholder='blur'
                blurDataURL={project.base64}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className='flex h-full flex-1 flex-col p-6'>
          {/* Header */}
          <div className='flex-1'>
            <Link
              href={projectUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='card-title hover:text-primary group/title inline-flex items-center gap-2 text-xl transition-colors duration-200'
            >
              <span className='line-clamp-2'>{projectName}</span>
              <FontAwesomeIcon
                icon='fa-duotone fa-arrow-up-right-from-square'
                className='flex-shrink-0 text-xs opacity-0 transition-opacity duration-200 group-hover/title:opacity-100'
              />
            </Link>

            <p className='text-base-content/70 mt-4 line-clamp-3 leading-relaxed'>
              {project?.description}
            </p>

            {/* Topics */}
            {displayTopics.length > 0 && (
              <div className='mt-5 flex flex-wrap gap-2'>
                {displayTopics.map((node, index) => (
                  <span
                    key={index}
                    className='badge badge-outline badge-sm hover:badge-primary transition-colors'
                  >
                    {node?.topic?.name}
                  </span>
                ))}
                {remainingTopics > 0 && (
                  <span className='badge badge-ghost badge-sm'>
                    +{remainingTopics}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className='mt-auto pt-6'>
            {/* Main Stats Grid */}
            <div className='mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4'>
              {/* Language */}
              {project?.primaryLanguage && (
                <div className='flex items-center gap-2'>
                  <div
                    className='h-3 w-3 flex-shrink-0 rounded-full'
                    style={{
                      backgroundColor:
                        project.primaryLanguage.color || '#6b7280',
                    }}
                  />
                  <span className='truncate text-sm'>
                    {project.primaryLanguage.name}
                  </span>
                </div>
              )}

              {/* Stars */}
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-star'
                  className='text-warning flex-shrink-0'
                />
                <span className='text-sm font-semibold'>
                  {project?.stargazerCount?.toLocaleString() || 0}
                </span>
              </div>

              {/* Forks */}
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-code-fork'
                  className='flex-shrink-0'
                />
                <span className='text-sm font-semibold'>
                  {project?.forkCount?.toLocaleString() || 0}
                </span>
              </div>

              {/* Contributors */}
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon
                  icon='fa-duotone fa-users'
                  className='flex-shrink-0'
                />
                <span className='text-sm font-semibold'>
                  {project?.collaborators?.nodes?.length || 0}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className='border-base-200 text-base-content/70 flex flex-col gap-3 border-t pt-4 text-xs sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-4'>
                {project?.createdAt && (
                  <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon='fa-duotone fa-calendar-days' />
                    <span>
                      {new Date(project.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {project?.licenseInfo?.name && (
                  <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon='fa-duotone fa-scale-balanced' />
                    <span className='truncate'>{project.licenseInfo.name}</span>
                  </div>
                )}
              </div>

              {lastUpdated && (
                <div className='flex items-center gap-2'>
                  <FontAwesomeIcon icon='fa-duotone fa-clock' />
                  <span className='whitespace-nowrap'>{lastUpdated}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
