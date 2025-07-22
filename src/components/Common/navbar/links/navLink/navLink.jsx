import Link from 'next/link';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';

const NavLink = ({ item }) => {
  const pathName = usePathname();
  return (
    <NavigationMenuItem>
      <Link href={item.path} legacyBehavior passHref>
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/20 hover:text-white ${pathName === item.path && 'bg-white/20'} `}
        >
          {item.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default NavLink;
