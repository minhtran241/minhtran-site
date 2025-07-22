'use client';
import { SOCIAL_MEDIA } from '@/common/constants/menu';
import { userBasicInfo } from '@/common/constants/userBasic';
import Link from 'next/link';
import { MENU_TABS } from '@/common/constants/menu';
import { HOSTED_ON, TECHSTACK } from '@/common/constants/site';
import SpotifyStatus from './SpotifyStatus';

const Footer = () => {
  const techStackEntries = Object.entries(TECHSTACK);
  return (
    <footer className='footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10'>
      <nav className='grid grid-flow-col gap-4'>
        {/* <Link href="/" className="link link-hover">
                    Minh
                </Link> */}
        {MENU_TABS.slice(1).map((item, index) => (
          <Link key={index} href={item.href} className='hover:text-primary'>
            {item.title}
          </Link>
        ))}
      </nav>
      <nav>
        <div className='fa-lg grid grid-flow-col gap-4'>
          {SOCIAL_MEDIA?.filter((item) => item.type.includes('s')).map(
            (item, index) => (
              <Link
                key={index}
                href={item.href}
                target='_blank'
                rel='noreferrer'
                className='hover:text-primary fill-current'
                aria-label={item.name}
              >
                {item.icon}
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
