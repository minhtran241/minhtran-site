'use client';

import { memo } from 'react';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

/**
 * Professional Loading Component
 * A unified loading component for the entire application
 *
 * @param {Object} props
 * @param {'page' | 'section' | 'inline' | 'overlay'} props.variant - Loading variant
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} props.size - Size of the loader
 * @param {string} props.text - Custom loading text (optional)
 * @param {boolean} props.showText - Whether to show loading text
 * @param {boolean} props.showIcon - Whether to show the center icon
 * @param {string} props.icon - Custom FontAwesome icon class
 * @param {string} props.className - Additional CSS classes
 */

const sizeConfig = {
  xs: {
    spinner: 'h-6 w-6',
    border: 'border-2',
    icon: 'text-xs',
    text: 'text-xs',
    gap: 'gap-2',
  },
  sm: {
    spinner: 'h-10 w-10',
    border: 'border-3',
    icon: 'text-sm',
    text: 'text-sm',
    gap: 'gap-3',
  },
  md: {
    spinner: 'h-16 w-16',
    border: 'border-4',
    icon: 'text-base',
    text: 'text-sm',
    gap: 'gap-4',
  },
  lg: {
    spinner: 'h-20 w-20',
    border: 'border-4',
    icon: 'text-lg',
    text: 'text-base',
    gap: 'gap-4',
  },
  xl: {
    spinner: 'h-24 w-24',
    border: 'border-[5px]',
    icon: 'text-xl',
    text: 'text-lg',
    gap: 'gap-5',
  },
};

const Loading = memo(function Loading({
  variant = 'section',
  size = 'md',
  text = 'Loading',
  showText = true,
  showIcon = true,
  icon = 'fa-duotone fa-solid fa-atom-simple',
  className = '',
}) {
  const config = sizeConfig[size] || sizeConfig.md;

  // Container classes based on variant
  const containerClasses = {
    page: 'fixed inset-0 z-50 flex items-center justify-center bg-base-100/80 backdrop-blur-sm',
    section: 'flex w-full items-center justify-center py-12',
    inline: 'inline-flex items-center justify-center',
    overlay:
      'absolute inset-0 z-40 flex items-center justify-center bg-base-100/60 backdrop-blur-[2px] rounded-box',
  };

  const Spinner = () => (
    <div className='relative' aria-hidden='true'>
      {/* Outer pulse ring */}
      <div
        className={`absolute inset-0 ${config.border} border-primary/20 animate-pulse rounded-full`}
      />

      {/* Spinning gradient border */}
      <div
        className={`${config.spinner} ${config.border} border-t-primary border-r-primary animate-spin rounded-full border-transparent`}
        style={{ animationDuration: '0.8s' }}
      />

      {/* Center icon */}
      {showIcon && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <FontAwesomeIcon icon={`${icon} text-primary ${config.icon}`} />
        </div>
      )}
    </div>
  );

  const LoadingText = () => (
    <div
      className={`flex items-center ${config.gap} text-base-content/70 font-medium ${config.text}`}
    >
      <span>{text}</span>
      <span className='loading loading-dots loading-sm text-primary' />
    </div>
  );

  return (
    <div
      className={`${containerClasses[variant]} ${className}`}
      role='status'
      aria-live='polite'
      aria-label={text || 'Loading content'}
    >
      <div className={`flex flex-col items-center ${config.gap}`}>
        <Spinner />
        {showText && <LoadingText />}
      </div>
    </div>
  );
});

/**
 * Page Loading - Full screen loading for page transitions
 */
export const PageLoading = memo(function PageLoading(props) {
  return <Loading variant='page' size='lg' {...props} />;
});

/**
 * Section Loading - For loading sections within a page
 */
export const SectionLoading = memo(function SectionLoading(props) {
  return <Loading variant='section' size='md' {...props} />;
});

/**
 * Inline Loading - Small inline loader for buttons, etc.
 */
export const InlineLoading = memo(function InlineLoading({
  showText = false,
  showIcon = false,
  size = 'xs',
  ...props
}) {
  return (
    <Loading
      variant='inline'
      size={size}
      showText={showText}
      showIcon={showIcon}
      {...props}
    />
  );
});

/**
 * Overlay Loading - For loading over existing content
 */
export const OverlayLoading = memo(function OverlayLoading(props) {
  return <Loading variant='overlay' size='md' {...props} />;
});

