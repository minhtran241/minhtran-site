import Loading from '@/app/loading';
import { sumTotalFromArray } from '@/common/helpers';
import Progress from './progress';
import clsx from 'clsx';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { TIMEZONE } from '@/common/constants/timezone';

const CodingActiveList = ({ data }) => {
    const getLanguagesTotalHours = sumTotalFromArray(
        data?.languages || [],
        'hours'
    );
    const getLanguagesTotalMinutes = sumTotalFromArray(
        data?.languages || [],
        'minutes'
    );
    const getLanguagesTotalTimeDisplay = `${
        Math.floor((getLanguagesTotalMinutes % 3600) / 60) +
        getLanguagesTotalHours
    } hrs ${getLanguagesTotalMinutes} mins`;

    const getEditorTotalHours = sumTotalFromArray(
        data?.categories || [],
        'hours'
    );
    const getEditorTotalMinutes = sumTotalFromArray(
        data?.categories || [],
        'minutes'
    );
    const getEditorTotalTimeDisplay = `${
        Math.floor((getEditorTotalMinutes % 3600) / 60) + getEditorTotalHours
    } hrs ${getEditorTotalMinutes} mins`;

    const lastUpdateDate = data?.last_update;
    let distance = '';
    if (lastUpdateDate) {
        const zonedDate = utcToZonedTime(
            zonedTimeToUtc(lastUpdateDate, TIMEZONE),
            TIMEZONE
        );
        distance = formatDistanceToNowStrict(zonedDate, {
            addSuffix: true,
        });
    }

    const actives = [
        {
            title: 'Languages',
            total: getLanguagesTotalTimeDisplay,
            data: data?.languages,
            styles: {
                bg: 'bg-gradient-to-r from-primary to-secondary',
            },
        },
        {
            title: 'Categories',
            total: getEditorTotalTimeDisplay,
            data: data?.categories,
            styles: {
                bg: 'bg-gradient-to-r from-primary to-secondary',
            },
        },
    ];

    if (!data) {
        return <Loading />;
    }

    return (
        <Link
            href={`https://wakatime.com/@${process.env.WAKATIME_USERNAME}`}
            target="_blank"
            className="mt-2 flex flex-col gap-6 sm:flex-row sm:gap-4"
        >
            {actives.map((item) => (
                <div
                    key={item?.title}
                    className={clsx(
                        // item?.styles?.bg,
                        'h-full w-full relative flex flex-1 flex-col bg-base-100 border rounded-box p-4'
                    )}
                >
                    <p className="card-title lg:text-lg text-base">
                        {item?.title}
                    </p>
                    <p className="text-sm opacity-70">
                        Last updated {distance}
                    </p>
                    <ul className="flex flex-col gap-1 py-3">
                        {item?.data?.slice(0, 3)?.map((subItem) => (
                            <li key={subItem?.name}>
                                <Progress
                                    data={subItem}
                                    className={item?.styles?.bg}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </Link>
    );
};

export default CodingActiveList;
