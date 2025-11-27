import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { TIMEZONE } from '@/common/constants/timezone';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const GitHubRepositoryCard = async ({ project }) => {
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
    <div className='card group bg-base-200 text-base-content'>
      <div className='card-body'>
        {/* Header */}
        <div className='flex-1'>
          <Link
            href={projectUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='card-title hover:text-primary group/title transition-colors'
          >
            <span className='line-clamp-2'>{project?.name}</span>
            <FontAwesomeIcon
              icon='fa-duotone fa-arrow-up-right-from-square'
              className='shrink-0 text-xs opacity-0 transition-opacity duration-200 group-hover/title:opacity-100'
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
                  className='badge badge-sm badge-dash badge-primary'
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
                  className='h-2.5 w-2.5 shrink-0 rounded-full'
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
                className='text-warning shrink-0 text-xs'
              />
              <span className='text-xs font-semibold'>
                {project?.stargazerCount?.toLocaleString() || 0}
              </span>
            </div>

            {/* Forks */}
            <div className='flex items-center gap-1.5'>
              <FontAwesomeIcon
                icon='fa-duotone fa-code-fork'
                className='shrink-0 text-xs'
              />
              <span className='text-xs font-semibold'>
                {project?.forkCount?.toLocaleString() || 0}
              </span>
            </div>

            {/* Contributors */}
            <div className='flex items-center gap-1.5'>
              <FontAwesomeIcon
                icon='fa-duotone fa-users'
                className='shrink-0 text-xs'
              />
              <span className='text-xs font-semibold'>
                {project?.collaborators?.nodes?.length || 0}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className='border-primary/20 space-y-2 border-t pt-3 text-xs'>
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

export default GitHubRepositoryCard;
