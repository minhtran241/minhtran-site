'use client';
import { SOCIAL_MEDIA } from '@/common/constants/menu';
import { userBasicInfo } from '@/common/constants/userBasic';
import Link from 'next/link';
import { MENU_TABS } from '@/common/constants/menu';
import { HOSTED_ON, TECHSTACK } from '@/common/constants/site';
import SpotifyStatus from './SpotifyStatus';
import Image from 'next/image';

const Footer = () => {
  const techStackEntries = Object.entries(TECHSTACK);
  return (
    <footer
      className='footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10'
      role='contentinfo'
      aria-label='Site footer'
    >
      <nav className='grid grid-flow-col gap-4' aria-label='Footer navigation'>
        {MENU_TABS.slice(1).map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className='hover:text-primary focus-visible:ring-primary rounded transition-colors focus-visible:underline focus-visible:ring-2 focus-visible:outline-none'
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <nav aria-label='Social media links'>
        <div className='grid grid-flow-col gap-4'>
          {SOCIAL_MEDIA?.filter((item) => item.type.includes('s')).map(
            (item, index) => (
              <Link
                key={index}
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary focus-visible:ring-primary rounded fill-current transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:outline-none'
                aria-label={`Visit ${item.name} profile`}
              >
                <Image
                  src={item.img}
                  alt=''
                  width={24}
                  height={24}
                  aria-hidden='true'
                />
              </Link>
            ),
          )}
        </div>
      </nav>
      <SpotifyStatus />
      <aside className='flex flex-col items-center'>
        <div className=''>
          Powered by{' '}
          {techStackEntries.map(([key, value], index) => (
            <span key={index}>
              <Link
                href={value}
                target='_blank'
                rel='noreferrer'
                className='link link-primary link-hover'
              >
                {key}
              </Link>
              {index < techStackEntries.length - 2 && ', '}
              {index === techStackEntries.length - 2 && ', and '}
            </span>
          ))}
          . Hosted on{' '}
          <Link
            href={HOSTED_ON.url}
            target='_blank'
            rel='noreferrer'
            className='link link-primary link-hover'
          >
            {HOSTED_ON.name}
          </Link>
          .
        </div>
        <p className='flex items-center'>
          © {new Date().getFullYear()} {userBasicInfo.fullName}
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
