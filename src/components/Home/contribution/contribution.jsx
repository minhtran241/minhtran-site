'use client';
import SectionLabel from '../sectionLabel/sectionLabel';
import ContributionChart from './contributionChart';
import useSWR from 'swr';
import { GITHUB_REPOS_NUM } from '@/common/constants/githubAPI';
import { userBasicInfo } from '@/common/constants/userBasic';
import CodingActive from './wakatime/codingActive';
import { fetcher } from '@/common/libs/fetcher';
import Loading from '@/app/loading';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const Contribution = () => {
  const username = userBasicInfo.githubUsername;
  const reposNum = GITHUB_REPOS_NUM;
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL;

  const ghData = useSWR(
    `${BASE_URL}/api/github?username=${username}&reposNum=${reposNum}`,
    fetcher,
  )?.data;

  const wkData = useSWR(`${BASE_URL}/api/wakatime`, fetcher)?.data;

  const sectionTitle = 'Contribution Stats';
  const sectionDescription = `Total of ${ghData?.user?.contributionsCollection?.contributionCalendar?.totalContributions} commits across ${ghData?.user?.repositories?.totalCount} public repositories.`;

  return (
    <div>
      {/* <div className='border-base-300/50 bg-base-100 rounded-2xl border p-5 shadow-lg md:p-6'> */}
      <SectionLabel
        title={sectionTitle}
        description={sectionDescription}
        icon=<FontAwesomeIcon icon='fa-duotone fa-code-pull-request' />
      />
      <div className='flex flex-col gap-5'>
        {ghData && wkData ? (
          <div className='flex flex-col gap-5'>
            <ContributionChart
              contributionCollection={ghData?.user?.contributionsCollection}
            />
            <CodingActive data={wkData} />
          </div>
        ) : (
          <Loading fullPage={false} />
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Contribution;
