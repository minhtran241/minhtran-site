import Link from 'next/link';
import { MENU_TABS } from '@/common/constants/menu';

const Links = () => {
    return (
        <>
            {MENU_TABS.slice(1).map((item, index) => (
                <li key={index}>
                    {/* a button that have icon and small text below (flex collumn)*/}
                    <Link
                        className="flex flex-col gap-1 items-center justify-center text-base-content hover:text-primary"
                        href={item.href}
                    >
                        {item.icon}
                        <span className="text-xs">{item.title}</span>
                    </Link>
                </li>
            ))}
        </>
    );
};

export default Links;
