import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
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
const SECTION_TITLE = 'Publications';
const SECTION_DESCRIPTION =
  'A collection of my research papers, articles, and other scholarly works.';

// Helper: Render Collaborators
const renderCollaborators = (collaborators) => {
  const MAX_VISIBLE = 3;
  const visibleCollaborators = collaborators.slice(0, MAX_VISIBLE);
  const remainingCount = collaborators.length - MAX_VISIBLE;

  return (
    <div className='text-base-content/80 flex flex-wrap items-center gap-1.5 text-xs'>
      <FontAwesomeIcon
        icon='fa-duotone fa-users'
        className='text-primary text-sm'
      />
      <div className='flex flex-wrap items-center gap-1'>
        {visibleCollaborators.map((collaborator, index) => (
          <span key={index} className='inline-flex items-center'>
            <Link
              href={collaborator.link}
              className='link link-primary link-hover font-medium transition-colors duration-200'
              target='_blank'
            >
              {collaborator.name}
            </Link>
            {index < visibleCollaborators.length - 1 && (
              <span className='text-base-content/60 ml-0.5'>,</span>
            )}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className='badge badge-xs badge-primary ml-1'>
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
};

// Helper: Render DOI
const renderDOI = (doi) => (
  <div className='text-base-content/80 text-xs'>
    <span className='text-base-content font-semibold'>DOI:</span>{' '}
    <Link
      href={`https://doi.org/${doi.replace('https://doi.org/', '')}`}
      className='link link-primary bg-base-200 hover:bg-base-300 rounded px-1.5 py-0.5 font-mono text-xs transition-colors duration-200'
      target='_blank'
    >
      {doi.replace('https://doi.org/', '')}
    </Link>
  </div>
);

// Helper: Render Images
const renderImages = (images) => {
  if (!images || images.length === 0) return null;

  const MAX_VISIBLE = 3;
  const visibleImages = images.slice(0, MAX_VISIBLE);
  const remainingCount = images.length - MAX_VISIBLE;

  return (
    <div className='flex gap-2'>
      {visibleImages.map((img, index) => (
        <Link
          key={index}
          href={img}
          target='_blank'
          rel='noopener noreferrer'
          className='group/img border-base-300 bg-base-200 hover:border-primary relative h-28 w-28 overflow-hidden rounded-lg border transition-all hover:shadow-lg'
        >
          <Image
            src={img}
            alt={`Publication figure ${index + 1}`}
            fill
            className='object-cover transition-transform duration-300'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover/img:bg-black/50'>
            <FontAwesomeIcon
              icon='fa-solid fa-search-plus'
              className='text-white opacity-0 transition-opacity group-hover/img:opacity-100'
            />
          </div>
        </Link>
      ))}
      {remainingCount > 0 && (
        <div className='border-base-300 bg-base-200/50 text-base-content/60 flex h-24 w-24 items-center justify-center rounded-lg border text-sm font-semibold'>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

const Publications = async () => {
  const milestones = await getMilestones();

  return (
    <div className='container mx-auto px-4'>
      <div className='border-base-300/50 bg-base-100 rounded-2xl border p-5 shadow-lg md:p-6'>
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
          <div className='text-base-content/60 py-8 text-center'>
            <FontAwesomeIcon
              icon='fa-duotone fa-file-search'
              className='text-base-content/40 mb-3 text-3xl'
            />
            <p className='text-sm'>No publications available at the moment.</p>
          </div>
        ) : (
          <div className='mt-4 space-y-3'>
            {milestones.map((milestone, index) => (
              <article
                key={milestone.id}
                className='group border-base-300 from-base-100 to-base-200/50 hover:border-primary/30 relative overflow-hidden rounded-lg border bg-gradient-to-r transition-all duration-200 hover:shadow-md'
              >
                {/* Accent line */}
                <div className='bg-primary absolute top-0 bottom-0 left-0 w-0.5 transition-all duration-300 group-hover:w-1'></div>

                <div className='p-4 pl-5'>
                  {/* Header with date and status */}
                  <div className='mb-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <time
                      className='bg-primary/10 text-primary w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold'
                      dateTime={new Date(milestone.date).toISOString()}
                    >
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </time>

                    {milestone.status && (
                      <span className='badge badge-outline badge-primary badge-xs'>
                        {milestone.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className='text-base-content group-hover:text-primary mb-2 text-lg font-bold transition-colors'>
                    {milestone.title}
                  </h2>

                  {/* Collaborators */}
                  {milestone.collaborators && (
                    <div className='mb-2.5'>
                      {renderCollaborators(milestone.collaborators)}
                    </div>
                  )}

                  {/* Images */}
                  {milestone.images && milestone.images.length > 0 && (
                    <div className='mb-3'>{renderImages(milestone.images)}</div>
                  )}

                  {/* Collapsible Abstract */}
                  <details className='group/details mb-3'>
                    <summary className='text-primary hover:text-primary-focus cursor-pointer text-xs font-semibold transition-colors'>
                      <span className='inline-flex items-center gap-1.5'>
                        <FontAwesomeIcon
                          icon='fa-solid fa-chevron-right'
                          className='transition-transform group-open/details:rotate-90'
                        />
                        Abstract
                      </span>
                    </summary>
                    <p className='text-base-content/80 mt-2 text-xs leading-relaxed'>
                      {milestone.description}
                    </p>
                  </details>

                  {/* Publication details */}
                  <div className='mb-3 space-y-1.5'>
                    {milestone.journal && (
                      <div className='text-xs'>
                        <span className='text-base-content font-semibold'>
                          Published in:
                        </span>{' '}
                        <span className='text-base-content/80 italic'>
                          {milestone.journal}
                        </span>
                      </div>
                    )}

                    {milestone.citation && (
                      <div className='text-xs'>
                        <span className='text-base-content font-semibold'>
                          Citation:
                        </span>{' '}
                        <span className='bg-base-200 text-base-content/80 rounded px-1.5 py-0.5 font-mono text-xs'>
                          {milestone.citation}
                        </span>
                      </div>
                    )}

                    {milestone.doi && renderDOI(milestone.doi)}
                  </div>

                  {/* Action links */}
                  {(milestone.paper_link || milestone.code_link) && (
                    <div className='border-base-300 flex flex-wrap gap-2 border-t pt-2.5'>
                      {milestone.paper_link && (
                        <Link
                          href={milestone.paper_link}
                          className='btn btn-outline btn-primary btn-xs hover:btn-primary gap-1.5 transition-all duration-200'
                          target='_blank'
                        >
                          <FontAwesomeIcon icon='fa-duotone fa-file-pdf' />
                          Paper
                        </Link>
                      )}
                      {milestone.code_link && (
                        <Link
                          href={milestone.code_link}
                          className='btn btn-outline btn-secondary btn-xs hover:btn-secondary gap-1.5 transition-all duration-200'
                          target='_blank'
                        >
                          <FontAwesomeIcon icon='fa-duotone fa-code' />
                          Code
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
