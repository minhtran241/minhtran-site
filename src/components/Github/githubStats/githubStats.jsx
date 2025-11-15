'use client';

import SectionLabel from '@/components/Home/sectionLabel/sectionLabel';
import ContributionChart from '@/components/Home/contribution/contributionChart';
import useSWR from 'swr';
import { GITHUB_REPOS_NUM } from '@/common/constants/githubAPI';
import { userBasicInfo } from '@/common/constants/userBasic';
import CodingActive from '@/components/Home/contribution/wakatime/codingActive';
import { fetcher } from '@/common/libs/fetcher';
import Loading from '@/app/loading';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

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
        {ghData && wkData ? (
          <div className='flex flex-col gap-5'>
            <ContributionChart
              contributionCollection={ghData.user.contributionsCollection}
            />
            <CodingActive data={wkData} />
          </div>
        ) : (
          <Loading fullPage={false} />
        )}
      </div>
    </div>
  );
};

export default GitHubStats;
