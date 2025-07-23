import ProjectCard from '@/components/Project/projectCard/projectCard';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import { userBasicInfo } from '@/common/constants/userBasic';
import Loading from '../loading';
import { PROJECT_LIST } from '../../../data/projectList';
import axios from 'axios';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { getBase64 } from '@/common/libs/plaiceholder';

export const dynamic = 'force-dynamic'; // Ensures this route is always server-rendered

const PAGE_TITLE = 'Development Projects';
const PAGE_DESCRIPTION =
  'Diverse array of my projects, including open-source side projects, professional work, and research initiatives.';

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

const ProjectPage = async () => {
  const username = userBasicInfo.githubUsername;
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL;

  const repoData = await axios.get(
    `${BASE_URL}/api/github?username=${username}`,
  );

  if (!repoData) {
    return <Loading />;
  }

  let projects = repoData?.data?.user?.repositories?.nodes?.filter((repo) =>
    PROJECT_LIST.some((project) => project.name === repo.name),
  );

  projects = projects.map((project) => {
    const projectData = PROJECT_LIST.find(
      (projectItem) => projectItem.name === project.name,
    );
    return {
      ...project,
      ...projectData,
    };
  });

  const base64s = await Promise.all(
    projects.map((project) =>
      project.thumbnail
        ? getBase64(`/projects/${project.thumbnail}`)
        : getBase64(project.openGraphImageUrl, { local: false }),
    ),
  );
  projects = projects.map((project, index) => ({
    ...project,
    base64: base64s[index],
  }));

  return (
    <>
      <div className='container mt-16 flex flex-col gap-8 py-12'>
        <Breadcrumbs breadcrumbs={BREADCRUMBS} />
        <div className='flex flex-col gap-6'>
          {projects.map((project, index) => (
            // same height for all cards
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
