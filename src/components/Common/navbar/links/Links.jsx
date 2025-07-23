import Link from 'next/link';
import { MENU_TABS } from '@/common/constants/menu';

const Links = () => {
  return (
    <>
      {MENU_TABS.slice(1).map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className='flex flex-col items-center justify-center gap-1 px-4'
          >
            <span className='text-lg'>{item.icon}</span>
            <span className='text-xs font-medium'>{item.title}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default Links;
