import path from 'path';

const DATA_FETCH_DIR = 'data';
const RESUME_LINK = '/home/minhtran-resume.pdf';
const HEADSHOT = '/home/headshot.png';

export const fileSystemInfo = {
  headshot: HEADSHOT,
  heroBg: '/home/hero-bg.png',
  dataFetchDir: path.join(process.cwd(), DATA_FETCH_DIR),
  resumeLink: RESUME_LINK,
  resumeFileName: 'minhtranResume.pdf',
};
