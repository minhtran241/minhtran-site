import Loading from '@/app/loading';
import Milestone from '../milestone/milestone';
import fs from 'fs/promises';
import path from 'path';
import { Suspense } from 'react';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { getBase64 } from '@/common/libs/plaiceholder';

// * FETCH MILESTONES FROM LOCAL JSON
const DATA_ATTRS_FILE = path.join(
  fileSystemInfo.dataFetchDir,
  'employment.json',
);
const getMilestones = async () => {
  const milestonesData = await fs.readFile(path.join(DATA_ATTRS_FILE), 'utf-8');
  const milestones = JSON.parse(milestonesData);
  const bases64s = await Promise.all(milestones.map((m) => getBase64(m.logo)));
  milestones.forEach((m, index) => {
    m.base64 = bases64s[index];
  });
  const sortedMilestones = milestones.sort((a, b) => {
    return new Date(b.end_date) - new Date(a.end_date);
  });
  return sortedMilestones;
};

const SECTION_TITLE = 'Employment History';
const SECTION_DESCRIPTION =
  'A timeline of my professional experiences and roles in the tech industry.';

const EmploymentComponent = async () => {
  const milestones = await getMilestones();

  return (
    <div className=''>
      {/* <div className='border-base-300/50 bg-base-100 rounded-2xl border p-5 shadow-lg md:p-6'> */}
      <div className='mb-4'>
        <SectionLabel
          title={SECTION_TITLE}
          description={SECTION_DESCRIPTION}
          icon=<FontAwesomeIcon icon='fa-duotone fa-briefcase' />
        />
      </div>

      <ul className='timeline timeline-compact timeline-vertical timeline-snap-icon'>
        {milestones.map((milestone, index) => (
          <li key={index}>
            {index !== 0 && <hr className='bg-primary' />}
            <div className='timeline-middle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='text-primary h-4 w-4'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                  clipRule='evenodd'
                />
              </svg>
            </div>

            <div className='timeline-end timeline-box w-full p-0'>
              <Milestone
                milestone={milestone}
                first={index === 0}
                last={index === milestones.length - 1}
                timeline_end={index % 2 === 0}
              />
            </div>
            {index !== milestones.length - 1 && <hr className='bg-primary' />}
          </li>
        ))}
      </ul>
      {/* </div> */}
    </div>
  );
};

const Employment = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EmploymentComponent />
    </Suspense>
  );
};

export default Employment;
