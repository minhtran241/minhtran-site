import Devices from '@/components/Uses/devices';
import DevTools from '@/components/Uses/devtools';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Softwares from '@/components/Uses/software';

const PAGE_TITLE = 'Used Devices and Tools';
const PAGE_DESCRIPTION = 'List of devices and tools that I use for development and daily tasks.';

const BREADCRUMBS = [
	{
		href: '/uses',
		icon: <FontAwesomeIcon icon="fa-duotone fa-folder-open" />,
		text: 'Uses',
	},
];

export const generateMetadata = async () => {
	return {
		title: PAGE_TITLE,
		description: PAGE_DESCRIPTION,
	};
};

const UsesPage = () => {
	return (
		<div className="container py-12 mt-16">
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />
			<div className="flex flex-col gap-16 mt-8">
				<Devices />
				<div className="divider"></div>
				<DevTools />
				<div className="divider"></div>
				<Softwares />
			</div>
		</div>
	);
};

export default UsesPage;