export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tranmq.vercel.app'
    : 'http://localhost:3000';

export const SITE_NAME = 'Minh Tran';
export const SITE_TITLE = 'Minh Tran - Software Engineer / Data Engineer';
export const SITE_DESCRIPTION =
  'Personal website of Minh Tran, a software engineer and data engineer.';

export const TECHSTACK = {
  'Next.js': 'https://nextjs.org/',
  'Tailwind CSS': 'https://tailwindcss.com/',
  daisyUI: 'https://daisyui.com/',
  'Font Awesome': 'https://fontawesome.com/',
};

export const HOSTED_ON = {
  name: 'Vercel',
  url: 'https://vercel.com/',
};
