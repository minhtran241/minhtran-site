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
      bgColor: 'bg-success/5',
      borderColor: 'border-success/20',
    },
    publication: {
      icon: 'fa-file-lines',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
    },
    talk: {
      icon: 'fa-microphone-stand',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/20',
    },
    award: {
      icon: 'fa-medal',
      iconColor: 'text-warning',
      bgColor: 'bg-warning/5',
      borderColor: 'border-warning/20',
    },
    event: {
      icon: 'fa-calendar-star',
      iconColor: 'text-accent',
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
    },
    news: {
      icon: 'fa-newspaper',
      iconColor: 'text-info',
      bgColor: 'bg-info/5',
      borderColor: 'border-info/20',
    },
    milestone: {
      icon: 'fa-flag-checkered',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/5',
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
      className={`flex items-start gap-3 rounded-lg border ${config.borderColor} ${config.bgColor} px-4 py-2.5 transition-colors hover:brightness-95`}
    >
      {/* Icon */}
      <FontAwesomeIcon
        icon={`fa-duotone ${config.icon}`}
        className={`flex-shrink-0 ${config.iconColor}`}
      />

      {/* Date */}
      <time
        className='text-base-content/70 w-28 flex-shrink-0 text-xs font-semibold'
        dateTime={new Date(log.date).toISOString()}
      >
        {date}
      </time>

      {/* Content with Markdown support */}
      <div className='prose prose-sm text-base-content max-w-none flex-1 leading-relaxed'>
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

      {/* External Link Icon */}
      {log.link && (
        <Link
          href={log.link}
          className={`mt-0.5 flex-shrink-0 ${config.iconColor} hover:opacity-70`}
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
    <div className='container mx-auto px-4'>
      <div className='border-base-300/50 bg-base-100 rounded-2xl border p-6 shadow-lg'>
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
              className='text-base-content/40 mb-4 text-5xl'
            />
            <p className='text-lg'>No updates available at the moment.</p>
            <p className='mt-2 text-base'>Check back soon for news!</p>
          </div>
        ) : (
          <div className='mt-6 max-h-[600px] space-y-2 overflow-y-auto pr-2'>
            {logs.map((log, index) => (
              <LogLine key={index} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLogs;
