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
	<p className="text-sm flex flex-wrap gap-2 items-center">
		<FontAwesomeIcon icon="fa-duotone fa-users" className="text-primary" />
		{collaborators.map((collaborator, index) => (
			<span key={index}>
				<Link
					href={collaborator.link}
					className="link link-primary link-hover"
					target="_blank"
				>
					{collaborator.name}
				</Link>
				{index < collaborators.length - 1 && ', '}
			</span>
		))}
	</p>
);

// Helper: Render DOI
const renderDOI = (doi) => (
	<p className="text-sm">
		<span className="font-semibold">DOI:</span>{' '}
		<Link href={doi} className="link link-primary" target="_blank">
			{doi}
		</Link>
	</p>
);

const Publications = async () => {
	const milestones = await getMilestones();

	return (
		<div className="container mx-auto px-4">
			<div className="bg-base-100 rounded-box shadow-lg p-6 md:p-8">
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
				<ul className="flex flex-col gap-6 list-none mt-4">
					{milestones.map((milestone) => (
						<article
							key={milestone.id}
							className="border-l-4 border-primary p-4 rounded-md bg-base-100 shadow-sm"
						>
							<div className="flex flex-col gap-2">
								{/* Publication Date */}
								<time
									className="text-sm text-primary font-semibold"
									dateTime={new Date(
										milestone.date
									).toISOString()}
								>
									{new Date(
										milestone.date
									).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
									})}
								</time>

								{/* Title and status badge */}
								<div className="flex flex-wrap items-center gap-2">
									<h1 className="text-lg font-bold">
										{milestone.title}
									</h1>
									{milestone.status && (
										<span className="badge badge-primary badge-soft">
											{milestone.status}
										</span>
									)}
								</div>

								{/* Collaborators */}
								{milestone.collaborators &&
									renderCollaborators(
										milestone.collaborators
									)}

								{/* Description */}
								<p className="text-sm">
									{milestone.description}
								</p>

								{/* Journal and Citation */}
								{milestone.journal && (
									<p className="text-sm">
										<span className="font-semibold">
											Journal:
										</span>{' '}
										{milestone.journal}
									</p>
								)}
								{milestone.citation && (
									<p className="text-sm">
										<span className="font-semibold">
											Citation:
										</span>{' '}
										{milestone.citation}
									</p>
								)}

								{/* DOI */}
								{milestone.doi && renderDOI(milestone.doi)}

								{/* Links: Paper & Source Code */}
								<div className="flex flex-wrap gap-2 mt-2">
									{milestone.paper_link && (
										<Link
											href={milestone.paper_link}
											className="link link-primary link-hover"
											target="_blank"
										>
											[Paper]
										</Link>
									)}
									{milestone.code_link && (
										<Link
											href={milestone.code_link}
											className="link link-primary link-hover"
											target="_blank"
										>
											[Source Code]
										</Link>
									)}
								</div>
							</div>
						</article>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Publications;
