import { Suspense } from 'react';
import fs from 'fs/promises';
import path from 'path';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { getBase64 } from '@/common/libs/plaiceholder';
import SectionLabel from '@/components/Home/sectionLabel/sectionLabel';
import BlogSearch from '@/components/Post/BlogSearch';
import {
  BlogGridSkeleton,
  SectionHeaderSkeleton,
} from '@/components/Common/Loading';

export const dynamic = 'force-dynamic'; // Ensures this route is always server-rendered

const PAGE_TITLE = 'Tech Blogs';
const PAGE_DESCRIPTION =
  'Exploring software technologies, data engineering concepts, machine learning, and the evolving world of AI.';

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
    const base64s = await Promise.all(
      posts.map((post) => getBase64(post.thumbnail)),
    );
    posts = posts.map((post, index) => ({
      ...post,
      tags: post.tags.split(',').map((tag) => tag.trim()),
      base64: base64s[index],
    }));

    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return posts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

const BREADCRUMBS = [
  {
    href: '/blogs',
    text: 'Blogs',
  },
];

// Async component for blog content
const BlogContent = async () => {
  const posts = await getPosts();
  return <BlogSearch posts={posts} />;
};

// Loading fallback for blog content
const BlogContentSkeleton = () => (
  <div className='space-y-6'>
    {/* Search bar skeleton */}
    <div className='bg-base-200 h-12 w-full animate-pulse rounded-lg' />
    {/* Blog grid skeleton */}
    <BlogGridSkeleton count={6} />
  </div>
);

const BlogPage = () => {
  return (
    <div className='space-y-12'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      {/* Page Header */}
      <div>
        <SectionLabel
          title={PAGE_TITLE}
          description={PAGE_DESCRIPTION}
          icon={<FontAwesomeIcon icon='fa-duotone fa-newspaper' />}
        />
      </div>

      {/* All Posts with Search */}
      <Suspense fallback={<BlogContentSkeleton />}>
        <BlogContent />
      </Suspense>
    </div>
  );
};

export default BlogPage;
