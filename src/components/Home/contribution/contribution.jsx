'use client';
import SectionLabel from '../sectionLabel/sectionLabel';
// import PublicReposCard from './publicReposCard';
// import GHUserCard from './ghUserCard';
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
		fetcher
	)?.data;

	const wkData = useSWR(`${BASE_URL}/api/wakatime`, fetcher)?.data;

	const sectionTitle = 'Contribution Stats';
	const sectionDescription = `Total of ${ghData?.user?.contributionsCollection?.contributionCalendar?.totalContributions} commits across ${ghData?.user?.repositories?.totalCount} public repositories.`;

	return (
		<div className="container items-center justify-center">
			<div className="bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl p-6 md:p-8 shadow-xl border border-base-300/50">
				<SectionLabel
					title={sectionTitle}
					description={sectionDescription}
					icon=<FontAwesomeIcon icon="fa-duotone fa-code-pull-request" />
				/>
				<div className="flex flex-col gap-8">
					{ghData && wkData ? (
						<div className="flex flex-col gap-8">
							{/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-2">
                                <GHUserCard
                                    ghInfo={ghData}
                                    username={username}
                                />
                                <PublicReposCard ghInfo={ghData} />
                            </div> */}
							<ContributionChart
								contributionCollection={
									ghData?.user?.contributionsCollection
								}
							/>
							<CodingActive data={wkData} />
						</div>
					) : (
						<Loading fullPage={false} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Contribution;
