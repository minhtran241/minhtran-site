'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContactInfoModal } from '@/components/Home/hero/contactInfoModal';
import { LocationModal } from '@/components/Home/hero/locationModal';
import { userBasicInfo } from '@/common/constants/userBasic';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import { getLocationText } from '@/common/constants/location';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const Hero = () => {
  const headshotSrc = '/home/headshot.png';

  return (
    <article aria-label='Hero section'>
      <div className='border-primary/20 bg-base-100/50 rounded-box relative overflow-hidden border shadow-sm backdrop-blur-sm'>
        <div className='relative p-8 md:p-10'>
          <div className='flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12'>
            {/* Profile Picture */}
            <div className='group relative shrink-0'>
              <div className='relative'>
                {/* Simplified accent ring */}
                <div className='border-primary/15 group-hover:border-primary/30 rounded-box absolute -inset-3 border transition-all duration-300 group-hover:scale-105'></div>

                <div className='border-base-100 ring-primary/20 group-hover:ring-primary/40 rounded-box relative z-10 h-36 w-36 overflow-hidden border-4 shadow-lg ring-2 transition-all duration-300 group-hover:shadow-xl lg:h-40 lg:w-40'>
                  <Image
                    src={headshotSrc}
                    alt={`${userBasicInfo.fullName} headshot`}
                    width={160}
                    height={160}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    priority
                    sizes='(max-width: 1024px) 144px, 160px'
                  />
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className='flex flex-1 flex-col gap-6'>
              {/* Name and Title */}
              <div className='space-y-3'>
                <h1 className='text-base-content text-center text-2xl font-bold tracking-tight lg:text-left lg:text-3xl'>
                  {userBasicInfo.fullName}
                </h1>

                {/* Description */}
                <p className='text-base-content/70 max-w-2xl text-center text-base leading-relaxed lg:text-left lg:text-lg'>
                  {userBasicInfo.description}
                </p>
              </div>
              {/* Quick Info Pills */}
              <div className='flex flex-wrap items-center justify-center gap-2 lg:justify-start'>
                <button
                  onClick={() =>
                    document.getElementById('location_modal')?.showModal()
                  }
                  className='bg-primary/10 hover:bg-primary/20 border-primary/30 hover:border-primary/40 group flex items-center gap-2 rounded-full border-2 px-4 py-2 transition-all'
                  aria-label='View location on map'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-map-marker-alt'
                    className='text-primary text-sm'
                  />
                  <span className='text-base-content text-sm font-medium'>
                    {getLocationText()}
                  </span>
                  <FontAwesomeIcon
                    icon='fa-solid fa-map'
                    className='text-primary/60 text-xs'
                  />
                </button>
                <Link
                  href={`mailto:${userBasicInfo.email}`}
                  className='bg-primary/10 hover:bg-primary/20 border-primary/30 hover:border-primary/40 flex items-center gap-2 rounded-full border-2 px-4 py-2 transition-all'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-envelope'
                    className='text-primary text-sm'
                  />
                  <span className='text-base-content text-sm font-medium'>
                    {userBasicInfo.email}
                  </span>
                </Link>
                <button
                  onClick={() =>
                    document.getElementById('contact_info_modal')?.showModal()
                  }
                  className='bg-primary/10 hover:bg-primary/20 border-primary/30 hover:border-primary/40 flex items-center gap-2 rounded-full border-2 px-4 py-2 transition-all'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-share-nodes'
                    className='text-primary text-sm'
                  />
                  <span className='text-base-content text-sm font-medium'>
                    More links
                  </span>
                </button>
              </div>{' '}
              {/* Call-to-Action Buttons */}
              <div className='flex flex-col items-center gap-3 sm:flex-row lg:justify-start'>
                <Link
                  href={fileSystemInfo.resumeLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary focus-visible:ring-primary w-full gap-2 shadow-sm transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto'
                  download
                  aria-label='Download CV as PDF'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-file-pdf'
                    aria-hidden='true'
                  />
                  Download CV
                </Link>
                <Link
                  href={userBasicInfo.bookACallLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-outline btn-primary focus-visible:ring-primary w-full gap-2 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto'
                  aria-label='Schedule a meeting with Minh'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-calendar-check'
                    aria-hidden='true'
                  />
                  Schedule Meeting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactInfoModal />
      <LocationModal />
    </article>
  );
};

export default Hero;
