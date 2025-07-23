import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post }) => {
  const createdAt = new Date(post.created_at);
  const month = createdAt.toLocaleString('default', { month: 'short' });
  const date = createdAt.getDate();

  return (
    <article className='card lg:card-side bg-base-100 border-base-300 group border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
      {/* Image Section */}
      <figure className='relative w-full overflow-hidden lg:w-80'>
        <Link href={`/blogs/${post.slug}`}>
          <Image
            className='h-48 w-full object-cover lg:h-full'
            src={post.thumbnail}
            alt={post.title}
            width={320}
            height={192}
            placeholder='blur'
            blurDataURL={post.base64}
            loading='lazy'
          />
          {/* Date Badge */}
          <div className='bg-secondary text-secondary-content border-base-100 absolute top-4 right-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 shadow-lg'>
            <span className='text-sm font-bold'>{date}</span>
            <span className='text-xs uppercase'>{month}</span>
          </div>
        </Link>
      </figure>

      {/* Content Section */}
      <div className='card-body p-6 lg:flex-1'>
        <Link
          href={`/blogs/${post.slug}`}
          className='card-title hover:text-primary line-clamp-2 text-xl font-bold'
        >
          {post.title}
        </Link>

        <p className='text-base-content/70 line-clamp-3 leading-relaxed'>
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='card-actions mt-4 justify-start'>
            {post.tags.slice(0, 3).map((tag, index) => (
              <div
                key={index}
                className='badge badge-ghost hover:badge-primary cursor-pointer gap-1'
              >
                <span className='text-xs'>#</span>
                {tag}
              </div>
            ))}
            {post.tags.length > 3 && (
              <div className='badge badge-outline'>
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
