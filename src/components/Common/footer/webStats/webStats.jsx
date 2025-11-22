import Link from 'next/link';
import { getClient } from '@umami/api-client';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const WebStats = async () => {
  const client = getClient();
  const { ok, status, data, error } = await client.getWebsiteStats(
    process.env.UMAMI_WEBSITE_ID,
    {
      startAt: 0,
      endAt: new Date().getTime(),
    },
  );

  if (!ok || error) {
    console.error('Error fetching website stats', status, error);
  }

  const webstats = {
    pageviews: data?.pageviews,
    visitors: data?.visitors,
    visits: data?.visits,
  };

  return (
    <Link
      href={process.env.UMAMI_SHARE_URL}
      target='_blank'
      rel='noopener noreferrer'
      className='grid auto-cols-max grid-flow-col gap-3 text-center transition-opacity hover:opacity-80'
      aria-label='View detailed analytics'
    >
      {Object.entries(webstats).map(([key, value]) => (
        <div
          key={key}
          className='rounded-box bg-neutral/10 border-neutral/20 flex flex-col border p-2'
        >
          <span className='font-mono text-xl font-bold'>
            {value?.toLocaleString() || '0'}
          </span>
          <span className='text-xs tracking-wide uppercase opacity-70'>
            {key}
          </span>
        </div>
      ))}
    </Link>
  );
};

export default WebStats;
