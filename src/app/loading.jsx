import { SectionLoading } from '@/components/Common/Loading';

/**
 * Default page loading component for Next.js
 * This is a minimal loading indicator for route transitions.
 * Component-level loading is handled by Suspense boundaries in each page.
 */
const Loading = () => {
  return <SectionLoading text='Loading' size='sm' showIcon={false} />;
};

export default Loading;
