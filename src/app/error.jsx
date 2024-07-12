'use client';

import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const Error = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-[#0033A0] dark:text-blue-600">
                Oops!
            </p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider mt-4">
                Something went wrong.
            </p>
            <p className="text-gray-700 mt-4 pb-4 border-b-2 text-center">
                Sorry, the page you are looking for could not be found.
            </p>
            <Link
                href="/"
                className="flex items-center space-x-2 bg-[#0033A0] hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 mt-6 rounded transition duration-150"
                title="Return Home"
            >
                <FontAwesomeIcon icon="fa-duotone fa-arrow-left" />
                <span>Return Home</span>
            </Link>
        </div>
    );
};

export default Error;
