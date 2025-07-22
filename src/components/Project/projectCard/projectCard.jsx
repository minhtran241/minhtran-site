import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { TIMEZONE } from '@/common/constants/timezone';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ProjectCard = async ({ project }) => {
	// Format project name
	const projectName = project?.name
		?.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	// Format last updated time
	const getLastUpdated = () => {
		if (!project?.pushedAt) return null;
		const zonedDate = toZonedTime(
			fromZonedTime(project.pushedAt, TIMEZONE),
			TIMEZONE
		);
		return formatDistanceToNowStrict(zonedDate, { addSuffix: true });
	};

	const lastUpdated = getLastUpdated();
	const projectUrl = project?.homepageUrl || project?.url;
	const topics = project?.repositoryTopics?.nodes || [];
	const displayTopics = topics.slice(0, 5);
	const remainingTopics = topics.length > 5 ? topics.length - 5 : 0;

	return (
		<div className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300 border border-base-200/50 group h-full">
			<div className="flex flex-col lg:flex-row h-full">
				{/* Project Image */}
				<div className="flex-shrink-0 relative group-hover:overflow-hidden lg:w-1/3 h-48 lg:h-auto">
					<Link href={projectUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
						<div className="relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none h-full w-full">
							<Image
								src={project.thumbnail ? `/projects/${project.thumbnail}` : project?.openGraphImageUrl}
								alt={projectName}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-500"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</div>
					</Link>
				</div>

				{/* Content */}
				<div className="flex-1 p-6 flex flex-col h-full">
					{/* Header */}
					<div className="flex-1">
						<Link
							href={projectUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="card-title text-xl hover:text-primary transition-colors duration-200 group/title inline-flex items-center gap-2"
						>
							<span className="line-clamp-2">{projectName}</span>
							<FontAwesomeIcon
								icon="fa-duotone fa-arrow-up-right-from-square"
								className="text-xs opacity-0 group-hover/title:opacity-100 transition-opacity duration-200 flex-shrink-0"
							/>
						</Link>

						<p className="text-base-content/70 mt-4 line-clamp-3 leading-relaxed">
							{project?.description}
						</p>

						{/* Topics */}
						{displayTopics.length > 0 && (
							<div className="flex flex-wrap gap-2 mt-5">
								{displayTopics.map((node, index) => (
									<span key={index} className="badge badge-outline badge-sm hover:badge-primary transition-colors">
										{node?.topic?.name}
									</span>
								))}
								{remainingTopics > 0 && (
									<span className="badge badge-ghost badge-sm">+{remainingTopics}</span>
								)}
							</div>
						)}
					</div>

					{/* Stats Section */}
					<div className="mt-auto pt-6">
						{/* Main Stats Grid */}
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
							{/* Language */}
							{project?.primaryLanguage && (
								<div className="flex items-center gap-2">
									<div
										className="w-3 h-3 rounded-full flex-shrink-0"
										style={{ backgroundColor: project.primaryLanguage.color || '#6b7280' }}
									/>
									<span className="text-sm truncate">{project.primaryLanguage.name}</span>
								</div>
							)}

							{/* Stars */}
							<div className="flex items-center gap-2">
								<FontAwesomeIcon icon="fa-duotone fa-star" className="text-warning flex-shrink-0" />
								<span className="text-sm font-semibold">{project?.stargazerCount?.toLocaleString() || 0}</span>
							</div>

							{/* Forks */}
							<div className="flex items-center gap-2">
								<FontAwesomeIcon icon="fa-duotone fa-code-fork" className="flex-shrink-0" />
								<span className="text-sm font-semibold">{project?.forkCount?.toLocaleString() || 0}</span>
							</div>

							{/* Contributors */}
							<div className="flex items-center gap-2">
								<FontAwesomeIcon icon="fa-duotone fa-users" className="flex-shrink-0" />
								<span className="text-sm font-semibold">{project?.collaborators?.nodes?.length || 0}</span>
							</div>
						</div>

						{/* Footer */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-base-200 text-xs text-base-content/70">
							<div className="flex items-center gap-4">
								{project?.createdAt && (
									<div className="flex items-center gap-2">
										<FontAwesomeIcon icon="fa-duotone fa-calendar-days" />
										<span>
											{new Date(project.createdAt).toLocaleDateString('en-GB', {
												day: 'numeric',
												month: 'short',
												year: 'numeric'
											})}
										</span>
									</div>
								)}
								{project?.licenseInfo?.name && (
									<div className="flex items-center gap-2">
										<FontAwesomeIcon icon="fa-duotone fa-scale-balanced" />
										<span className="truncate">{project.licenseInfo.name}</span>
									</div>
								)}
							</div>

							{lastUpdated && (
								<div className="flex items-center gap-2">
									<FontAwesomeIcon icon="fa-duotone fa-clock" />
									<span className="whitespace-nowrap">{lastUpdated}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;