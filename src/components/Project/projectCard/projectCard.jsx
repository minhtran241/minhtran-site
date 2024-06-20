import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Github, Radio, ScrollText } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <div className="flex flex-col p-4 rounded-lg border dark:border-gray-700 border-gray-200">
            {/* Created at */}
            <div className="flex flex-row justify-between mb-4">
                <div className="flex items-center gap-2 justify-start text-[#0033A0] dark:text-blue-600 font-semibold">
                    <CalendarDays className="h-5 w-5" />
                    <span className="">
                        {new Date(project?.created_at).toLocaleDateString(
                            'en-GB',
                            {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }
                        )}
                    </span>
                </div>
                {project?.research_purpose && (
                    <div className="flex items-center gap-2 justify-end bg-[#0033A0] dark:bg-blue-600 text-white px-2 py-1 rounded-md">
                        <ScrollText className="h-4 w-4" />
                        <p className="text-sm">Research Purpose</p>
                    </div>
                )}
            </div>
            <Link href={`/project/${project?.slug}`}>
                <Image
                    className="rounded-lg relative w-full border-2 border-[#0033A0] dark:border-white lg:h-52 md:h-48 sm:h-40 h-40"
                    src={project?.thumbnail}
                    alt={project?.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            </Link>

            <Link
                href={`/project/${project.slug}`}
                className="text-xl font-bold mt-4 hover:text-[#0033A0] dark:hover:text-blue-600 transition"
            >
                {project?.title}
            </Link>
            <div
                className="mt-2 tooltip !text-start cursor-pointer"
                data-tip={project.description}
            >
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.description}
                </p>
                <span className="text-sm text-[#0033A0] dark:text-blue-600">
                    [Hover to read more]
                </span>
            </div>
            {project.repo_link && (
                <div className="mt-4">
                    <Link
                        href={project?.repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0033A0] dark:text-blue-600 hover:underline font-medium"
                    >
                        <Github className="h-4 w-4" />
                        Code repository
                    </Link>
                </div>
            )}
            {project.link && (
                <div className="mt-1">
                    <Link
                        href={project?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0033A0] dark:text-blue-600 hover:underline font-medium"
                    >
                        <Radio className="h-4 w-4" />
                        Live product or documentation
                    </Link>
                </div>
            )}
            <div className="flex flex-wrap gap-2 mt-4 rounded">
                {project?.tech_stack.map((badge, index) => (
                    <img
                        key={index}
                        src={badge}
                        alt="skill"
                        className="!rounded h-6 w-auto"
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;
