import fs from 'fs/promises';
import path from 'path';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Link from 'next/link';

// Helper: Fetch milestones
const DATA_ATTRS_FILE = path.join(
  fileSystemInfo.dataFetchDir,
  'publications.json',
);

const getMilestones = async () => {
  try {
    const milestonesData = await fs.readFile(DATA_ATTRS_FILE, 'utf-8');
    const milestones = JSON.parse(milestonesData);
    return milestones.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
};

// Constants
const SECTION_TITLE = 'Research Work';
const SECTION_DESCRIPTION = '';

// Helper: Render Collaborators
const renderCollaborators = (collaborators) => (
  <div className='text-base-content/80 flex flex-wrap items-center gap-2 text-sm'>
    <FontAwesomeIcon
      icon='fa-duotone fa-users'
      className='text-primary text-base'
    />
    <div className='flex flex-wrap gap-1'>
      {collaborators.map((collaborator, index) => (
        <span key={index} className='inline-flex items-center'>
          <Link
            href={collaborator.link}
            className='link link-primary link-hover hover:text-primary-focus font-medium transition-colors duration-200'
            target='_blank'
          >
            {collaborator.name}
          </Link>
          {index < collaborators.length - 1 && (
            <span className='text-base-content/60 ml-1'>,</span>
          )}
        </span>
      ))}
    </div>
  </div>
);

// Helper: Render DOI
const renderDOI = (doi) => (
  <div className='text-base-content/80 text-sm'>
    <span className='text-base-content font-semibold'>DOI:</span>{' '}
    <Link
      href={doi}
      className='link link-primary bg-base-200 hover:bg-base-300 rounded px-2 py-1 font-mono text-xs transition-colors duration-200'
      target='_blank'
    >
      {doi.replace('https://doi.org/', '')}
    </Link>
  </div>
);

const Publications = async () => {
  const milestones = await getMilestones();

  return (
    <div className='container mx-auto px-4'>
      <div className='from-base-100 to-base-200/30 border-base-300/50 rounded-2xl border bg-gradient-to-br p-6 shadow-xl md:p-8'>
        <SectionLabel
          title={SECTION_TITLE}
          description={SECTION_DESCRIPTION}
          icon={
            <FontAwesomeIcon
              icon='fa-duotone fa-newspaper'
              className='text-primary'
            />
          }
        />

        {milestones.length === 0 ? (
          <div className='text-base-content/60 py-12 text-center'>
            <FontAwesomeIcon
              icon='fa-duotone fa-file-search'
              className='text-base-content/40 mb-4 text-4xl'
            />
            <p>No publications available at the moment.</p>
          </div>
        ) : (
          <div className='mt-6 space-y-6'>
            {milestones.map((milestone, index) => (
              <article
                key={milestone.id}
                className='group border-base-300 from-base-100 to-base-200/50 hover:border-primary/30 relative overflow-hidden rounded-lg border bg-gradient-to-r hover:shadow-md'
              >
                {/* Accent line */}
                <div className='bg-primary absolute top-0 bottom-0 left-0 w-1 transition-all duration-300 group-hover:w-2'></div>

                <div className='p-6 pl-8'>
                  {/* Header with date and status */}
                  <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <time
                      className='text-primary bg-primary/10 w-fit rounded-full px-3 py-1 text-sm font-semibold'
                      dateTime={new Date(milestone.date).toISOString()}
                    >
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </time>

                    {milestone.status && (
                      <span className='badge badge-primary badge-outline text-xs'>
                        {milestone.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className='text-base-content group-hover:text-primary mb-3 text-xl font-bold'>
                    {milestone.title}
                  </h2>

                  {/* Collaborators */}
                  {milestone.collaborators && (
                    <div className='mb-4'>
                      {renderCollaborators(milestone.collaborators)}
                    </div>
                  )}

                  {/* Description */}
                  <p className='text-base-content/80 mb-4 leading-relaxed'>
                    {milestone.description}
                  </p>

                  {/* Publication details */}
                  <div className='mb-4 space-y-2'>
                    {milestone.journal && (
                      <div className='text-sm'>
                        <span className='text-base-content font-semibold'>
                          Journal:
                        </span>{' '}
                        <span className='text-base-content/80 italic'>
                          {milestone.journal}
                        </span>
                      </div>
                    )}

                    {milestone.citation && (
                      <div className='text-sm'>
                        <span className='text-base-content font-semibold'>
                          Citation:
                        </span>{' '}
                        <span className='text-base-content/80 bg-base-200 rounded px-2 py-1 font-mono text-xs'>
                          {milestone.citation}
                        </span>
                      </div>
                    )}

                    {milestone.doi && renderDOI(milestone.doi)}
                  </div>

                  {/* Action links */}
                  {(milestone.paper_link || milestone.code_link) && (
                    <div className='border-base-300 flex flex-wrap gap-3 border-t pt-2'>
                      {milestone.paper_link && (
                        <Link
                          href={milestone.paper_link}
                          className='btn btn-primary btn-sm btn-outline hover:btn-primary gap-2 transition-all duration-200'
                          target='_blank'
                        >
                          <FontAwesomeIcon icon='fa-duotone fa-file-pdf' />
                          Paper
                        </Link>
                      )}
                      {milestone.code_link && (
                        <Link
                          href={milestone.code_link}
                          className='btn btn-secondary btn-sm btn-outline hover:btn-secondary gap-2 transition-all duration-200'
                          target='_blank'
                        >
                          <FontAwesomeIcon icon='fa-duotone fa-code' />
                          Source Code
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
