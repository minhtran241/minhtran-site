import Loading from '@/app/loading';
import Milestone from '../milestone/milestone';
import fs from 'fs/promises';
import path from 'path';
import { Suspense } from 'react';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

// * FETCH MILESTONES FROM LOCAL JSON
const DATA_ATTRS_FILE = path.join(
  fileSystemInfo.dataFetchDir,
  'employment.json',
);
const getMilestones = async () => {
  const milestonesData = await fs.readFile(path.join(DATA_ATTRS_FILE), 'utf-8');
  const milestones = JSON.parse(milestonesData);
  const sortedMilestones = milestones.sort((a, b) => {
    return new Date(b.end_date) - new Date(a.end_date);
  });
  return sortedMilestones;
};

const SECTION_TITLE = 'Employment History';
const SECTION_DESCRIPTION = '';

const EmploymentComponent = async () => {
  const milestones = await getMilestones();

  return (
    <div className='container mx-auto px-4'>
      <div className='from-base-100 to-base-200/30 border-base-300/50 rounded-2xl border bg-gradient-to-br p-6 shadow-xl md:p-8'>
        <div className='mb-8'>
          <SectionLabel
            title={SECTION_TITLE}
            description={SECTION_DESCRIPTION}
            icon=<FontAwesomeIcon icon='fa-duotone fa-briefcase' />
          />
        </div>

        {/* <div className="relative"> */}
        {/* Timeline line with gradient */}
        {/* <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-transparent"></div> */}

        <ul className='timeline timeline-compact timeline-vertical'>
          {milestones.map((milestone, index) => (
            <li key={index} className=''>
              {index !== 0 && <hr className='bg-primary' />}
              <div className='timeline-middle'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='text-primary h-5 w-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              {/* Timeline dot */}
              {/* <div className="absolute left-5 w-4 h-4 bg-primary rounded-full border-4 border-base-100 shadow-lg z-10"></div> */}

              {/* Content card */}
              <div className='timeline-end timeline-box w-full'>
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
        {/* </div>
			</div> */}
      </div>
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
