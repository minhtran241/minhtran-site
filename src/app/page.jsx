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
    title: 'Minh Tran: Software/AI Researcher',
    description:
      'Software engineer and researcher specializing in AI systems, distributed computing, and backend architecture.',
    keywords: [
      'minhtran',
      'minh tran',
      'Minh Tran',
      'software engineer',
      'AI solutions architect',
      'backend engineer',
      'distributed systems',
      'machine learning',
      'portfolio',
      'system design',
    ],
    authors: [{ name: 'Minh Tran' }],
    openGraph: {
      title: 'Minh Tran: Software/AI Researcher',
      description:
        'Software engineer and researcher specializing in AI systems, distributed computing, and backend architecture.',
      type: 'website',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Minh Tran: Software/AI Researcher',
      description:
        'Software engineer and researcher specializing in AI systems, distributed computing, and backend architecture.',
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
