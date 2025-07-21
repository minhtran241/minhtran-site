import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Image from 'next/image';

// Helper function to format date
const formatDate = (date) =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
	});

// Helper function to calculate exact duration
const calculateDuration = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();

	// Adjust for negative months
	if (months < 0) {
		years -= 1;
		months += 12;
	}

	const yearStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
	const monthStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';

	return [yearStr, monthStr].filter(Boolean).join(' ');
};

// Helper function to split description into paragraphs
const getParagraphs = (description) =>
	description.split('#').filter((p) => p.trim().length > 0);

const Milestone = ({ milestone }) => {
	if (!milestone) return null;

	const startTimeStr = formatDate(milestone.start_date);
	const endTimeStr = milestone.current
		? 'Present'
		: formatDate(milestone.end_date);

	const durationStr = milestone.current
		? ''
		: calculateDuration(milestone.start_date, milestone.end_date);

	const timeStr = `${startTimeStr} - ${endTimeStr}`;
	const paragraphs = getParagraphs(milestone.description);

	return (
		// <div className="bg-gradient-to-r from-base-100 to-base-50 rounded-2xl p-6 shadow-lg border border-base-300/30 group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300 hover:border-primary/20">
		<div className='p-3'>
			<Link
				href={milestone.link}
				target="_blank"
				className="flex flex-col md:flex-row items-start gap-6 group/link"
			>
				{/* Company Avatar with enhanced styling */}
				{milestone.logo && (
					<div className="flex-shrink-0">
						<div className="avatar">
							<div className="w-16 h-16 rounded-xl ring-2 ring-base-300/50 ring-offset-2 ring-offset-base-100 group-hover/link:ring-primary/30">
								<Image
									src={milestone.logo}
									alt={`${milestone.title} logo`}
									loading="lazy"
									width={64}
									height={64}
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Milestone Content */}
				<div className="flex flex-col flex-1 gap-3 min-w-0">
					{/* Date with enhanced styling */}
					<div className="flex items-center gap-2">
						<div className="badge badge-primary badge-sm opacity-80">
							<FontAwesomeIcon icon="fa-solid fa-calendar" className="w-3 h-3 mr-1" />
							{milestone.current ? 'Current' : 'Past'}
						</div>
						<time className="text-sm text-primary font-semibold">
							{milestone.current
								? `${timeStr}`
								: `${timeStr} (${durationStr})`}
						</time>
					</div>

					{/* Title & Link with hover effect */}
					<div className="space-y-1">
						<h1 className="text-xl font-bold group-hover/link:text-primary flex items-center gap-2">
							{milestone.title}
							<FontAwesomeIcon icon="fa-solid fa-sm fa-external-link" className="opacity-0 group-hover/link:opacity-100" />
						</h1>
						<p className="text-base text-base-content/80">
							{milestone.sub_title}{' '}
							{milestone.employment_type && (
								<span className="text-primary">· {milestone.employment_type}</span>
							)}
						</p>
					</div>

					{/* Location with icon */}
					<div className="flex items-center gap-2 text-sm text-base-content/60">
						<FontAwesomeIcon icon="fa-solid fa-map-marker-alt" className="text-primary" />
						<span>
							{milestone.location}{' '}
							{milestone.location_type && (
								<span className="text-primary">· {milestone.location_type}</span>
							)}
						</span>
					</div>

					{/* Grade with enhanced styling */}
					{milestone.grade && (
						<div className="flex items-center gap-2">
							<div className="badge badge-secondary badge-outline">
								<FontAwesomeIcon icon="fa-solid fa-star" className="w-3 h-3 mr-1" />
								Grade: {milestone.grade}
							</div>
						</div>
					)}

					{/* Description with better spacing */}
					{paragraphs.length > 0 && (
						<div className="mt-4 space-y-3">
							{paragraphs.map((p, index) => (
								<div key={index} className="flex items-start gap-2">
									<FontAwesomeIcon
										icon="fa-solid fa-quote-left"
										className="text-base-content/60 w-4 h-4 mt-1"
									/>
									<p className="text-base text-base-content/80 leading-relaxed">
										{p.trim()}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</Link>
		</div>
	);
};

export default Milestone;