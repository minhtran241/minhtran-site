import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import fs from 'fs/promises';
import path from 'path';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import { getBase64 } from '@/common/libs/plaiceholder';
import ProjectCard from '@/components/Project/projectCard/projectCard';

const PAGE_TITLE = 'My Projects';
const PAGE_DESCRIPTION =
  'A collection of my production projects showcasing expertise in industry-relevant technologies and best practices.';

const BREADCRUMBS = [
  {
    href: '/projects',
    icon: <FontAwesomeIcon icon='fa-duotone fa-folder-open' />,
    text: 'Projects',
  },
];

// SEO metadata
export const generateMetadata = async () => {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  };
};

// * Fetch data from local JSON
const DATA_ATTRS_FILE = path.join(fileSystemInfo.dataFetchDir, 'projects.json');

// * Fetch projects from file system
const getProjects = async () => {
  try {
    const projectsData = await fs.readFile(path.join(DATA_ATTRS_FILE), 'utf-8');
    let projects = JSON.parse(projectsData);

    // Generate base64 placeholders for all project images
    const base64s = await Promise.all(
      projects.map((project) =>
        project.thumbnail
          ? getBase64(`/projects/${project.thumbnail}`)
          : Promise.resolve(''),
      ),
    );

    // Add base64 to each project
    projects = projects.map((project, index) => ({
      ...project,
      base64: base64s[index],
    }));

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

const ProjectPage = async () => {
  const projects = await getProjects();

  return (
    <div className='flex flex-col gap-8'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      {/* Grid Layout */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
