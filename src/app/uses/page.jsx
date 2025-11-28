import { Suspense } from 'react';
import Devices from '@/components/Uses/devices';
import DevTools from '@/components/Uses/devtools';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Softwares from '@/components/Uses/software';
import {
  DeviceGridSkeleton,
  ToolGridSkeleton,
} from '@/components/Common/Loading';

export const dynamic = 'force-dynamic'; // Ensures this route is always server-rendered

const PAGE_TITLE = 'Used Devices and Tools';
const PAGE_DESCRIPTION =
  'List of devices and tools that I use for development and daily tasks.';

const BREADCRUMBS = [
  {
    href: '/uses',
    icon: <FontAwesomeIcon icon='fa-duotone fa-folder-open' />,
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
    <div className='container mt-16 py-12'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <div className='mt-8 flex flex-col gap-16'>
        <Suspense fallback={<DeviceGridSkeleton count={3} featured={true} />}>
          <Devices />
        </Suspense>
        <div className='divider'></div>
        <Suspense fallback={<ToolGridSkeleton count={10} />}>
          <DevTools />
        </Suspense>
        <div className='divider'></div>
        <Suspense fallback={<ToolGridSkeleton count={10} />}>
          <Softwares />
        </Suspense>
      </div>
    </div>
  );
};

export default UsesPage;
