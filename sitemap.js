import { SITE_URL } from '@/common/constants/site';

// Import your data fetching functions if available
// import { getAllBlogPosts } from '@/lib/blog';
// import { getAllProjects } from '@/lib/projects';

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
			url: `${SITE_URL}/home/minhtran-resume.pdf`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
	];

	// Dynamic blog posts (uncomment when you have blog functionality)
	// const blogPosts = await getAllBlogPosts();
	// const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
	// 	url: `${SITE_URL}/blog/${post.slug}`,
	// 	lastModified: new Date(post.updatedAt || post.publishedAt),
	// 	changeFrequency: 'monthly' as const,
	// 	priority: 0.6,
	// }));

	// Dynamic project pages (uncomment when you have project functionality)
	// const projects = await getAllProjects();
	// const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
	// 	url: `${SITE_URL}/projects/${project.slug}`,
	// 	lastModified: new Date(project.updatedAt),
	// 	changeFrequency: 'monthly' as const,
	// 	priority: 0.5,
	// }));

	return [
		...staticPages,
		// ...blogPages,
		// ...projectPages,
	];
}