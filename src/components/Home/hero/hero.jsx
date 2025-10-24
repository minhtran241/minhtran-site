import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ContactInfoModal,
  ShowContactInfoButton,
} from '@/components/Home/hero/contactInfoModal';
import { userBasicInfo } from '@/common/constants/userBasic';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Loading from '@/app/loading';
import { getBase64 } from '@/common/libs/plaiceholder';

const HeroComponent = async () => {
  const headshotSrc = '/home/headshot.png';
  const base64 = await getBase64(headshotSrc);

  return (
    <div>
      <div className='border-base-300/50 bg-base-100 relative overflow-hidden rounded-2xl border'>
        {/* Academic background pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[20px_20px]'></div>

        {/* Gradient overlay */}
        <div className='from-primary/5 to-secondary/5 absolute inset-0 bg-linear-to-br via-transparent'></div>

        <div className='relative p-6 md:p-8'>
          <div className='flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-10'>
            {/* Profile Picture */}
            <div className='group relative shrink-0'>
              <div className='relative'>
                {/* Geometric accent */}
                <div className='border-primary/20 absolute -inset-4 rotate-3 rounded-xl border transition-transform duration-500 group-hover:rotate-6'></div>
                <div className='border-secondary/20 absolute -inset-4 -rotate-3 rounded-xl border transition-transform duration-500 group-hover:-rotate-6'></div>

                <div className='border-base-100 ring-primary/30 group-hover:ring-primary/50 relative z-10 h-32 w-32 overflow-hidden rounded-xl border-2 shadow-lg ring-1 transition-all duration-300 group-hover:shadow-xl'>
                  <Image
                    src={headshotSrc}
                    alt={`${userBasicInfo.fullName} headshot`}
                    width={128}
                    height={128}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                    placeholder='blur'
                    blurDataURL={base64}
                  />
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className='flex flex-1 flex-col gap-5'>
              {/* Name and Title */}
              <div className='space-y-2'>
                <div className='flex flex-col items-center gap-2 lg:flex-row lg:items-center'>
                  <h1 className='text-base-content text-2xl font-bold tracking-tight lg:text-3xl'>
                    {userBasicInfo.fullName}
                  </h1>
                  <div className='badge badge-primary gap-1.5 text-xs font-semibold'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-user'
                      className='text-xs'
                    />
                    He/Him
                  </div>
                </div>

                {/* Academic credentials */}
                <div className='flex flex-wrap items-center justify-center gap-1.5 lg:justify-start'>
                  <div className='badge badge-outline badge-sm gap-1.5'>
                    <FontAwesomeIcon icon='fa-solid fa-graduation-cap' />
                    CS + Mathematics
                  </div>
                  <div className='badge badge-outline badge-sm gap-1.5'>
                    <FontAwesomeIcon icon='fa-solid fa-building' />
                    GVSU
                  </div>
                  <div className='badge badge-outline badge-sm gap-1.5'>
                    <FontAwesomeIcon icon='fa-solid fa-briefcase' />
                    SWE/DE @ ACI
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className='text-base-content/80 max-w-3xl text-center leading-relaxed lg:text-left'>
                {userBasicInfo.description}
              </p>

              {/* Divider */}
              <div className='divider my-0'></div>

              {/* Contact Information Grid */}
              <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3'>
                <div className='group bg-base-200/50 hover:bg-base-200 flex items-center gap-2.5 rounded-lg p-2.5 transition-all duration-200'>
                  <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-map-marker-alt'
                      className='text-sm'
                    />
                  </div>
                  <div>
                    <div className='text-base-content/60 text-sm font-medium'>
                      Location
                    </div>
                    <div className='text-sm font-semibold'>
                      Grand Rapids, MI
                    </div>
                  </div>
                </div>

                <div className='group bg-base-200/50 hover:bg-base-200 flex items-center gap-2.5 rounded-lg p-2.5 transition-all duration-200'>
                  <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-envelope'
                      className='text-sm'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='text-base-content/60 text-sm font-medium'>
                      Email
                    </div>
                    <Link
                      href={`mailto:${userBasicInfo.email}`}
                      className='link link-primary link-hover truncate text-sm font-semibold'
                    >
                      {userBasicInfo.email}
                    </Link>
                  </div>
                </div>

                <div className='group bg-base-200/50 hover:bg-base-200 flex items-center gap-2.5 rounded-lg p-2.5 transition-all duration-200 sm:col-span-2 lg:col-span-1'>
                  <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-info-circle'
                      className='text-sm'
                    />
                  </div>
                  <div className='flex-1'>
                    <div className='text-base-content/60 text-sm font-medium'>
                      More Info
                    </div>
                    <ShowContactInfoButton />
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className='flex flex-col items-center gap-2.5 sm:flex-row lg:justify-start'>
                <Link
                  href={fileSystemInfo.resumeLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary w-full gap-2 sm:w-auto'
                  download
                >
                  <FontAwesomeIcon icon='fa-solid fa-file-pdf' />
                  Download CV
                </Link>
                <Link
                  href={userBasicInfo.bookACallLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-outline btn-primary w-full gap-2 sm:w-auto'
                >
                  <FontAwesomeIcon icon='fa-solid fa-calendar-check' />
                  Schedule Meeting
                </Link>
              </div>

              {/* Research Interests */}
              <div className='flex flex-wrap gap-1.5'>
                <div className='badge badge-sm bg-primary/10 text-primary'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-code'
                    className='mr-1 text-xs'
                  />
                  Software Engineering
                </div>
                <div className='badge badge-sm bg-secondary/10 text-secondary'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-cloud'
                    className='mr-1 text-xs'
                  />
                  Edge Computing
                </div>
                <div className='badge badge-sm bg-accent/10 text-accent'>
                  {/* // text-accent changed to text-secondary */}
                  <FontAwesomeIcon
                    icon='fa-solid fa-database'
                    className='mr-1 text-xs'
                  />
                  Database Systems
                </div>
                <div className='badge badge-sm bg-primary/10 text-primary'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-brain'
                    className='mr-1 text-xs'
                  />
                  Deep Learning &amp; AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactInfoModal />
    </div>
  );
};

const Hero = () => (
  <Suspense fallback={<Loading fullPage={false} />}>
    <HeroComponent />
  </Suspense>
);

export default Hero;
