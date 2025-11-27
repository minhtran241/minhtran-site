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

// Default export for the main Loading component
export default Loading;
