import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const PostMetadata = ({ post }) => {
  const updatedAtText = new Date(post.updated_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className='flex flex-col items-center'>
      <div className='mb-5 flex flex-col text-sm font-medium'>
        <div className='mr-5 flex flex-row items-center gap-2'>
          <FontAwesomeIcon icon='fa-duotone fa-file-circle-info' />
          {post.word_count} words
          <FontAwesomeIcon icon='fa-solid fa-minus' />
          <FontAwesomeIcon icon='fa-duotone fa-timer' />
          {post.read_time}
        </div>
        <p className='mr-5 flex flex-row items-center gap-2'>
          <FontAwesomeIcon icon='fa-duotone fa-pen-nib' />
          Last updated on {updatedAtText}
        </p>
      </div>
    </div>
  );
};

export default PostMetadata;
