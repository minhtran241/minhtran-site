import Links from './links/Links';
import Link from 'next/link';
import WebStats from './webStats/webStats';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import ThemeChanger from '@/common/elements/ThemeChanger';

const Navbar = () => {
  return (
    <div className='navbar bg-primary text-primary-content bg-opacity-90 rounded-b-box fixed top-0 z-50 px-3 py-1 shadow-lg'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle lg:hidden'
            aria-label='Menu'
          >
            <FontAwesomeIcon icon='fa-duotone fa-bars' />
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content rounded-box border-base-200 bg-base-100 text-base-content z-1 mt-3 border p-2 shadow-lg'
          >
            <Links />
          </ul>
        </div>
        <Link href='/' className='btn btn-ghost gap-2 font-semibold capitalize'>
          <FontAwesomeIcon icon='fa-duotone fa-home' />
          Home
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal x-4' tabIndex={0}>
          <Links />
        </ul>
      </div>
      <div className='navbar-end gap-2'>
        <ThemeChanger />
        <WebStats />
      </div>
    </div>
  );
};

export default Navbar;
