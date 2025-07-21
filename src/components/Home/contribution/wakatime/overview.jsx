import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const { formatDate } = require('@/common/helpers');

const Overview = ({ data }) => {
	const dailyTotal = data?.human_readable_total || 'N/A';
	const dailyAverage = data?.human_readable_daily_average || 'N/A';
	const bestDayText = data?.best_day?.text || 'N/A';
	const bestDayDate = data?.best_day?.date;
	const allTimeSinceToday = data?.all_time_since_today?.text || 'N/A';
	const startDate = data?.start_date ? formatDate(data.start_date) : '';
	const endDate = data?.end_date ? formatDate(data.end_date) : '';
	const bestDay = bestDayDate
		? `${formatDate(bestDayDate)} (${bestDayText})`
		: 'N/A';

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-3">
			<OverviewItem
				icon=<FontAwesomeIcon icon="fa-duotone fa-calendar-day" />
				label="Start Date"
				value={startDate}
			/>
			<OverviewItem
				icon=<FontAwesomeIcon icon="fa-duotone fa-calendar-day" />
				label="End Date"
				value={endDate}
			/>
			<OverviewItem
				icon=<FontAwesomeIcon icon="fa-duotone fa-clock" />
				label="Daily Coding Average"
				value={dailyAverage}
			/>
			<OverviewItem
				icon=<FontAwesomeIcon icon="fa-duotone fa-clock" />
				label="This Week Coding Time"
				value={dailyTotal}
			/>
			<OverviewItem
				icon=<FontAwesomeIcon icon="fa-duotone fa-calendar-star" />
				label="Best Day Coding Time"
				value={bestDay}
			/>
			<OverviewItem
				icon=<FontAwesomeIcon icon="fa-duotone fa-clock" />
				label="All Time Since Today"
				value={allTimeSinceToday}
			/>
		</div>
	);
};

const OverviewItem = ({ icon, label, value }) => (
	<div className="stats border border-base-300 bg-base-100 rounded-box">
		<div className="stat">
			<div className="stat-label gap-2 text-sm">
				{icon} {label}
			</div>
			<div className="stat-value lg:text-lg text-base text-primary">
				{value}
			</div>
		</div>
	</div>
);

export default Overview;
