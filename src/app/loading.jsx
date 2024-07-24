import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { cn } from '@/common/libs/cn';

const LoadingIcons = [
    'fa-atom-simple',
    'fa-gear',
    'fa-spinner',
    'fa-sun',
    'fa-arrows-spin',
    'fa-atom',
    'fa-snowflake',
    'fa-spinner-scale',
];

const Loading = ({ fullPage = true }) => {
    // Pick a random loading icon
    const randomIcon =
        LoadingIcons[Math.floor(Math.random() * LoadingIcons.length)];

    return (
        <div
            className={`grid w-full place-items-center overflow-x-scroll lg:overflow-visible ${
                fullPage ? 'h-dvh' : 'p-6'
            }`}
        >
            <FontAwesomeIcon
                icon={cn(
                    'fa-duotone fa-solid fa-spin fa-2x text-primary',
                    randomIcon
                )}
            />
        </div>
    );
};

export default Loading;
