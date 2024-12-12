import Employment from '@/components/Home/employment/employment';
// import Projects from '@/components/Project/projects/projects';
import Hero from '@/components/Home/hero/hero';
import Skills from '@/components/Home/skills/skills';
import Contribution from '@/components/Home/contribution/contribution';
import Education from '@/components/Home/education/education';
import Publications from '@/components/Home/publications/publications';

export const generateMetadata = async () => {
    return {
        title: 'Minh Tran - Software Engineer & Data Engineer',
        description:
            "Welcome to Minh Tran's personal website. Explore insights on software engineering, data engineer, and more.",
        keywords: [
            'minhtran',
            'minh tran',
            'Minh Tran',
            'software engineer',
            'data engineer',
            'personal website',
            'software engineering',
            'data science',
        ],
        author: 'Minh Tran',
        url: 'https://minhtran.com',
        image: '/minhtran-ava.png',
    };
};

const Home = () => {
    return (
        <div className="flex flex-col gap-6">
            <Hero />
            <Skills />
            <Contribution />
            <Employment />
            <Education />
            <Publications />
            {/* <Contribution /> */}
            {/* <Skills /> */}
            {/* <Projects /> */}
        </div>
    );
};

export default Home;
