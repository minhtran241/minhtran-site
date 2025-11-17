import Image from 'next/image';
import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const PostCard = ({ post }) => {
  const createdAt = new Date(post.created_at);
  const formattedDate = createdAt.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className='card bg-base-100 group shadow-sm'>
      <figure className='relative h-48'>
        <Image
          src={post.thumbnail}
          alt={post.title}
          className='h-full w-full object-cover'
          placeholder='blur'
          blurDataURL={post.base64}
          loading='lazy'
          fill
          style={{ objectFit: 'cover' }}
        />

        {/* Category Badge */}
        <div className='absolute top-4 left-4'>
          <span className='badge badge-primary gap-1.5 px-3 py-2.5 shadow-lg'>
            <FontAwesomeIcon icon='fa-duotone fa-folder' className='text-xs' />
            {post.category}
          </span>
        </div>
      </figure>

      <div className='card-body'>
        {/* Date */}
        <div className='mb-3 flex items-center gap-1.5 text-sm'>
          <FontAwesomeIcon
            icon='fa-duotone fa-calendar-days'
            className='text-primary text-xs'
          />
          <time dateTime={post.created_at} className='font-medium'>
            {formattedDate}
          </time>
        </div>

        {/* Title */}
        <h3 className='card-title group-hover:text-primary line-clamp-2'>
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Description */}
        <p className='mb-4 line-clamp-3 flex-1 text-sm leading-relaxed'>
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='card-actions'>
            {post.tags.slice(0, 4).map((tag, index) => (
              <div key={index} className='badge badge-outline badge-sm'>
                {tag}
              </div>
            ))}
            {post.tags.length > 4 && (
              <div className='badge badge-ghost badge-xs'>
                +{post.tags.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
