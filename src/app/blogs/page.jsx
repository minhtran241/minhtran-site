import PostCard from '@/components/Post/postCard/postCard';
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const PAGE_TITLE = 'Tech Blogs';
const PAGE_DESCRIPTION =
  'My write-ups on various topics, including software technologies, data related concepts and AI world.';

// SEO metadata
export const generateMetadata = async () => {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  };
};

// * Fetch data from local JSON
const DATA_ATTRS_DIR = path.join(fileSystemInfo.dataFetchDir, 'blogs');
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, 'blogs.json');

// * Fetch posts from file system
const getPosts = async (limit) => {
  try {
    const postsData = await fs.readFile(path.join(DATA_ATTRS_FILE), 'utf-8');
    let posts = JSON.parse(postsData);
    posts = posts.map((post) => ({
      ...post,
      tags: post.tags.split(',').map((tag) => tag.trim()),
    }));

    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return posts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

const CATEGORIES = [
  {
    name: 'ML/DL',
    icon: <FontAwesomeIcon icon='fa-duotone fa-head-side-gear' />,
  },
  {
    name: 'Web Development',
    icon: <FontAwesomeIcon icon='fa-duotone fa-browser' />,
  },
  {
    name: 'Databases',
    icon: <FontAwesomeIcon icon='fa-duotone fa-database' />,
  },
];

const BREADCRUMBS = [
  {
    href: '/blogs',
    text: 'Blogs',
  },
];

const BlogPage = async () => {
  const posts = await getPosts();
  const firstPost = posts[0];
  const otherPosts = posts.slice(1);

  const groupedPosts = CATEGORIES.map((category) => {
    const posts = otherPosts.filter((post) => post.category === category.name);
    return {
      ...category,
      posts,
    };
  });

  const sortedGroupedPosts = groupedPosts.sort((a, b) => {
    const latestPostA = a.posts[0];
    const latestPostB = b.posts[0];
    return (
      new Date(latestPostB?.created_at) - new Date(latestPostA?.created_at)
    );
  });

  return (
    <div className='container mx-auto mt-16 space-y-12 px-4 py-12'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      {/* Featured Post */}
      <article className='hero bg-base-100 border-base-300 rounded-3xl border shadow-xl'>
        <div className='hero-content flex-col gap-8 p-8 lg:flex-row'>
          <figure className='lg:w-1/2'>
            <Link href={`/blogs/${firstPost.slug}`}>
              <Image
                className='h-64 w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-105 lg:h-80'
                src={firstPost.thumbnail}
                alt={firstPost.title}
                width={600}
                height={320}
                priority
              />
            </Link>
          </figure>

          <div className='space-y-4 lg:w-1/2'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <time className='text-primary text-sm font-medium tracking-wide uppercase'>
                {new Date(firstPost?.created_at).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <div className='badge badge-secondary gap-2 px-4 py-3'>
                <FontAwesomeIcon icon='fa-duotone fa-sparkles' />
                Latest {firstPost.category}
              </div>
            </div>

            <Link
              href={`/blogs/${firstPost.slug}`}
              className='hover:text-primary block text-2xl leading-tight font-bold transition-colors duration-200 lg:text-3xl'
            >
              {firstPost.title}
            </Link>

            <p className='text-base-content/80 leading-relaxed'>
              {firstPost.description}
            </p>

            <div className='flex flex-wrap gap-2'>
              {firstPost.tags?.map((tag, index) => (
                <div
                  key={index}
                  className='badge badge-outline hover:badge-primary gap-1 transition-colors'
                >
                  <FontAwesomeIcon icon='fa-duotone fa-tag' />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Categories Section */}
      <div className='space-y-12'>
        {sortedGroupedPosts
          .filter((category) => category.posts.length > 0)
          .map((category, index) => (
            <section key={index} className='space-y-6'>
              <div className='flex items-center gap-3'>
                <div className='text-primary text-2xl'>{category.icon}</div>
                <h2 className='text-2xl font-bold lg:text-3xl'>
                  {category.name}
                </h2>
                <div className='from-base-300 h-px flex-1 bg-gradient-to-r to-transparent'></div>
              </div>

              <div className='grid gap-6'>
                {category.posts.map((post, postIndex) => (
                  <PostCard key={postIndex} post={post} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default BlogPage;
