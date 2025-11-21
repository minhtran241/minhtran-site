import Employment from '@/components/Home/employment/employment';
// import Projects from '@/components/Project/projects/projects';
import Hero from '@/components/Home/hero/hero';
import Contribution from '@/components/Home/contribution/contribution';
import Education from '@/components/Home/education/education';
import Publications from '@/components/Home/publications/publications';
import NewsLogs from '@/components/Home/newslogs/newslogs';

export const dynamic = 'force-dynamic'; // Ensures this route is always server-rendered

export const generateMetadata = async () => {
  return {
    title: 'Minh Tran - Software Engineer & Data Engineer',
    description:
      "Welcome to Minh Tran's personal website. Explore insights on software engineering, data engineering, and technology.",
    keywords: [
      'minhtran',
      'minh tran',
      'Minh Tran',
      'software engineer',
      'data engineer',
      'personal website',
      'software engineering',
      'data science',
      'portfolio',
      'web development',
    ],
    authors: [{ name: 'Minh Tran' }],
    openGraph: {
      title: 'Minh Tran - Software Engineer & Data Engineer',
      description:
        "Welcome to Minh Tran's personal website. Explore insights on software engineering, data engineering, and technology.",
      type: 'website',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Minh Tran - Software Engineer & Data Engineer',
      description:
        "Welcome to Minh Tran's personal website. Explore insights on software engineering, data engineering, and technology.",
      images: ['/og-image.jpg'],
    },
  };
};

const Home = () => {
  return (
    <div className='flex flex-col gap-10'>
      <Hero />
      {/* <Skills /> */}
      <NewsLogs />
      <Publications />
      <Employment />
      <Education />
      {/* <Contribution /> */}
      {/* <Skills /> */}
      {/* <Projects /> */}
    </div>
  );
};

export default Home;
