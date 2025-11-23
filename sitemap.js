import { SITE_URL } from '@/common/constants/site';
import fs from 'fs/promises';
import path from 'path';

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/github`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  let blogPages = [];
  try {
    const blogsData = await fs.readFile(
      path.join(process.cwd(), 'data/blogs/blogs.json'),
      'utf-8',
    );
    const blogs = JSON.parse(blogsData);
    blogPages = blogs
      .filter((post) => post.is_published)
      .map((post) => ({
        url: `${SITE_URL}/blogs/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
  } catch (error) {
    console.error('Error loading blog posts for sitemap:', error);
  }

  return [...staticPages, ...blogPages];
}
