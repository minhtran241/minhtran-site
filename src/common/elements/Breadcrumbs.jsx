import Link from 'next/link';

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav className='breadcrumbs font-medium lg:text-base'>
      <ul className='flex items-center'>
        <li>
          <Link
            href='/'
            className='text-base-content/60 hover:text-primary flex items-center gap-2 transition-colors duration-200'
          >
            <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
            </svg>
            Home
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link
              href={breadcrumb.href}
              className={`transition-colors duration-200 ${
                index === breadcrumbs.length - 1
                  ? 'text-primary font-semibold'
                  : 'text-base-content/60 hover:text-primary'
              }`}
            >
              {breadcrumb.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
