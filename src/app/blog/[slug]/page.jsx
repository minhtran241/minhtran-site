import styles from './singlePost.module.css';
import { Suspense } from 'react';
import ShareButtons from '@/components/shareButtons/shareButtons';
import PostMetadata from '@/components/postMetadata/postMetadata';
import fs from 'fs/promises';
import path from 'path';
import MarkdownRender from '@/components/markdownRenderer/markdownRenderer';
import readingTime from 'reading-time';
import Loading from '@/app/loading';

// SEO metadata
export const generateMetadata = async ({ params }) => {
    const p = getPost(params.slug);
    return {
        title: p.title,
        description: p.description,
        image: p.thumbnail,
        author: 'Minh Tran',
        keywords: p.tags,
    };
};

// * Fetch data from local JSON
const DATA_ATTRS_FILENAME = 'blogs.json';
const DATA_ATTRS_DIR = path.join(process.cwd(), 'data', 'blog');
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, DATA_ATTRS_FILENAME);
const DATA_CONTENTS_DIR = path.join(DATA_ATTRS_DIR, 'contents');

const getPost = async (slug) => {
    try {
        // Read post data from JSON file
        const postsData = await fs.readFile(
            path.join(DATA_ATTRS_FILE),
            'utf-8'
        );
        const posts = JSON.parse(postsData);
        const post = posts.find((post) => post.slug === slug);

        const views = post.view_count + 1;
        post.view_count = views;
        // Write new view of this post to JSON file
        fs.writeFile(DATA_ATTRS_FILE, JSON.stringify(posts, null, 2), 'utf-8');

        const content = await fs.readFile(
            path.join(DATA_CONTENTS_DIR, `${slug}.md`),
            'utf-8'
        );
        post.content = content;

        const stats = readingTime(content);
        post.read_time = stats.minutes;

        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw new Error('Failed to fetch post');
    }
};

const SinglePostContent = ({ post }) => {
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
        <div className="mb-12">
            <div
                className={`${styles.hero} relative flex content-center items-center justify-center pt-12`}
            >
                <div
                    className="absolute top-0 w-full bg-cover bg-center bg-no-repeat h-[400px] pb-10"
                    style={{ backgroundImage: `url(${post.thumbnail})` }}
                >
                    <span
                        id="blackOverlay"
                        className="absolute h-full w-full bg-black opacity-75"
                    ></span>
                </div>
                <div className="relative flex items-center justify-center pb-4 pt-8">
                    <div className="py-16 text-center">
                        <div className="mx-auto px-4">
                            <div className="mx-auto max-w-5xl text-center">
                                <h1 className="text-2xl font-normal uppercase leading-[1.5] tracking-[3px] text-white dark:text-primary-title sm:text-xl md:text-[30px] md:tracking-[4px] lg:!leading-relaxed">
                                    {post.title}
                                </h1>
                            </div>
                            <div className="date-wrap mx-auto max-w-5xl text-center">
                                <p className="mt-6 text-[12px] font-thin uppercase tracking-[2px] text-white dark:text-primary-title">
                                    {createdAtText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 pt-10">
                <div className="-mx-4 flex flex-wrap justify-center pt-12">
                    <div className="w-full px-4 lg:w-8/12">
                        <div>
                            <div className="flex flex-wrap items-center justify-between ">
                                <PostMetadata post={post} />
                                <div className="mb-5">
                                    <ShareButtons />
                                </div>
                            </div>
                            <div className="mb-5 border-b border-[#e9e9e9] pb-[20px] text-justify text-lg font-light italic text-primary dark:border-white dark:border-opacity-10">
                                {post.description}
                            </div>
                            <div>
                                    <MarkdownRender mdString={post.content} />
                                <div className="items-center justify-between sm:flex">
                                    <div className="mb-5">
                                        {/* <PostUser userId={post.user_id} /> */}
                                    </div>
                                    <div className="mb-5">
                                        <h5 className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400 sm:text-right">
                                            Share this blog :
                                        </h5>
                                        <div className="flex items-center sm:justify-end">
                                            <ShareButtons />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SinglePostPage = async ({ params }) => {
    const { slug } = params;
    const post = await getPost(slug);

    return (
        <Suspense fallback={<Loading />}>
            <SinglePostContent post={post} />
        </Suspense>
    );
};

export default SinglePostPage;
