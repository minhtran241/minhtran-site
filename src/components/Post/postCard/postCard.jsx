import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post }) => {
	const createdAt = new Date(post.created_at);
	const month = createdAt.toLocaleString('default', { month: 'short' });
	const date = createdAt.getDate();

	return (
		<article className="card lg:card-side bg-base-100 shadow-lg hover:shadow-xl border border-base-300 transition-all duration-300 hover:scale-[1.02] group">
			{/* Image Section */}
			<figure className="lg:w-80 w-full relative overflow-hidden">
				<Link href={`/blogs/${post.slug}`}>
					<Image
						className="w-full h-48 lg:h-full object-cover"
						src={post.thumbnail}
						alt={post.title}
						width={320}
						height={192}
						loading="lazy"
					/>
					{/* Date Badge */}
					<div className="absolute top-4 right-4 bg-secondary text-secondary-content rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-lg border-2 border-base-100">
						<span className="font-bold text-sm">{date}</span>
						<span className="text-xs uppercase">{month}</span>
					</div>
				</Link>
			</figure>

			{/* Content Section */}
			<div className="card-body lg:flex-1 p-6">
				<Link
					href={`/blogs/${post.slug}`}
					className="card-title text-xl font-bold hover:text-primary line-clamp-2"
				>
					{post.title}
				</Link>

				<p className="text-base-content/70 line-clamp-3 leading-relaxed">
					{post.description}
				</p>

				{/* Tags */}
				{post.tags && post.tags.length > 0 && (
					<div className="card-actions justify-start mt-4">
						{post.tags.slice(0, 3).map((tag, index) => (
							<div
								key={index}
								className="badge badge-ghost gap-1 hover:badge-primary cursor-pointer"
							>
								<span className="text-xs">#</span>
								{tag}
							</div>
						))}
						{post.tags.length > 3 && (
							<div className="badge badge-outline">
								+{post.tags.length - 3} more
							</div>
						)}
					</div>
				)}
			</div>
		</article>
	);
};

export default PostCard;