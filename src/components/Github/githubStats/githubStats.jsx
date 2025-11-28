'use client';

import SectionLabel from '@/components/Home/sectionLabel/sectionLabel';
import ContributionChart from '@/components/Home/contribution/contributionChart';
import useSWR from 'swr';
import { GITHUB_REPOS_NUM } from '@/common/constants/githubAPI';
import { userBasicInfo } from '@/common/constants/userBasic';
import CodingActive from '@/components/Home/contribution/wakatime/codingActive';
import { fetcher } from '@/common/libs/fetcher';
import { CodingActivitySkeleton } from '@/components/Common/Loading';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

// Skeleton for the contribution chart
const ContributionChartSkeleton = () => (
  <div className='border-base-300 bg-base-100 rounded-box animate-pulse border p-3'>
    {/* Header */}
    <div className='mb-3 flex flex-wrap items-center justify-between gap-3'>
      <div className='flex items-center gap-3'>
        <div className='bg-base-300 h-8 w-8 rounded-full' />
        <div className='space-y-1'>
          <div className='bg-base-300 h-4 w-32 rounded' />
          <div className='bg-base-300 h-3 w-20 rounded' />
        </div>
      </div>
      <div className='flex gap-1.5'>
        <div className='bg-base-300 h-8 w-20 rounded' />
        <div className='bg-base-300 h-8 w-20 rounded' />
      </div>
    </div>
    {/* Chart area */}
    <div className='bg-base-200 rounded-box h-56 w-full' />
    {/* Stats */}
    <div className='stats stats-horizontal bg-base-200 mt-3 w-full shadow-sm'>
      <div className='stat px-3 py-2'>
        <div className='bg-base-300 mb-1 h-3 w-12 rounded' />
        <div className='bg-base-300 h-5 w-8 rounded' />
      </div>
      <div className='stat px-3 py-2'>
        <div className='bg-base-300 mb-1 h-3 w-12 rounded' />
        <div className='bg-base-300 h-5 w-8 rounded' />
      </div>
      <div className='stat px-3 py-2'>
        <div className='bg-base-300 mb-1 h-3 w-16 rounded' />
        <div className='bg-base-300 h-5 w-8 rounded' />
      </div>
    </div>
  </div>
);

const GitHubStats = () => {
  const username = userBasicInfo.githubUsername;
  const reposNum = GITHUB_REPOS_NUM;
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL;

  const { data: ghData } = useSWR(
    `${BASE_URL}/api/github?username=${username}&reposNum=${reposNum}`,
    fetcher,
  );

  const { data: wkData } = useSWR(`${BASE_URL}/api/wakatime`, fetcher);

  const sectionTitle = 'Contribution Stats';
  const sectionDescription = `Total of ${ghData?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0} commits across ${ghData?.user?.repositories?.totalCount || 0} public repositories.`;

  return (
    <div>
      <SectionLabel
        title={sectionTitle}
        description={sectionDescription}
        icon={<FontAwesomeIcon icon='fa-duotone fa-code-pull-request' />}
      />
      <div className='flex flex-col gap-5'>
        {ghData ? (
          <ContributionChart
            contributionCollection={ghData.user.contributionsCollection}
          />
        ) : (
          <ContributionChartSkeleton />
        )}
        {wkData ? <CodingActive data={wkData} /> : <CodingActivitySkeleton />}
      </div>
    </div>
  );
};

export default GitHubStats;
