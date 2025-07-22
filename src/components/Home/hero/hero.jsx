'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userBasicInfo } from '@/common/constants/userBasic';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Loading from '@/app/loading';
import { SOCIAL_MEDIA } from '@/common/constants/menu';
// import ResumeViewer from './resumeViewer';

const ContactInfoModal = () => (
  <dialog id='contact_info_modal' className='modal'>
    <div className='modal-box max-w-md'>
      <form method='dialog'>
        <button className='btn btn-sm btn-circle btn-ghost hover:bg-base-200 absolute top-3 right-3 transition-colors'>
          <FontAwesomeIcon icon='fa-solid fa-times' />
        </button>
      </form>

      <div className='mb-6'>
        <h3 className='flex items-center gap-3 text-xl font-bold'>
          <FontAwesomeIcon icon='fa-solid fa-info-circle' />
          Contact Information
        </h3>
        <p className='text-base-content/60 mt-2 text-sm'>
          Get in touch through any of these channels
        </p>
      </div>

      <div className='space-y-4'>
        {SOCIAL_MEDIA.slice(1).map((item, index) => (
          <div
            key={index}
            className='bg-base-200/50 hover:bg-base-200 flex items-center gap-4 rounded-lg p-3 transition-colors'
          >
            <div className='text-primary text-lg'>{item.icon}</div>
            <div className='flex-1'>
              <p className='text-base-content/80 text-sm font-medium'>
                {item.name}
              </p>
              <Link
                href={item.href}
                target='_blank'
                className='link link-primary link-hover font-semibold'
              >
                {item.title}
              </Link>
            </div>
            <FontAwesomeIcon
              icon='fa-solid fa-external-link'
              className='text-base-content/40 text-xs'
            />
          </div>
        ))}
      </div>
    </div>
    <form method='dialog' className='modal-backdrop'>
      <button>close</button>
    </form>
  </dialog>
);

const HeroComponent = () => {
  const handleShowModal = () => {
    document.getElementById('contact_info_modal')?.showModal();
  };

  return (
    <div className='container mx-auto pt-28'>
      <div className='from-base-100 to-base-200/30 border-base-300/50 rounded-2xl border bg-gradient-to-br p-6 shadow-xl md:p-8'>
        <div className='hero-content flex flex-col items-center gap-12 lg:flex-row'>
          {/* Profile Picture */}
          <div className='group relative'>
            <div className='avatar'>
              <div className='ring-primary ring-offset-base-100 group-hover:ring-primary-focus h-40 w-40 overflow-hidden rounded-full shadow-2xl ring-4 ring-offset-4 transition-all duration-300 group-hover:scale-105'>
                <Image
                  src='/home/headshot.png'
                  alt={`${userBasicInfo.fullName} headshot`}
                  width={160}
                  height={160}
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                  priority
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className='from-primary/20 to-secondary/20 absolute -inset-4 rounded-full bg-gradient-to-r opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50'></div>
          </div>

          {/* User Information */}
          <div className='flex flex-1 flex-col gap-8 text-center lg:text-left'>
            {/* Name and Description */}
            <div className='space-y-4'>
              <div>
                <h1 className='from-base-content to-base-content/80 bg-gradient-to-r bg-clip-text text-2xl leading-tight font-extrabold lg:text-3xl'>
                  {userBasicInfo.fullName}
                </h1>
                <div className='badge badge-soft badge-primary'>
                  <FontAwesomeIcon icon='fa-solid fa-user' />
                  He/Him
                </div>
              </div>
              <p className='text-base-content/80 max-w-2xl text-lg leading-relaxed font-medium'>
                {userBasicInfo.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className='flex flex-col items-center gap-8 xl:flex-row xl:items-start xl:justify-between'>
              {/* Contact Details */}
              <div className='space-y-4'>
                <div className='group flex cursor-default items-center gap-4'>
                  <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors'>
                    <FontAwesomeIcon icon='fa-solid fa-map-marker-alt' />
                  </div>
                  <span className='font-medium'>Grand Rapids, MI, USA</span>
                </div>

                <div className='group flex items-center gap-4'>
                  <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors'>
                    <FontAwesomeIcon icon='fa-solid fa-envelope' />
                  </div>
                  <Link
                    href={`mailto:${userBasicInfo.email}`}
                    className='link link-primary link-hover font-medium transition-colors'
                  >
                    {userBasicInfo.email}
                  </Link>
                </div>

                {/* <div className="flex items-center gap-4 group">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
										<FontAwesomeIcon icon="fa-brands fa-linkedin" />
									</div>
									<Link
										href={userBasicInfo.linkedinLink}
										target="_blank"
										className="link link-primary link-hover font-medium transition-colors"
									>
										{userBasicInfo.linkedinUsername}
									</Link>
								</div> */}

                <div className='group flex items-center gap-4'>
                  <div className='bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors'>
                    <FontAwesomeIcon icon='fa-solid fa-info-circle' />
                  </div>
                  <button
                    onClick={handleShowModal}
                    className='link link-primary link-hover font-medium transition-colors'
                  >
                    More contact info
                  </button>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className='flex min-w-fit flex-col gap-4'>
                <Link
                  href={fileSystemInfo.resumeLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary btn-lg'
                >
                  <FontAwesomeIcon icon='fa-solid fa-file-pdf' />
                  Download Resume
                </Link>
                {/* <ResumeViewer /> */}
                <Link
                  href={userBasicInfo.bookACallLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-outline btn-primary btn-lg'
                >
                  <FontAwesomeIcon icon='fa-solid fa-calendar-check' />
                  Book a Call
                </Link>

                {/* Quick Stats */}
                <div className='mt-2 flex justify-center gap-4 lg:justify-start'>
                  <div className='text-center'>
                    <div className='text-primary text-lg font-bold'>
                      CS+MATH
                    </div>
                    <div className='text-base-content/60 text-xs'>
                      B.S. @GVSU
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-primary text-lg font-bold'>SWE/DE</div>
                    <div className='text-base-content/60 text-xs'>@ACI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle background pattern */}
        <div className='bg-grid-pattern pointer-events-none absolute inset-0 rounded-2xl opacity-5'></div>
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
