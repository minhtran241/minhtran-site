import { Suspense } from 'react';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import GitHubStats from '@/components/Github/githubStats/githubStats';
import GitHubProjects from '@/components/Github/githubProjects/githubProjects';
import {
  GitHubStatsSkeleton,
  GitHubRepoGridSkeleton,
} from '@/components/Common/Loading';

// Skip prerendering - fetch data at request time to avoid ECONNREFUSED during build
export const dynamic = 'force-dynamic';

const PAGE_TITLE = 'GitHub';
const PAGE_DESCRIPTION =
  'My GitHub contribution stats, analytics, and open-source projects showcase.';

const BREADCRUMBS = [
  {
    href: '/github',
    icon: <FontAwesomeIcon icon='fa-duotone fa-code-branch' />,
    text: 'GitHub',
  },
];

export const generateMetadata = async () => {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  };
};

const GitHubPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      {/* Contribution Stats */}
      <Suspense fallback={<GitHubStatsSkeleton />}>
        <GitHubStats />
      </Suspense>

      {/* GitHub Projects */}
      <Suspense fallback={<GitHubRepoGridSkeleton count={6} />}>
        <GitHubProjects />
      </Suspense>
    </div>
  );
};

export default GitHubPage;
