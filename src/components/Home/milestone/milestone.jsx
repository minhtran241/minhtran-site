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
		<Link
			href={milestone.link}
			target="_blank"
			className="flex flex-col md:flex-row items-start gap-4 p-4 hover:bg-base-200 rounded-r-box transition-colors duration-300"
		>
			{/* Company Avatar */}
			{milestone.logo && (
				<div className="avatar">
					<div className="w-14 h-14 rounded">
						<Image
							src={milestone.logo}
							alt={`${milestone.title} logo`}
							loading="lazy"
							width={56}
							height={56}
						/>
					</div>
				</div>
			)}

			{/* Milestone Content */}
			<div className="flex flex-col flex-1 gap-1">
				{/* Date */}
				<time className="text-sm text-primary font-semibold">
					{milestone.current
						? `${timeStr}`
						: `${timeStr} (${durationStr})`}
				</time>

				{/* Title & Link */}
				<h1 className="text-lg font-bold">{milestone.title}</h1>
				<p className="text-sm">
					{milestone.sub_title}{' '}
					{milestone.employment_type
						? `· ${milestone.employment_type}`
						: ''}
				</p>

				{/* Address */}
				<p className="text-sm text-gray-500 flex items-center gap-2">
					<FontAwesomeIcon icon="fa-solid fa-map-marker-alt" />
					{milestone.location}{' '}
					{milestone.location_type
						? `· ${milestone.location_type}`
						: ''}
				</p>

				{/* Grade */}
				{milestone.grade && (
					<p className="text-sm">
						<strong>Grade:</strong> {milestone.grade}
					</p>
				)}

				{/* Description */}
				<ul className="fa-ul mt-4 space-y-2">
					{paragraphs.map((p, index) => (
						<li key={index} className="flex items-start gap-2">
							<span className="fa-li text-primary">
								<FontAwesomeIcon icon="fa-duotone fa-circle-check" />
							</span>
							<p className="text-sm">{p.trim()}</p>
						</li>
					))}
				</ul>
			</div>
		</Link>
	);
};

export default Milestone;
