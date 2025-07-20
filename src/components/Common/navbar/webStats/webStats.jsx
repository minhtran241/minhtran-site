import Link from 'next/link';
import { getClient } from '@umami/api-client';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const WebStats = async () => {
	const client = getClient();
	const { ok, status, data, error } = await client.getWebsiteStats(
		process.env.UMAMI_WEBSITE_ID,
		{
			// startAt: new Date().getTime() - 24 * 60 * 60 * 1000, // 24 hours ago
			startAt: 0,
			endAt: new Date().getTime(),
		}
	);
	if (!ok || error) {
		console.error('Error fetching website stats', status, error);
	}

	const webstats = {
		Pageviews: data?.pageviews?.value,
		// Visits: data?.visits?.value,
		Visitors: data?.visitors?.value,
	};
	return (
		<div className='text-base-content hover:text-primary'>
			<Link
				href={process.env.UMAMI_SHARE_URL}
				target="_blank"
				tabIndex={0}
				className="lg:hidden flex items-center gap-2 btn btn-ghost fa-lg"
				role="button"
				aria-label="Web Stats"
			>
				<FontAwesomeIcon icon="fa-duotone fa-chart-mixed" />
			</Link>
			<Link
				href={process.env.UMAMI_SHARE_URL}
				target="_blank"
				className="hidden lg:flex items-center gap-2 btn btn-ghost"
			>
				<ul className="flex items-center gap-4">
					{Object.keys(webstats).map((key, index) => (
						<li
							key={index}
							className="flex flex-col items-center gap-1"
						>
							<span className="text-xs">{key}</span>
							<span className="text-lg">
								{webstats[key]?.toLocaleString()}
							</span>
						</li>
					))}
				</ul>
			</Link>
		</div>
	);
};

export default WebStats;