/**
 * Card Loading Skeleton - For loading card placeholders
 */
export const CardSkeleton = memo(function CardSkeleton({
  count = 1,
  className = '',
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`card bg-base-200 animate-pulse ${className}`}
        >
          <div className='card-body gap-4'>
            {/* Image placeholder */}
            <div className='bg-base-300 h-40 w-full rounded-lg' />
            {/* Title placeholder */}
            <div className='bg-base-300 h-6 w-3/4 rounded' />
            {/* Description placeholder */}
            <div className='space-y-2'>
              <div className='bg-base-300 h-4 w-full rounded' />
              <div className='bg-base-300 h-4 w-5/6 rounded' />
            </div>
            {/* Tags placeholder */}
            <div className='flex gap-2'>
              <div className='bg-base-300 h-6 w-16 rounded-full' />
              <div className='bg-base-300 h-6 w-20 rounded-full' />
              <div className='bg-base-300 h-6 w-14 rounded-full' />
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

/**
 * Section Header Skeleton - For loading section headers
 */
export const SectionHeaderSkeleton = memo(function SectionHeaderSkeleton() {
  return (
    <div className='animate-pulse space-y-2'>
      <div className='bg-base-300 h-8 w-48 rounded' />
      <div className='bg-base-300 h-4 w-72 rounded' />
    </div>
  );
});

/**
 * Timeline Skeleton - For loading timeline/milestone components
 */
export const TimelineSkeleton = memo(function TimelineSkeleton({
  count = 3,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SectionHeaderSkeleton />
      <ul className='timeline timeline-compact timeline-vertical timeline-snap-icon mt-4'>
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            {index !== 0 && <hr className='bg-base-300' />}
            <div className='timeline-middle'>
              <div className='bg-base-300 h-4 w-4 animate-pulse rounded-full' />
            </div>
            <div className='timeline-end timeline-box w-full'>
              <div className='animate-pulse space-y-3 p-4'>
                <div className='flex items-center gap-3'>
                  <div className='bg-base-300 h-12 w-12 rounded-lg' />
                  <div className='flex-1 space-y-2'>
                    <div className='bg-base-300 h-5 w-3/4 rounded' />
                    <div className='bg-base-300 h-4 w-1/2 rounded' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='bg-base-300 h-3 w-full rounded' />
                  <div className='bg-base-300 h-3 w-5/6 rounded' />
                </div>
              </div>
            </div>
            {index !== count - 1 && <hr className='bg-base-300' />}
          </li>
        ))}
      </ul>
    </div>
  );
});

/**
 * News Log Skeleton - For loading news/updates section
 */
