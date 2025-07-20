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

// SEO metadata
export const generateMetadata = async (props) => {
	const params = await props.params;
	const p = getPost(params.slug);
	return {
		title: p.title,
		description: p.description,
		image: p.thumbnail,
		author: 'Minh Tran',
		keywords: p.tags,
		canonical: process.env.NEXT_PUBLIC_BASE_URL + `/blogs/${p.slug}`,
		openGraph: {
			type: 'article',
			article: {
				publishedTime: p?.created_at,
				authors: ['Minh Tran'],
			},
			url: process.env.NEXT_PUBLIC_BASE_URL + `/blogs/${p?.slug}`,
			images: [
				{
					url: p?.thumbnail,
				},
			],
			siteName: 'Blog Minh Tran',
		},
	};
};

// * Fetch data from local JSON
const DATA_ATTRS_FILENAME = 'blogs.json';
const DATA_ATTRS_DIR = path.join(fileSystemInfo.dataFetchDir, 'blogs');
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, DATA_ATTRS_FILENAME);
const DATA_CONTENTS_DIR = path.join(DATA_ATTRS_DIR, 'contents');

const getPost = async (slug) => {
	try {
		// Read post data from JSON file
		const postsData = await fs.readFile(DATA_ATTRS_FILE, 'utf-8');
		const posts = JSON.parse(postsData);
		const post = posts.find((post) => post.slug === slug);
		post.tags = post.tags.split(',').map((tag) => tag.trim());
		const content = await fs.readFile(
			path.join(DATA_CONTENTS_DIR, `${slug}.md`),
			'utf-8'
		);
		post.content = content;

		const stats = readingTime(content);
		post.read_time = stats.text;
		post.word_count = stats.words;

		const prevId = post.id > 1 ? post.id - 1 : null;
		const nextId = post.id < posts.length ? post.id + 1 : null;

		post.prev = prevId ? posts.find((post) => post.id === prevId) : null;
		post.next = nextId ? posts.find((post) => post.id === nextId) : null;

		return post;
	} catch (error) {
		console.error('Error fetching post:', error);
		throw new Error('Failed to fetch post');
	}
};

const SinglePostContent = ({ post }) => {
	const BREADCRUMBS = [
		{
			href: '/blogs',
			text: 'Blogs',
		},
		{
			href: `/blogs/${post.slug}`,
			text: post.title,
		},
	];

	const createdAtText = new Date(post.created_at).toLocaleDateString(
		'en-US',
		{
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	);

	return (
		<div className="container flex flex-col gap-4 py-12 mt-16">
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />
			<div className="container bg-base-100 text-base-content rounded-box py-8">
				<div className="content-center items-center justify-center">
					<div className="flex flex-wrap justify-center">
						<div className="w-full justify-center lg:w-9/12">
							<h1 className="font-bold text-primary  mb-3 lg:text-3xl md:text-2xl sm:text-xl text-xl">
								{post.title}
							</h1>
							<p className="">{createdAtText}</p>
						</div>
					</div>
				</div>
				<div className="content-center items-center justify-center">
					<div className="flex flex-wrap justify-center">
						<div className="w-full justify-center lg:w-9/12">
							<div className="flex flex-wrap items-center justify-between">
								<PostMetadata post={post} />
								<div className="mb-5">
									<ShareButtons />
								</div>
							</div>
							<div className="mb-5">
								<Image
									src={post.thumbnail}
									alt={post.title}
									width={1200}
									height={600}
									// layout="responsive"
									className="rounded-box"
								/>
							</div>
							<p className="mb-5 font-semibold border-b border-gray-300 pb-[20px] lg:text-base md:text-base sm:text-sm text-sm">
								{post.description}
							</p>
							<div className="flex flex-col gap-4">
								<MarkdownRender mdString={post.content} />
								<div className="flex flex-row gap-2">
									<h5 className="mb-3 font-semibold">
										Tags:
									</h5>
									<div className="card-actions">
										{post.tags.map((tag, index) => (
											<div
												key={index}
												className="badge badge-outline flex items-center gap-1"
											>
												<FontAwesomeIcon icon="fa-duotone fa-tag" />
												{tag}
											</div>
										))}
									</div>
								</div>
								{/* Prev and Next cards */}
								<div className="justify-between grid grid-cols-1 gap-8 md:grid-cols-2">
									{post.prev && (
										<div className="flex flex-col gap-1 border p-4 rounded-box hover:border-primary  transition duration-300">
											<p className="text-sm text-gray-500">
												Older Blog
											</p>
											<Link
												href={`/blogs/${post.prev.slug}`}
												className="flex items-center gap-4 text-primary  font-semibold"
											>
												<FontAwesomeIcon icon="fa-duotone fa-chevrons-left" />
												{post.prev.title.length > 100
													? post.prev.title.slice(
														0,
														100
													) + '...'
													: post.prev.title}
											</Link>
										</div>
									)}
									{post.next && (
										<div className="flex flex-col gap-1 border p-4 rounded-box hover:border-primary  transition duration-300">
											<p className="text-sm text-right text-gray-500">
												Newer Blog
											</p>
											<Link
												href={`/blogs/${post.next.slug}`}
												className="flex items-center gap-4 text-primary font-semibold text-right"
											>
												{post.next.title.length > 100
													? post.next.title.slice(
														0,
														100
													) + '...'
													: post.next.title}{' '}
												<FontAwesomeIcon icon="fa-duotone fa-chevrons-right" />
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
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
