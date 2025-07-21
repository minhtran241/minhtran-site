import fs from 'fs/promises';
import path from 'path';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Link from 'next/link';

// Helper: Fetch milestones
const DATA_ATTRS_FILE = path.join(
	fileSystemInfo.dataFetchDir,
	'publications.json'
);

const getMilestones = async () => {
	try {
		const milestonesData = await fs.readFile(DATA_ATTRS_FILE, 'utf-8');
		const milestones = JSON.parse(milestonesData);
		return milestones.sort((a, b) => new Date(b.date) - new Date(a.date));
	} catch (error) {
		console.error('Error fetching publications:', error);
		return [];
	}
};

// Constants
const SECTION_TITLE = 'Research Work';
const SECTION_DESCRIPTION = '';

// Helper: Render Collaborators
const renderCollaborators = (collaborators) => (
	<div className="flex flex-wrap items-center gap-2 text-sm text-base-content/80">
		<FontAwesomeIcon icon="fa-duotone fa-users" className="text-primary text-base" />
		<div className="flex flex-wrap gap-1">
			{collaborators.map((collaborator, index) => (
				<span key={index} className="inline-flex items-center">
					<Link
						href={collaborator.link}
						className="link link-primary link-hover font-medium transition-colors duration-200 hover:text-primary-focus"
						target="_blank"
					>
						{collaborator.name}
					</Link>
					{index < collaborators.length - 1 && (
						<span className="ml-1 text-base-content/60">,</span>
					)}
				</span>
			))}
		</div>
	</div>
);

// Helper: Render DOI
const renderDOI = (doi) => (
	<div className="text-sm text-base-content/80">
		<span className="font-semibold text-base-content">DOI:</span>{' '}
		<Link
			href={doi}
			className="link link-primary font-mono text-xs bg-base-200 px-2 py-1 rounded transition-colors duration-200 hover:bg-base-300"
			target="_blank"
		>
			{doi.replace('https://doi.org/', '')}
		</Link>
	</div>
);

const Publications = async () => {
	const milestones = await getMilestones();

	return (
		<div className="container mx-auto px-4">
			<div className="bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl p-6 md:p-8 shadow-xl border border-base-300/50">
				<SectionLabel
					title={SECTION_TITLE}
					description={SECTION_DESCRIPTION}
					icon={
						<FontAwesomeIcon
							icon="fa-duotone fa-newspaper"
							className="text-primary"
						/>
					}
				/>

				{milestones.length === 0 ? (
					<div className="text-center py-12 text-base-content/60">
						<FontAwesomeIcon icon="fa-duotone fa-file-search" className="text-4xl mb-4 text-base-content/40" />
						<p>No publications available at the moment.</p>
					</div>
				) : (
					<div className="space-y-6 mt-6">
						{milestones.map((milestone, index) => (
							<article
								key={milestone.id}
								className="group relative overflow-hidden border border-base-300 rounded-lg bg-gradient-to-r from-base-100 to-base-200/50 hover:shadow-md  hover:border-primary/30"
							>
								{/* Accent line */}
								<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all duration-300"></div>

								<div className="p-6 pl-8">
									{/* Header with date and status */}
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
										<time
											className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit"
											dateTime={new Date(milestone.date).toISOString()}
										>
											{new Date(milestone.date).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
											})}
										</time>

										{milestone.status && (
											<span className="badge badge-primary badge-outline text-xs">
												{milestone.status}
											</span>
										)}
									</div>

									{/* Title */}
									<h2 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary">
										{milestone.title}
									</h2>

									{/* Collaborators */}
									{milestone.collaborators && (
										<div className="mb-4">
											{renderCollaborators(milestone.collaborators)}
										</div>
									)}

									{/* Description */}
									<p className="text-base-content/80 leading-relaxed mb-4">
										{milestone.description}
									</p>

									{/* Publication details */}
									<div className="space-y-2 mb-4">
										{milestone.journal && (
											<div className="text-sm">
												<span className="font-semibold text-base-content">Journal:</span>{' '}
												<span className="text-base-content/80 italic">{milestone.journal}</span>
											</div>
										)}

										{milestone.citation && (
											<div className="text-sm">
												<span className="font-semibold text-base-content">Citation:</span>{' '}
												<span className="text-base-content/80 font-mono text-xs bg-base-200 px-2 py-1 rounded">
													{milestone.citation}
												</span>
											</div>
										)}

										{milestone.doi && renderDOI(milestone.doi)}
									</div>

									{/* Action links */}
									{(milestone.paper_link || milestone.code_link) && (
										<div className="flex flex-wrap gap-3 pt-2 border-t border-base-300">
											{milestone.paper_link && (
												<Link
													href={milestone.paper_link}
													className="btn btn-primary btn-sm btn-outline gap-2 hover:btn-primary transition-all duration-200"
													target="_blank"
												>
													<FontAwesomeIcon icon="fa-duotone fa-file-pdf" />
													Paper
												</Link>
											)}
											{milestone.code_link && (
												<Link
													href={milestone.code_link}
													className="btn btn-secondary btn-sm btn-outline gap-2 hover:btn-secondary transition-all duration-200"
													target="_blank"
												>
													<FontAwesomeIcon icon="fa-duotone fa-code" />
													Source Code
												</Link>
											)}
										</div>
									)}
								</div>
							</article>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Publications;