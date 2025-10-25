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
  console.error(data);

  if (!ok || error) {
    console.error('Error fetching website stats', status, error);
  }

  const webstats = {
    Pageviews: data?.pageviews,
    Visitors: data?.visitors,
  };

  return (
    <>
      <Link
        href={process.env.UMAMI_SHARE_URL}
        target='_blank'
        className='btn btn-ghost btn-square lg:hidden'
        aria-label='Web Stats'
      >
        <FontAwesomeIcon icon='fa-duotone fa-chart-mixed' />
      </Link>

      <Link
        href={process.env.UMAMI_SHARE_URL}
        target='_blank'
        className='btn btn-ghost hidden px-4 lg:flex'
      >
        <div className='flex items-center gap-6'>
          {Object.keys(webstats).map((key) => (
            <div key={key} className='text-center'>
              <div className='text-xs'>{key}</div>
              <div className='text-sm font-semibold'>
                {webstats[key]?.toLocaleString() || '0'}
              </div>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
};

export default WebStats;
