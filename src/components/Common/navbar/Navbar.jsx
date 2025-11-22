import Links from './links/Links';
import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import ThemeChanger from '@/common/elements/ThemeChanger';

const Navbar = () => {
  return (
    <nav
      className='navbar bg-primary text-primary-content bg-opacity-90 rounded-b-box fixed top-0 z-50 px-3 py-2 shadow-lg backdrop-blur-sm sm:py-1'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='navbar-start'>
        <div className='dropdown'>
          <button
            tabIndex={0}
            className='btn btn-ghost btn-circle hover:bg-primary-focus focus-visible:ring-primary-content focus-visible:ring-offset-primary h-12 min-h-12 w-12 focus-visible:ring-2 focus-visible:ring-offset-2 lg:hidden'
            aria-label='Open navigation menu'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <FontAwesomeIcon icon='fa-duotone fa-bars' />
          </button>
          <ul
            tabIndex={0}
            className='menu dropdown-content rounded-box border-base-200 bg-base-100 text-base-content z-1 mt-3 min-w-52 border p-2 shadow-lg'
            role='menu'
          >
            <Links />
          </ul>
        </div>
        <Link
          href='/'
          className='btn btn-ghost hover:bg-primary-focus focus-visible:ring-primary-content focus-visible:ring-offset-primary h-12 min-h-12 gap-2 font-semibold capitalize focus-visible:ring-2 focus-visible:ring-offset-2'
          aria-label='Go to homepage'
        >
          <FontAwesomeIcon icon='fa-duotone fa-home' aria-hidden='true' />
          <span className='hidden sm:inline'>Home</span>
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1' role='menubar'>
          <Links />
        </ul>
      </div>
      <div className='navbar-end gap-2'>
        <ThemeChanger />
      </div>
    </nav>
  );
};

export default Navbar;