export const NewsLogSkeleton = memo(function NewsLogSkeleton({
  count = 5,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SectionHeaderSkeleton />
      <div className='mt-4 flex flex-col gap-3'>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className='bg-base-200 rounded-box border-base-300 flex animate-pulse items-start gap-3 border-l-4 px-2 py-1'
          >
            <div className='bg-base-300 mt-1 h-4 w-4 shrink-0 rounded' />
            <div className='min-w-0 flex-1 space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='bg-base-300 h-3 w-20 rounded' />
                <div className='bg-base-300 h-4 flex-1 rounded' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Publication Skeleton - For loading publication cards
 */
export const PublicationSkeleton = memo(function PublicationSkeleton({
  count = 2,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SectionHeaderSkeleton />
      <div className='mt-6 space-y-4'>
        {Array.from({ length: count }).map((_, index) => (
          <article
            key={index}
            className='border-base-300 bg-base-100 rounded-box animate-pulse border p-5'
          >
            {/* Header */}
            <div className='mb-3 flex flex-wrap items-start justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <div className='bg-base-300 h-6 w-20 rounded-full' />
                <div className='bg-base-300 h-6 w-24 rounded-full' />
              </div>
            </div>
            {/* Title */}
            <div className='bg-base-300 mb-3 h-6 w-3/4 rounded' />
            {/* Collaborators */}
            <div className='mb-3 flex items-center gap-2'>
              <div className='bg-base-300 h-4 w-4 rounded' />
              <div className='bg-base-300 h-4 w-48 rounded' />
            </div>
            {/* Abstract */}
            <div className='bg-base-200 rounded-box mb-4 space-y-2 p-4'>
              <div className='bg-base-300 h-4 w-full rounded' />
              <div className='bg-base-300 h-4 w-5/6 rounded' />
              <div className='bg-base-300 h-4 w-4/6 rounded' />
            </div>
            {/* Buttons */}
            <div className='border-base-300 flex gap-2 border-t pt-4'>
              <div className='bg-base-300 h-8 w-24 rounded-lg' />
              <div className='bg-base-300 h-8 w-20 rounded-lg' />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
});

/**
 * Hero Skeleton - For loading hero section
 */
export const HeroSkeleton = memo(function HeroSkeleton({ className = '' }) {
  return (
    <article className={`${className}`}>
      <div className='border-primary/20 bg-base-100/50 rounded-box relative overflow-hidden border shadow-sm backdrop-blur-sm'>
        <div className='relative p-8 md:p-10'>
          <div className='flex animate-pulse flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12'>
            {/* Profile Picture Skeleton */}
            <div className='relative shrink-0'>
              <div className='bg-base-300 rounded-box h-36 w-36 lg:h-40 lg:w-40' />
            </div>
            {/* Content Skeleton */}
            <div className='flex flex-1 flex-col gap-6'>
              <div className='space-y-3'>
                <div className='bg-base-300 mx-auto h-8 w-48 rounded lg:mx-0' />
                <div className='bg-base-300 mx-auto h-4 w-full max-w-md rounded lg:mx-0' />
                <div className='bg-base-300 mx-auto h-4 w-3/4 max-w-md rounded lg:mx-0' />
              </div>
              {/* Pills Skeleton */}
              <div className='flex flex-wrap items-center justify-center gap-2 lg:justify-start'>
                <div className='bg-base-300 h-10 w-32 rounded-full' />
                <div className='bg-base-300 h-10 w-48 rounded-full' />
                <div className='bg-base-300 h-10 w-28 rounded-full' />
              </div>
              {/* Buttons Skeleton */}
              <div className='flex flex-col items-center gap-3 sm:flex-row lg:justify-start'>
                <div className='bg-base-300 h-12 w-36 rounded-lg' />
                <div className='bg-base-300 h-12 w-40 rounded-lg' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

/**
 * Device Grid Skeleton - For loading devices/tools grids
 */
export const DeviceGridSkeleton = memo(function DeviceGridSkeleton({
  count = 6,
  featured = true,
  className = '',
}) {
  return (
    <section className={`space-y-10 ${className}`}>
      {/* Header */}
      <div className='mb-6 flex animate-pulse items-center gap-3'>
        <div className='bg-base-300 rounded-box h-12 w-12' />
        <div className='bg-base-300 h-8 w-32 rounded' />
      </div>

      <div className='space-y-12'>
        {/* Featured Device */}
        {featured && (
          <div className='card bg-base-100 border-base-300 animate-pulse border shadow-xl'>
            <figure className='px-6 pt-6'>
              <div className='bg-base-300 rounded-box h-64 w-full' />
            </figure>
            <div className='card-body items-center text-center'>
              <div className='bg-base-300 h-6 w-48 rounded' />
              <div className='bg-base-300 h-4 w-32 rounded' />
            </div>
          </div>
        )}

        {/* Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className='card bg-base-100 border-base-300 animate-pulse border shadow-lg'
            >
              <figure className='px-4 pt-4'>
                <div className='bg-base-300 rounded-box h-48 w-48' />
              </figure>
              <div className='card-body items-center text-center'>
                <div className='bg-base-300 h-5 w-32 rounded' />
                <div className='bg-base-300 h-4 w-24 rounded' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/**
 * Tool Grid Skeleton - For loading smaller tool grids
 */
export const ToolGridSkeleton = memo(function ToolGridSkeleton({
  count = 10,
  className = '',
}) {
  return (
    <section className={`space-y-10 ${className}`}>
      {/* Header */}
      <div className='mb-6 flex animate-pulse items-center gap-3'>
        <div className='bg-base-300 rounded-box h-12 w-12' />
        <div className='bg-base-300 h-8 w-40 rounded' />
      </div>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className='card bg-base-100 border-base-300 animate-pulse border shadow-md'
          >
            <figure className='px-4 pt-4'>
              <div className='bg-base-300 rounded-box h-16 w-16' />
            </figure>
            <div className='card-body items-center p-4 text-center'>
              <div className='bg-base-300 h-4 w-20 rounded' />
              <div className='bg-base-300 h-3 w-16 rounded' />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

/**
 * Blog Grid Skeleton - For loading blog post grids
 */
export const BlogGridSkeleton = memo(function BlogGridSkeleton({
  count = 6,
  className = '',
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='card bg-base-100 border-base-300 animate-pulse border shadow-lg'
        >
          {/* Image */}
          <figure>
            <div className='bg-base-300 h-48 w-full' />
          </figure>
          <div className='card-body gap-3'>
            {/* Date */}
            <div className='bg-base-300 h-4 w-24 rounded' />
            {/* Title */}
            <div className='bg-base-300 h-6 w-full rounded' />
            <div className='bg-base-300 h-6 w-3/4 rounded' />
            {/* Description */}
            <div className='space-y-2'>
              <div className='bg-base-300 h-4 w-full rounded' />
              <div className='bg-base-300 h-4 w-5/6 rounded' />
            </div>
            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
              <div className='bg-base-300 h-6 w-16 rounded-full' />
              <div className='bg-base-300 h-6 w-20 rounded-full' />
              <div className='bg-base-300 h-6 w-14 rounded-full' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

/**
 * Project Grid Skeleton - For loading project cards
 */
export const ProjectGridSkeleton = memo(function ProjectGridSkeleton({
  count = 6,
  className = '',
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='card bg-base-100 border-base-300 animate-pulse border shadow-lg'
        >
          {/* Image */}
          <figure>
            <div className='bg-base-300 h-48 w-full' />
          </figure>
          <div className='card-body gap-3'>
            {/* Title */}
            <div className='bg-base-300 h-6 w-3/4 rounded' />
            {/* Description */}
            <div className='space-y-2'>
              <div className='bg-base-300 h-4 w-full rounded' />
              <div className='bg-base-300 h-4 w-5/6 rounded' />
            </div>
            {/* Tech stack */}
            <div className='flex flex-wrap gap-2'>
              <div className='bg-base-300 h-6 w-12 rounded-full' />
              <div className='bg-base-300 h-6 w-16 rounded-full' />
              <div className='bg-base-300 h-6 w-14 rounded-full' />
              <div className='bg-base-300 h-6 w-10 rounded-full' />
            </div>
            {/* Buttons */}
            <div className='mt-2 flex gap-2'>
              <div className='bg-base-300 h-10 w-24 rounded-lg' />
              <div className='bg-base-300 h-10 w-20 rounded-lg' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

/**
 * GitHub Stats Skeleton - For loading GitHub contribution stats
 */
export const GitHubStatsSkeleton = memo(function GitHubStatsSkeleton({
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SectionHeaderSkeleton />
      <div className='flex flex-col gap-5'>
        {/* Contribution Chart Skeleton */}
        <div className='border-base-300 bg-base-100 rounded-box animate-pulse border p-3'>
          {/* Header */}
          <div className='mb-3 flex flex-wrap items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='bg-base-300 h-8 w-8 rounded-full' />
              <div className='space-y-1'>
                <div className='bg-base-300 h-4 w-32 rounded' />
                <div className='bg-base-300 h-3 w-20 rounded' />
              </div>
            </div>
            <div className='flex gap-1.5'>
              <div className='bg-base-300 h-8 w-20 rounded' />
              <div className='bg-base-300 h-8 w-20 rounded' />
            </div>
          </div>
          {/* Chart area */}
          <div className='bg-base-200 rounded-box h-56 w-full' />
          {/* Stats */}
          <div className='stats stats-horizontal bg-base-200 mt-3 w-full shadow-sm'>
            <div className='stat px-3 py-2'>
              <div className='bg-base-300 mb-1 h-3 w-12 rounded' />
              <div className='bg-base-300 h-5 w-8 rounded' />
            </div>
            <div className='stat px-3 py-2'>
              <div className='bg-base-300 mb-1 h-3 w-12 rounded' />
              <div className='bg-base-300 h-5 w-8 rounded' />
            </div>
            <div className='stat px-3 py-2'>
              <div className='bg-base-300 mb-1 h-3 w-16 rounded' />
              <div className='bg-base-300 h-5 w-8 rounded' />
            </div>
          </div>
        </div>
        {/* Wakatime Skeleton */}
        <div className='border-base-300 bg-base-100 rounded-box animate-pulse border p-4'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='bg-base-300 h-10 w-10 rounded-full' />
            <div className='space-y-1'>
              <div className='bg-base-300 h-4 w-28 rounded' />
              <div className='bg-base-300 h-3 w-20 rounded' />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='bg-base-200 rounded-box p-3'>
                <div className='bg-base-300 mb-2 h-3 w-16 rounded' />
                <div className='bg-base-300 h-5 w-12 rounded' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * GitHub Repository Grid Skeleton - For loading repository cards
 */
export const GitHubRepoGridSkeleton = memo(function GitHubRepoGridSkeleton({
  count = 6,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SectionHeaderSkeleton />
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className='card bg-base-200 animate-pulse'>
            <div className='card-body'>
              {/* Title */}
              <div className='bg-base-300 h-6 w-3/4 rounded' />
              {/* Description */}
              <div className='mb-4 space-y-2'>
                <div className='bg-base-300 h-4 w-full rounded' />
                <div className='bg-base-300 h-4 w-5/6 rounded' />
              </div>
              {/* Topics */}
              <div className='mb-4 flex flex-wrap gap-1.5'>
                <div className='bg-base-300 h-5 w-14 rounded-full' />
                <div className='bg-base-300 h-5 w-16 rounded-full' />
                <div className='bg-base-300 h-5 w-12 rounded-full' />
              </div>
              {/* Stats */}
              <div className='mb-4 flex items-center justify-between gap-4'>
                <div className='flex items-center gap-1.5'>
                  <div className='bg-base-300 h-2.5 w-2.5 rounded-full' />
                  <div className='bg-base-300 h-3 w-16 rounded' />
                </div>
                <div className='bg-base-300 h-3 w-8 rounded' />
                <div className='bg-base-300 h-3 w-8 rounded' />
                <div className='bg-base-300 h-3 w-8 rounded' />
              </div>
              {/* Footer */}
              <div className='border-base-300 border-t pt-3'>
                <div className='flex justify-between'>
                  <div className='bg-base-300 h-3 w-20 rounded' />
                  <div className='bg-base-300 h-3 w-16 rounded' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Breadcrumbs Skeleton - For loading breadcrumb navigation
 */
export const BreadcrumbsSkeleton = memo(function BreadcrumbsSkeleton({
  items = 2,
  className = '',
}) {
  return (
    <div className={`flex animate-pulse items-center gap-2 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className='flex items-center gap-2'>
          {index > 0 && <div className='bg-base-300 h-4 w-2 rounded' />}
          <div className='bg-base-300 h-4 w-16 rounded' />
        </div>
      ))}
    </div>
  );
});

/**
 * Search Bar Skeleton - For loading search inputs
 */
export const SearchBarSkeleton = memo(function SearchBarSkeleton({
  className = '',
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className='bg-base-200 border-base-300 flex h-12 w-full items-center gap-2 rounded-lg border px-4'>
        <div className='bg-base-300 h-4 w-4 rounded' />
        <div className='bg-base-300 h-4 flex-1 rounded' />
      </div>
    </div>
  );
});

/**
 * Post Card Skeleton - Single blog post card skeleton
 */
export const PostCardSkeleton = memo(function PostCardSkeleton({
  className = '',
}) {
  return (
    <article
      className={`border-base-200/80 bg-base-100 rounded-box flex h-full animate-pulse flex-col border shadow-sm ${className}`}
    >
      <div className='bg-base-300 rounded-t-box h-48 w-full' />
      <div className='card-body'>
        <div className='mb-3 flex items-center gap-1.5'>
          <div className='bg-base-300 h-4 w-4 rounded' />
          <div className='bg-base-300 h-4 w-24 rounded' />
        </div>
        <div className='bg-base-300 mb-2 h-6 w-full rounded' />
        <div className='bg-base-300 mb-4 h-6 w-3/4 rounded' />
        <div className='space-y-2'>
          <div className='bg-base-300 h-4 w-full rounded' />
          <div className='bg-base-300 h-4 w-5/6 rounded' />
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          <div className='bg-base-300 h-5 w-14 rounded-full' />
          <div className='bg-base-300 h-5 w-16 rounded-full' />
          <div className='bg-base-300 h-5 w-12 rounded-full' />
        </div>
      </div>
    </article>
  );
});

/**
 * Coding Activity Skeleton - For Wakatime coding stats
 */
export const CodingActivitySkeleton = memo(function CodingActivitySkeleton({
  className = '',
}) {
  return (
    <section className={`flex animate-pulse flex-col gap-y-3 ${className}`}>
      {/* Overview */}
      <div className='border-base-300 bg-base-100 rounded-box border p-4'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='bg-base-300 h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <div className='bg-base-300 h-5 w-32 rounded' />
            <div className='bg-base-300 h-3 w-24 rounded' />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='bg-base-200 rounded-box p-3 text-center'>
              <div className='bg-base-300 mx-auto mb-2 h-3 w-16 rounded' />
              <div className='bg-base-300 mx-auto h-6 w-12 rounded' />
            </div>
          ))}
        </div>
      </div>
      {/* Language List */}
      <div className='border-base-300 bg-base-100 rounded-box border p-4'>
        <div className='space-y-3'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='flex items-center gap-3'>
              <div className='bg-base-300 h-4 w-4 rounded' />
              <div className='bg-base-300 h-4 w-20 rounded' />
              <div className='bg-base-300 h-2 flex-1 rounded-full' />
              <div className='bg-base-300 h-4 w-12 rounded' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/**
 * Text Skeleton - For loading text placeholders
 */
export const TextSkeleton = memo(function TextSkeleton({
  lines = 3,
  className = '',
}) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className='bg-base-300 h-4 rounded'
          style={{
            width: `${Math.random() * 40 + 60}%`,
          }}
        />
      ))}
    </div>
  );
});

/**
 * Blog Post Skeleton - For full blog post content loading
 */
export const BlogPostSkeleton = memo(function BlogPostSkeleton({
  className = '',
}) {
  return (
    <article className={`animate-pulse space-y-6 ${className}`}>
      {/* Paragraph blocks */}
      {Array.from({ length: 3 }).map((_, blockIndex) => (
        <div key={blockIndex} className='space-y-3'>
          {Array.from({ length: 4 }).map((_, lineIndex) => (
            <div
              key={lineIndex}
              className='bg-base-300 h-4 rounded'
              style={{
                width: lineIndex === 3 ? '75%' : '100%',
              }}
            />
          ))}
        </div>
      ))}
      {/* Code block skeleton */}
      <div className='bg-base-300 rounded-box h-40 w-full' />
      {/* More paragraphs */}
      {Array.from({ length: 2 }).map((_, blockIndex) => (
        <div key={blockIndex} className='space-y-3'>
          {Array.from({ length: 3 }).map((_, lineIndex) => (
            <div
              key={lineIndex}
              className='bg-base-300 h-4 rounded'
              style={{
                width: lineIndex === 2 ? '60%' : '100%',
              }}
            />
          ))}
        </div>
      ))}
    </article>
  );
});

/**
 * Image Skeleton - For loading image placeholders
 */
export const ImageSkeleton = memo(function ImageSkeleton({
  className = '',
  aspectRatio = '16/9',
}) {
  return (
    <div
      className={`bg-base-300 rounded-box flex animate-pulse items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      <FontAwesomeIcon icon='fa-duotone fa-image text-base-content/20 text-4xl' />
    </div>
  );
});

/**
 * Button Loading - Loading state for buttons
 */
export const ButtonLoading = memo(function ButtonLoading({
  text = 'Loading',
  className = '',
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className='loading loading-spinner loading-sm' />
      <span>{text}</span>
    </span>
  );
});

/**
 * Coding Active Skeleton - For Wakatime coding stats
 */
export const CodingActiveSkeleton = memo(function CodingActiveSkeleton() {
  return (
    <div className='flex animate-pulse flex-col gap-3 sm:flex-row sm:gap-3'>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className='rounded-box border-base-300 bg-base-100 flex h-full w-full flex-1 flex-col border p-3'
        >
          <div className='flex items-center gap-1.5'>
            <div className='bg-base-300 h-5 w-5 rounded' />
            <div className='bg-base-300 h-5 w-24 rounded' />
          </div>
          <div className='bg-base-300 mt-1 h-3 w-32 rounded' />
          <div className='flex flex-col gap-1 py-2'>
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className='flex items-center gap-2'>
                <div className='bg-base-300 h-4 w-16 rounded' />
                <div className='bg-base-300 h-2 flex-1 rounded-full' />
                <div className='bg-base-300 h-4 w-10 rounded' />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

// Default export for the main Loading component
export default Loading;
