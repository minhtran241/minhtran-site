import Links from './links/Links';
import Link from 'next/link';
import WebStats from './webStats/webStats';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import ThemeChanger from '@/common/elements/ThemeChanger';

const Navbar = () => {
	return (
		<div className="navbar bg-base-100 text-primary-content top-0 z-50 shadow-lg bg-opacity-90 fixed rounded-b-box">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden fa-lg text-base-content hover:text-primary"
						aria-label="Menu"
					>
						<FontAwesomeIcon icon="fa-duotone fa-bars" />
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content rounded-box mt-3 z-[1] p-2 shadow bg-base-100 text-base-content"
					>
						<Links />
					</ul>
				</div>
				<Link
					href="/"
					className="btn btn-ghost text-xl text-base-content hover:text-primary"
					role="button"
				>
					<FontAwesomeIcon icon="fa-duotone fa-home" />
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<Links />
				</ul>
			</div>
			<div className="navbar-end">
				<ThemeChanger />
				<WebStats />
			</div>
		</div>
	);
};
export default Navbar;
