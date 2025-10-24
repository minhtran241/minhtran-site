import fs from 'fs/promises';
import path from 'path';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// Helper: Fetch news/logs
const DATA_FILE = path.join(fileSystemInfo.dataFetchDir, 'news-logs.json');

const getNewsLogs = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const logs = JSON.parse(data);
    return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching news/logs:', error);
    return [];
  }
};

// Constants
const SECTION_TITLE = 'News & Updates';
const SECTION_DESCRIPTION = 'Latest happenings, achievements, and milestones.';

// Helper: Event type configuration
const getEventConfig = (type) => {
  const configs = {
    achievement: {
      icon: 'fa-trophy',
      iconColor: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
    },
    publication: {
      icon: 'fa-file-lines',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
    },
    talk: {
      icon: 'fa-microphone-stand',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
    },
    award: {
      icon: 'fa-medal',
      iconColor: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
    },
    event: {
      icon: 'fa-calendar-star',
      iconColor: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
    },
    news: {
      icon: 'fa-newspaper',
      iconColor: 'text-info',
      bgColor: 'bg-info/10',
      borderColor: 'border-info/20',
    },
    milestone: {
      icon: 'fa-flag-checkered',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  };
  return configs[type?.toLowerCase()] || configs.news;
};

// Component: Single Log Line
const LogLine = ({ log }) => {
  const config = getEventConfig(log.type);
  const date = new Date(log.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`${config.borderColor} ${config.bgColor} flex items-start gap-3 rounded-md border-l-4 px-4 py-2 transition-colors hover:brightness-95`}
    >
      {/* Icon */}
      <div className='shrink-0'>
        <FontAwesomeIcon
          icon={`fa-duotone ${config.icon}`}
          // className={`shrink-0 mt-0.5 ${config.iconColor} text-base sm:text-lg`}
        />
      </div>

      {/* Content wrapper that flows naturally */}
      <div className='min-w-0 flex-1'>
        <div className='prose prose-sm text-base-content max-w-none leading-relaxed'>
          <time
            className='text-base-content/70 mr-2 text-xs font-semibold'
            dateTime={new Date(log.date).toISOString()}
          >
            {date}
          </time>
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <span className='text-base-content inline text-sm leading-relaxed font-medium'>
                  {children}
                </span>
              ),
              a: ({ href, children }) => (
                <Link
                  href={href || '#'}
                  className='link-primary link font-medium'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {children}
                </Link>
              ),
              em: ({ children }) => <em className='italic'>{children}</em>,
              strong: ({ children }) => (
                <strong className='font-bold'>{children}</strong>
              ),
              code: ({ children }) => (
                <code className='bg-base-300 rounded px-1.5 py-0.5 font-mono text-xs'>
                  {children}
                </code>
              ),
            }}
          >
            {log.title}
          </ReactMarkdown>
        </div>
      </div>

      {/* External Link Icon */}
      {log.link && (
        <Link
          href={log.link}
          className={`shrink-0 ${config.iconColor} hover:opacity-70`}
          target='_blank'
          rel='noopener noreferrer'
          title='View link'
        >
          <FontAwesomeIcon
            icon='fa-solid fa-arrow-up-right-from-square'
            className='text-sm'
          />
        </Link>
      )}
    </div>
  );
};

// Main Component
const NewsLogs = async () => {
  const logs = await getNewsLogs();

  return (
    <div>
      {/* <div className=''> */}
      <SectionLabel
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
        icon={
          <FontAwesomeIcon
            icon='fa-duotone fa-bullhorn'
            className='text-primary'
          />
        }
      />

      {logs.length === 0 ? (
        <div className='text-base-content/60 py-12 text-center'>
          <FontAwesomeIcon
            icon='fa-duotone fa-inbox'
            className='text-base-content/40 mb-4 text-4xl sm:text-5xl'
          />
          <p className='text-base sm:text-lg'>
            No updates available at the moment.
          </p>
          <p className='mt-2 text-sm sm:text-base'>Check back soon for news!</p>
        </div>
      ) : (
        <div className='mt-4 flex flex-col gap-3'>
          {logs.map((log, index) => (
            <LogLine key={index} log={log} />
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default NewsLogs;
