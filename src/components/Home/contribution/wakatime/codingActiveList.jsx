import { CodingActiveSkeleton } from '@/components/Common/Loading';
import { sumTotalFromArray } from '@/common/helpers';
import Progress from './progress';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { TIMEZONE } from '@/common/constants/timezone';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const CodingActiveList = ({ data }) => {
  const getLanguagesTotalHours = sumTotalFromArray(
    data?.languages || [],
    'hours',
  );
  const getLanguagesTotalMinutes = sumTotalFromArray(
    data?.languages || [],
    'minutes',
  );
  const getLanguagesTotalTimeDisplay = `${
    Math.floor((getLanguagesTotalMinutes % 3600) / 60) + getLanguagesTotalHours
  } hrs ${getLanguagesTotalMinutes} mins`;

  const getEditorTotalHours = sumTotalFromArray(
    data?.categories || [],
    'hours',
  );
  const getEditorTotalMinutes = sumTotalFromArray(
    data?.categories || [],
    'minutes',
  );
  const getEditorTotalTimeDisplay = `${
    Math.floor((getEditorTotalMinutes % 3600) / 60) + getEditorTotalHours
  } hrs ${getEditorTotalMinutes} mins`;

  const lastUpdateDate = data?.last_update;
  let distance = '';
  if (lastUpdateDate) {
    const zonedDate = toZonedTime(
      fromZonedTime(lastUpdateDate, TIMEZONE),
      TIMEZONE,
    );
    distance = formatDistanceToNowStrict(zonedDate, {
      addSuffix: true,
    });
  }

  const actives = [
    {
      icon: <FontAwesomeIcon icon='fa-duotone fa-solid fa-code' />,
      title: 'Languages',
      total: getLanguagesTotalTimeDisplay,
      data: data?.languages,
    },
    {
      icon: <FontAwesomeIcon icon='fa-duotone fa-solid fa-laptop' />,
      title: 'Categories',
      total: getEditorTotalTimeDisplay,
      data: data?.categories,
    },
  ];

  if (!data) {
    return <CodingActiveSkeleton />;
  }

  return (
    <Link
      href={`https://wakatime.com/@${process.env.WAKATIME_USERNAME}`}
      target='_blank'
      className='flex flex-col gap-3 sm:flex-row sm:gap-3'
    >
      {actives.map((item) => (
        <div
          key={item?.title}
          className='rounded-box border-base-300 bg-base-100 relative flex h-full w-full flex-1 flex-col border p-3'
        >
          <p className='flex items-center gap-1.5 text-base font-semibold'>
            {item?.icon} {item?.title}
          </p>
          <p className='text-xs opacity-70'>Updated {distance}</p>
          <ul className='flex flex-col gap-1 py-2'>
            {item?.data?.slice(0, 3)?.map((subItem) => (
              <li key={subItem?.name}>
                <Progress data={subItem} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Link>
  );
};

export default CodingActiveList;
