import Link from 'next/link';
import { getClient } from '@umami/api-client';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const WebStats = async () => {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const shareUrl = process.env.UMAMI_SHARE_URL;

  // Return null if Umami is not configured
  if (!websiteId || !shareUrl) {
    return null;
  }

  const client = getClient();
  const { ok, status, data, error } = await client.getWebsiteStats(websiteId, {
    startAt: 0,
    endAt: new Date().getTime(),
  });

  if (!ok || error) {
    console.error('Error fetching website stats', status, error);
    return null;
  }

  const webstats = {
    pageviews: data?.pageviews,
    visitors: data?.visitors,
    visits: data?.visits,
  };

  return (
    <Link
      href={shareUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='grid auto-cols-max grid-flow-col gap-3 text-center transition-opacity hover:opacity-80'
      aria-label='View detailed analytics'
    >
      {Object.entries(webstats).map(([key, value]) => (
        <div
          key={key}
          className='rounded-box bg-primary/10 border-primary/30 hover:bg-primary/15 hover:border-primary/40 flex flex-col border p-2 transition-colors'
        >
          <span className='text-primary font-mono text-xl font-bold'>
            {value ? new Intl.NumberFormat('en-US').format(value) : '0'}
          </span>
          <span className='text-base-content/70 text-xs tracking-wide uppercase opacity-80'>
            {key}
          </span>
        </div>
      ))}
    </Link>
  );
};

export default WebStats;
