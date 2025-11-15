import ProjectCard from '@/components/Project/projectCard/ProjectCard';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import projectsData from '../../../data/projects.json';

const PAGE_TITLE = 'My Projects';
const PAGE_DESCRIPTION =
  'A collection of my personal and professional projects with detailed descriptions, live demos, and source code.';

const BREADCRUMBS = [
  {
    href: '/projects',
    icon: <FontAwesomeIcon icon='fa-duotone fa-folder-open' />,
    text: 'Projects',
  },
];

export const generateMetadata = async () => {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  };
};

const ProjectPage = async () => {
  return (
    <div className='flex flex-col gap-8'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      {/* Grid Layout */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
