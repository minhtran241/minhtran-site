import Devices from '@/components/Uses/devices';
import DevTools from '@/components/Uses/devtools';
// import Breakline from '@/common/elements/Breakline';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Softwares from '@/components/Uses/software';

const PAGE_TITLE = 'Used Devices and Tools';
const PAGE_DESCRIPTION =
    'List of devices and tools that I use for development and daily tasks.';

const BREADCRUMBS = [
    {
        href: '/uses',
        icon: <FontAwesomeIcon icon="fa-duotone fa-folder-open" />,
        text: 'Uses',
    },
];

// SEO metadata
export const generateMetadata = async () => {
    return {
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
    };
};

const UsesPage = () => {
    return (
        <>
            <div className="container py-12 mt-16">
                <Breadcrumbs breadcrumbs={BREADCRUMBS} />
                <div className="flex flex-col gap-12 mt-4">
                    <Devices />
                    {/* <Breakline /> */}
                    <DevTools />
                    {/* <Breakline /> */}
                    <Softwares />
                </div>
            </div>
        </>
    );
};

export default UsesPage;
