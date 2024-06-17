import { getUsername } from '../helpers';

const FULL_NAME = 'Minh Tran';
const ABOUT = [
    'Built scalable and high-performance software solutions serving over 10,000 users.',
    'Contributed to published research papers in the field of Edge Computing and IoT.',
    'Experience in developing and deploying Machine Learning models for real-world applications.',
];
const CURRENT_JOB = 'Software / Data / AI Engineer';
const CURRENT_ORG = 'Grand Valley State University';
const CURRENT_ORG_LINK = 'https://www.gvsu.edu/';
const CURRENT_ROLE = 'B.S in Computer and Information Sciences';

const GITHUB_LINK = 'https://github.com/minhtran241';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/tranmiq';
const FACEBOOK_LINK = 'https://www.facebook.com/minhtran.venus.dev';
const FACEBOOK_USERNAME = 'Minh Tran';
const INSTAGRAM_LINK = 'https://www.instagram.com/minhtran.ig';
const TWITTER_LINK = 'https://twitter.com/QuangMi17303138';
const EMAIL = 'trqminh24@gmail.com';

export const userBasicInfo = {
    fullName: FULL_NAME,
    about: ABOUT,
    currentJob: CURRENT_JOB,
    currentOrg: CURRENT_ORG,
    currentOrgLink: CURRENT_ORG_LINK,
    currentRole: CURRENT_ROLE,
    githubUsername: getUsername('github.com/', GITHUB_LINK),
    githubLink: GITHUB_LINK,
    linkedinUsername: getUsername('linkedin.com/', LINKEDIN_LINK),
    linkedinLink: LINKEDIN_LINK,
    facebookUsername: FACEBOOK_USERNAME,
    facebookLink: FACEBOOK_LINK,
    instagramUsername: getUsername('instagram.com/', INSTAGRAM_LINK),
    instagramLink: INSTAGRAM_LINK,
    twitterUsername: getUsername('twitter.com/', TWITTER_LINK),
    twitterLink: TWITTER_LINK,
    email: EMAIL,
    bookACallLink: 'https://cal.com/minhtran/30min',
};
