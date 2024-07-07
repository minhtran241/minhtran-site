'use client';

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
} from 'next-share';
import { usePathname } from 'next/navigation';
import { useState, React } from 'react';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const ShareButton = ({ onClick, children }) => (
    <div
        onClick={onClick}
        className="btn btn-circle btn-sm flex items-center justify-center dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200"
    >
        {children}
    </div>
);

const SharePost = () => {
    const status = 'Check out this blog by Minh Tran';
    const hashtag = '#softwareengineer #dataengineer';
    const path = usePathname();
    const url = process.env.NEXT_PUBLIC_BASE_URL + path;

    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const handleCopyLink = () => {
        setIsLinkCopied(true);
        navigator.clipboard.writeText(url);
    };

    const shareButtons = [
        {
            ButtonComponent: EmailShareButton,
            icon: <FontAwesomeIcon icon="fa-duotone fa-envelope" />,
            props: {
                url,
                subject: status,
                windowWidth: 670,
                windowHeight: 400,
            },
        },
        {
            ButtonComponent: LinkedinShareButton,
            icon: <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />,
            props: { url, title: status, windowWidth: 670, windowHeight: 400 },
        },
        {
            ButtonComponent: FacebookShareButton,
            icon: <FontAwesomeIcon icon="fa-brands fa-facebook-f" />,
            props: {
                url,
                quote: status,
                hashtag,
                windowWidth: 670,
                windowHeight: 400,
            },
        },
        {
            ButtonComponent: TwitterShareButton,
            icon: <FontAwesomeIcon icon="fa-brands fa-x-twitter" />,
            props: { url, title: status, windowWidth: 670, windowHeight: 400 },
        },
    ];

    return (
        <div className="flex flex-row space-x-2">
            <ShareButton onClick={handleCopyLink}>
                {isLinkCopied ? (
                    <FontAwesomeIcon icon="fa-duotone fa-check-double" />
                ) : (
                    <FontAwesomeIcon icon="fa-duotone fa-link-horizontal" />
                )}
            </ShareButton>
            {shareButtons.map(({ ButtonComponent, icon, props }, index) => (
                <ButtonComponent key={index} {...props}>
                    <ShareButton>{icon}</ShareButton>
                </ButtonComponent>
            ))}
        </div>
    );
};

export default SharePost;
