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
    <div className='grid gap-2 md:grid-cols-3'>
      <OverviewItem
        icon=<FontAwesomeIcon icon='fa-duotone fa-calendar-day' />
        label='Start Date'
        value={startDate}
      />
      <OverviewItem
        icon=<FontAwesomeIcon icon='fa-duotone fa-calendar-day' />
        label='End Date'
        value={endDate}
      />
      <OverviewItem
        icon=<FontAwesomeIcon icon='fa-duotone fa-clock' />
        label='Daily Average'
        value={dailyAverage}
      />
      <OverviewItem
        icon=<FontAwesomeIcon icon='fa-duotone fa-clock' />
        label='This Week'
        value={dailyTotal}
      />
      <OverviewItem
        icon=<FontAwesomeIcon icon='fa-duotone fa-calendar-star' />
        label='Best Day'
        value={bestDay}
      />
      <OverviewItem
        icon=<FontAwesomeIcon icon='fa-duotone fa-clock' />
        label='All Time'
        value={allTimeSinceToday}
      />
    </div>
  );
};

const OverviewItem = ({ icon, label, value }) => (
  <div className='stats rounded-box border-base-300 bg-base-100 border'>
    <div className='stat p-3'>
      <div className='stat-label flex items-center gap-1.5 text-sm'>
        {icon} {label}
      </div>
      <div className='stat-value text-primary text-sm font-semibold'>
        {value}
      </div>
    </div>
  </div>
);

export default Overview;
