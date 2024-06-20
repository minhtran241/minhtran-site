import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import { Suspense } from 'react';
import path from 'path';
import fs from 'fs/promises';
import ProjectCard from '../projectCard/projectCard';
import Loading from '@/app/loading';
import SectionLabel from '../../Home/sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';

const PROJECT_FETCH_LIMIT = 3;
const DATA_ATTRS_DIR = path.join(
    process.cwd(),
    fileSystemInfo.dataFetchDir,
    'project'
);
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, 'projects.json');

// * Fetch projects from file system
const getProjects = async (limit) => {
    try {
        // Read project data from JSON file
        const projectsData = await fs.readFile(
            path.join(DATA_ATTRS_FILE),
            'utf-8'
        );
        const projects = JSON.parse(projectsData);
        projects.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        return projects.slice(0, limit);
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects');
    }
};

const SECTION_TITLE = 'Development Projects';
const SECTION_DESCRIPTION =
    'A collection of my open-source side projects, professional work projects, and research endeavors. Most of them are available on my GitHub.';

const ProjectsComponent = async ({ limit }) => {
    const projects = await getProjects(limit || PROJECT_FETCH_LIMIT);

    return (
        <div className="items-center justify-center mt-12 container">
            <SectionLabel
                title={SECTION_TITLE}
                description={SECTION_DESCRIPTION}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {projects.map((project, index) => (
                    // same height for all cards
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
            {/* See More */}
            <div className="flex justify-center mt-8">
                <Link href="/project">
                    <div className="flex flex-row items-center gap-2 text-lg font-semibold hover:text-[#0033A0] dark:hover:text-blue-600 cursor-pointer transition">
                        See More
                        <ChevronsRight className="h-6 w-6" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <Suspense fallback={<Loading />}>
            <ProjectsComponent />
        </Suspense>
    );
};

export default Projects;
