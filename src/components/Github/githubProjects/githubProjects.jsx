import GitHubRepositoryCard from '../githubRepositoryCard/githubRepositoryCard';
import SectionLabel from '@/components/Home/sectionLabel/sectionLabel';
import { userBasicInfo } from '@/common/constants/userBasic';
import axios from 'axios';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { SectionLoading } from '@/components/Common/Loading';
import gitHubRepos from '../../../../data/gitHubRepos.json';

const SECTION_TITLE = 'GitHub Repositories';
const SECTION_DESCRIPTION =
  'A collection of my repositories and open-source projects on GitHub showcasing various technologies and implementations.';

const GitHubProjects = async () => {
  const username = userBasicInfo.githubUsername;
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL;

  const repoData = await axios.get(
    `${BASE_URL}/api/github?username=${username}`,
  );

  if (!repoData) {
    return <SectionLoading text='Loading repositories' />;
  }

  let projects = repoData?.data?.user?.repositories?.nodes?.filter((repo) =>
    gitHubRepos.some((repo_item) => repo_item.name === repo.name),
  );

  projects = projects.map((project) => {
    const repoData_item = gitHubRepos.find(
      (repo_item) => repo_item.name === project.name,
    );
    return {
      ...project,
      ...repoData_item,
    };
  });

  return (
    <div>
      <SectionLabel
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
        icon={<FontAwesomeIcon icon='fa-duotone fa-code-branch' />}
      />

      {/* Grid Layout */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project, index) => (
          <GitHubRepositoryCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default GitHubProjects;
