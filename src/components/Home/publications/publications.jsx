import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Link from 'next/link';
import BibTeXModal from './BibTeXModal';

// Helper: Fetch publications
const DATA_ATTRS_FILE = path.join(
  fileSystemInfo.dataFetchDir,
  'publications.json',
);

const getPublications = async () => {
  try {
    const publicationsData = await fs.readFile(DATA_ATTRS_FILE, 'utf-8');
    const publications = JSON.parse(publicationsData);
    return publications.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
};

// Constants
const SECTION_TITLE = 'Publications';
const SECTION_DESCRIPTION =
  'Most recent publications on Google Scholar and other platforms.';
const ABSTRACT_PREVIEW_LENGTH = 250;

// Helper: Render Collaborators
const renderCollaborators = (collaborators) => {
  if (!collaborators || collaborators.length === 0) return null;

  const MAX_VISIBLE = 3;
  const visibleCollaborators = collaborators.slice(0, MAX_VISIBLE);
  const remainingCount = collaborators.length - MAX_VISIBLE;
  const remainingNames = collaborators
    .slice(MAX_VISIBLE)
    .map((c) => c.name)
    .join(', ');

  return (
    <div className='flex flex-wrap items-center gap-2 text-sm'>
      <FontAwesomeIcon
        icon='fa-duotone fa-users'
        className='text-primary text-base'
      />
      <div className='flex flex-wrap items-center gap-1'>
        {visibleCollaborators.map((collaborator, index) => (
          <span key={index} className='inline-flex items-center'>
            <Link
              href={collaborator.link}
              className='link-primary link-hover link font-medium'
              target='_blank'
              rel='noopener noreferrer'
            >
              {collaborator.name}
            </Link>
            {index < visibleCollaborators.length - 1 && (
              <span className='text-base-content/50 ml-1'>,</span>
            )}
          </span>
        ))}
        {remainingCount > 0 && (
          <div className='tooltip tooltip-top' data-tip={remainingNames}>
            <span className='badge badge-primary badge-sm ml-1'>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper: Render DOI
const renderDOI = (doi) => {
  const cleanDoi = doi.replace('https://doi.org/', '');
  return (
    <div className='text-sm'>
      <span className='text-base-content font-semibold'>DOI:</span>{' '}
      <Link
        href={`https://doi.org/${cleanDoi}`}
        className='link-primary link-hover link'
        target='_blank'
        rel='noopener noreferrer'
      >
        {cleanDoi}
      </Link>
    </div>
  );
};

// Helper: Render Images Gallery
const renderImages = (images, title) => {
  if (!images || images.length === 0) return null;

  const MAX_VISIBLE = 4;
  const visibleImages = images.slice(0, MAX_VISIBLE);
  const remainingCount = images.length - MAX_VISIBLE;

  return (
    <div className='flex flex-wrap gap-2'>
      {visibleImages.map((img, index) => (
        <Link
          key={index}
          href={img}
          target='_blank'
          rel='noopener noreferrer'
          className='border-base-300 bg-base-200 relative h-24 w-24 overflow-hidden rounded-lg border sm:h-28 sm:w-28'
        >
          <Image
            src={img}
            alt={`${title} - Figure ${index + 1}`}
            fill
            className='object-cover'
          />
        </Link>
      ))}
      {remainingCount > 0 && (
        <div className='border-base-300 bg-base-200/50 text-base-content/60 flex h-24 w-24 items-center justify-center rounded-lg border text-base font-semibold sm:h-28 sm:w-28'>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

// Helper: Render Metrics
const renderMetrics = (publication) => {
  const metrics = [];

  if (publication.citations) {
    metrics.push({
      icon: 'fa-duotone fa-quote-right',
      label: 'Citations',
      value: publication.citations,
    });
  }

  if (publication.downloads) {
    metrics.push({
      icon: 'fa-duotone fa-download',
      label: 'Downloads',
      value: publication.downloads,
    });
  }

  if (metrics.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-3'>
      {metrics.map((metric, index) => (
        <div key={index} className='flex items-center gap-2 px-3 py-2'>
          <FontAwesomeIcon
            icon={metric.icon}
            className='text-primary text-sm'
          />
          <span className='text-base-content text-sm font-semibold'>
            {metric.value}
          </span>
          <span className='text-base-content/60 text-sm'>{metric.label}</span>
        </div>
      ))}
    </div>
  );
};

// Helper: Publication Type Badge
const renderTypeBadge = (type) => {
  const typeConfig = {
    journal: { color: 'badge-primary', icon: 'fa-book-open' },
    conference: { color: 'badge-secondary', icon: 'fa-presentation' },
    preprint: { color: 'badge-accent', icon: 'fa-file-lines' },
    thesis: { color: 'badge-info', icon: 'fa-graduation-cap' },
  };

  const config = typeConfig[type?.toLowerCase()] || typeConfig.journal;

  return (
    <span className={`badge ${config.color} gap-1.5`}>
      <FontAwesomeIcon icon={`fa-duotone ${config.icon}`} className='text-sm' />
      {type || 'Journal'}
    </span>
  );
};

// Helper: Truncate abstract
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return { text, isTruncated: false };

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const finalText = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return { text: finalText, isTruncated: true };
};

// Component: Expandable Abstract
const ExpandableAbstract = ({ description }) => {
  const { text, isTruncated } = truncateText(
    description,
    ABSTRACT_PREVIEW_LENGTH,
  );

  if (!isTruncated) {
    return <p className='text-sm leading-relaxed'>{description}</p>;
  }

  return (
    <details className='group/abstract'>
      <summary className='cursor-pointer'>
        <p className='inline text-sm leading-relaxed'>
          {text}
          <span className='text-base-content/50'>...</span>
        </p>
        <span className='text-primary ml-2 inline-flex items-center gap-1 text-sm font-medium'>
          <span className='group-open/abstract:hidden'>Read more</span>
          <span className='hidden group-open/abstract:inline'>Show less</span>
          <FontAwesomeIcon
            icon='fa-solid fa-chevron-down'
            className='text-sm group-open/abstract:rotate-180'
          />
        </span>
      </summary>
      <p className='mt-2 text-sm leading-relaxed'>{description}</p>
    </details>
  );
};

// Main Publication Card Component
const PublicationCard = ({ publication }) => {
  return (
    <article className='border-base-300 bg-base-100 rounded-xl border p-5'>
      {/* Header Section */}
      <div className='mb-3 flex flex-wrap items-start justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <time
            className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-bold'
            dateTime={new Date(publication.date).toISOString()}
          >
            {new Date(publication.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </time>
          {renderTypeBadge(publication.type)}
        </div>

        {publication.status && (
          <span className='badge badge-outline'>{publication.status}</span>
        )}
      </div>

      {/* Title */}
      <h2 className='text-base-content mb-3 text-xl leading-tight font-bold'>
        {publication.title}
      </h2>

      {/* Collaborators */}
      {publication.collaborators && (
        <div className='mb-3'>
          {renderCollaborators(publication.collaborators)}
        </div>
      )}

      {/* Metrics */}
      {(publication.citations || publication.downloads) && (
        <div className='mb-3'>{renderMetrics(publication)}</div>
      )}

      {/* Images */}
      {publication.images && publication.images.length > 0 && (
        <div className='mb-4'>
          {renderImages(publication.images, publication.title)}
        </div>
      )}

      {/* Abstract with expand/collapse */}
      <div className='bg-base-200/50 mb-4 rounded-lg p-4'>
        <div className='mb-2 flex items-center gap-2'>
          <FontAwesomeIcon
            icon='fa-duotone fa-align-left'
            className='text-primary text-sm'
          />
          <span className='text-base-content text-sm font-semibold'>
            Abstract
          </span>
        </div>
        <ExpandableAbstract description={publication.description} />
      </div>

      {/* Publication Details */}
      <div className='bg-base-200/50 mb-4 space-y-2 rounded-lg p-4'>
        {publication.published_in && (
          <div className='text-sm'>
            <span className='text-base-content font-semibold'>
              Published in:
            </span>{' '}
            <span>
              {publication.published_in}
              {/* location */}
              {publication.location && ` - ${publication.location}`}
            </span>
          </div>
        )}

        {/* {publication.location && (
					<div className='text-sm'>
						<span className='text-base-content font-semibold'>Location:</span>{' '}
						<span className=''>{publication.location}</span>
					</div>
				)} */}

        {publication.citation && (
          <div className='text-sm'>
            <span className='text-base-content font-semibold'>Citation:</span>{' '}
            <code className='bg-base-300 ml-1 rounded px-2 py-1 text-sm'>
              {publication.citation}
            </code>
          </div>
        )}

        {publication.doi && (
          <div className='pt-1'>{renderDOI(publication.doi)}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className='border-base-300 flex flex-wrap gap-2 border-t pt-4'>
        {publication.paper_link && (
          <Link
            href={publication.paper_link}
            className='btn btn-primary btn-sm gap-2'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon='fa-duotone fa-file-pdf' />
            Read Paper
          </Link>
        )}
        {publication.code_link && (
          <Link
            href={publication.code_link}
            className='btn btn-secondary btn-sm gap-2'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon='fa-brands fa-github' />
            Code
          </Link>
        )}
        {publication.bibtex && (
          <BibTeXModal bibtex={publication.bibtex} title={publication.title} />
        )}
        {publication.supplementary_link && (
          <Link
            href={publication.supplementary_link}
            className='btn btn-ghost btn-sm gap-2'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon='fa-duotone fa-file-zipper' />
            Supplementary
          </Link>
        )}
      </div>
    </article>
  );
};

const Publications = async () => {
  const publications = await getPublications();

  return (
    <div>
      {/* <div className=''> */}
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

      {publications.length === 0 ? (
        <div className='text-base-content/60 py-12 text-center'>
          <FontAwesomeIcon
            icon='fa-duotone fa-file-magnifying-glass'
            className='text-base-content/40 mb-4 text-5xl'
          />
          <p className='text-lg'>No publications available at the moment.</p>
          <p className='mt-2 text-base'>Check back soon for updates!</p>
        </div>
      ) : (
        <>
          {/* All Publications - Scrollable Container */}
          <div className='mt-6 max-h-[800px] space-y-4 overflow-y-auto pr-2'>
            {publications.map((publication, index) => (
              <PublicationCard key={index} publication={publication} />
            ))}
          </div>
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default Publications;
