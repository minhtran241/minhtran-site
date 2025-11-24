import { Suspense } from 'react';
import ShareButtons from '@/components/Post/shareButtons/shareButtons';
import PostMetadata from '@/components/Post/postMetadata/postMetadata';
import fs from 'fs/promises';
import path from 'path';
import readingTime from 'reading-time';
import Loading from '@/app/loading';
import Image from 'next/image';
import Link from 'next/link';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import Breadcrumbs from '@/common/elements/Breadcrumbs';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import MarkdownRender from '@/common/elements/MarkdownRenderer';
import { getBase64 } from '@/common/libs/plaiceholder';
import { SITE_URL } from '@/common/constants/site';

export const dynamic = 'force-dynamic'; // Ensures this route is always server-rendered

// SEO metadata
export const generateMetadata = async (props) => {
  const params = await props.params;
  const p = await getPost(params.slug);
  return {
    title: p.title,
    description: p.description,
    image: p.thumbnail,
    author: 'Minh Tran',
    keywords: p.tags,
    canonical: `${SITE_URL}/blogs/${p.slug}`,
    openGraph: {
      type: 'article',
      article: {
        publishedTime: p?.created_at,
        modifiedTime: p?.updated_at || p?.created_at,
        authors: ['Minh Tran'],
        tags: p.tags,
      },
      url: `${SITE_URL}/blogs/${p?.slug}`,
      images: [
        {
          url: p?.thumbnail,
          width: 1200,
          height: 630,
          alt: p?.title,
        },
      ],
      siteName: 'Minh Tran',
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
      images: [p?.thumbnail],
      creator: '@minhtran241',
    },
  };
};

// Data fetching constants
const DATA_ATTRS_FILENAME = 'blogs.json';
const DATA_ATTRS_DIR = path.join(fileSystemInfo.dataFetchDir, 'blogs');
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, DATA_ATTRS_FILENAME);
const DATA_CONTENTS_DIR = path.join(DATA_ATTRS_DIR, 'contents');

const getPost = async (slug) => {
  try {
    const postsData = await fs.readFile(DATA_ATTRS_FILE, 'utf-8');
    const posts = JSON.parse(postsData);
    const post = posts.find((post) => post.slug === slug);
    post.base64 = await getBase64(post.thumbnail);

    if (!post) throw new Error('Post not found');

    post.tags = post.tags.split(',').map((tag) => tag.trim());

    const content = await fs.readFile(
      path.join(DATA_CONTENTS_DIR, `${slug}.md`),
      'utf-8',
    );
    post.content = content;

    const stats = readingTime(content);
    post.read_time = stats.text;
    post.word_count = stats.words;

    // Find previous and next posts
    const prevId = post.id > 1 ? post.id - 1 : null;
    const nextId = post.id < posts.length ? post.id + 1 : null;
    post.prev = prevId ? posts.find((p) => p.id === prevId) : null;
    post.next = nextId ? posts.find((p) => p.id === nextId) : null;

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
};

const SinglePostContent = ({ post }) => {
  const BREADCRUMBS = [
    { href: '/blogs', text: 'Blogs' },
    { href: `/blogs/${post.slug}`, text: post.title },
  ];

  const createdAtText = new Date(post.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.thumbnail,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Person',
      name: 'Minh Tran',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Minh Tran',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.word_count,
  };

  return (
    <div className='flex flex-col gap-4'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      <article>
        <div className='mx-auto max-w-6xl'>
          {/* Header Section */}
          <header className='mb-8 text-center'>
            <h1 className='text-primary mb-4 text-xl leading-tight font-bold md:text-2xl lg:text-3xl'>
              {post.title}
            </h1>
            <time
              className='text-base-content/70 text-lg'
              dateTime={post.created_at}
            >
              {createdAtText}
            </time>
          </header>

          {/* Metadata and Share Buttons */}
          <div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
            <PostMetadata post={post} />
            <ShareButtons />
          </div>

          {/* Featured Image */}
          <div className='mb-8'>
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={1200}
              height={600}
              className='rounded-box h-auto w-full shadow-lg'
              priority
              placeholder='blur'
              blurDataURL={post.base64}
            />
          </div>

          {/* Description */}
          <div className='mb-8'>
            <p className='text-base-content/80 border-base-300 border-b pb-6 text-lg leading-relaxed font-medium'>
              {post.description}
            </p>
          </div>

          {/* Content */}
          <div className='prose prose-lg mb-8 max-w-none'>
            <MarkdownRender mdString={post.content} />
          </div>

          {/* Tags */}
          <div className='mb-12 flex flex-wrap items-center gap-2'>
            <h5 className='text-base-content font-semibold'>Tags:</h5>
            {post.tags.map((tag, index) => (
              <span key={index} className='badge badge-outline gap-2'>
                <FontAwesomeIcon icon='fa-duotone fa-tag' />
                {tag}
              </span>
            ))}
          </div>

          {/* Navigation */}
          <nav className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {post.prev && (
              <Link
                href={`/blogs/${post.prev.slug}`}
                className='group card card-border hover:card-compact hover:border-primary transition-all duration-300'
              >
                <div className='card-body'>
                  <div className='text-base-content/60 mb-2 text-sm'>
                    ← Older Post
                  </div>
                  <h3 className='card-title text-primary group-hover:text-primary-focus transition-colors'>
                    {post.prev.title.length > 60
                      ? `${post.prev.title.slice(0, 60)}...`
                      : post.prev.title}
                  </h3>
                </div>
              </Link>
            )}

            {post.next && (
              <Link
                href={`/blogs/${post.next.slug}`}
                className='group card card-border hover:card-compact hover:border-primary transition-all duration-300 md:text-right'
              >
                <div className='card-body'>
                  <div className='text-base-content/60 mb-2 text-sm'>
                    Newer Post →
                  </div>
                  <h3 className='card-title text-primary group-hover:text-primary-focus transition-colors md:justify-end'>
                    {post.next.title.length > 60
                      ? `${post.next.title.slice(0, 60)}...`
                      : post.next.title}
                  </h3>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </div>
  );
};

const SinglePostPage = async (props) => {
  const params = await props.params;
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <Suspense fallback={<Loading />}>
      <SinglePostContent post={post} />
    </Suspense>
  );
};

export default SinglePostPage;
