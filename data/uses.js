import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const iconClassName = 'w-auto';

export const PAIR_DEVICES = {
    Computer: {
        icon: (
            <FontAwesomeIcon icon={`fa-duotone fa-laptop ${iconClassName}`} />
        ),
        model: 'MacBook Pro M1',
        id: 'minhtran-mac',
    },
    Smartphone: {
        icon: (
            <FontAwesomeIcon
                icon={`fa-duotone fa-mobile-notch ${iconClassName}`}
            />
        ),
        model: 'iPhone 13',
        id: 'minhtran-iphone',
    },
    Tablet: {
        icon: (
            <FontAwesomeIcon icon={`fa-duotone fa-tablet ${iconClassName}`} />
        ),
        model: 'iPad Pro 2021',
        id: 'minhtran-ipad',
    },
};

export const USES = {
    Devices: [
        {
            name: 'MacBook Pro M1 16 inch, 2021',
            metadata: '16GB RAM, 1TB SSD',
            href: 'https://www.apple.com/macbook-pro-14-and-16/',
            id: 'minhtran-mac',
            image: '/uses/accessories/macbook-pro.jpg',
        },
        {
            name: 'iPhone 13',
            metadata: 'Blue, 256GB',
            href: 'https://www.apple.com/iphone-13/',
            id: 'minhtran-iphone',
            image: '/uses/accessories/ip-13.jpg',
        },
        {
            name: 'iPad Pro, 2021',
            metadata: '12.9-inch, 256GB',
            href: 'https://www.apple.com/ipad-pro-12-9/',
            id: 'minhtran-ipad',
            image: '/uses/accessories/ipad-pro.jpg',
        },
        {
            name: 'AirPods Pro (2nd Gen)',
            metadata: 'Active Noise Cancellation',
            href: 'https://www.apple.com/airpods-pro/',
            id: 'minhtran-airpods',
            image: '/uses/accessories/airpods-pro.jpeg',
        },
    ],
    DevTools: [
        {
            name: 'Visual Studio Code',
            metadata: 'Code Editor',
            href: 'https://code.visualstudio.com/',
            id: 'minhtran-vscode',
            image: '/uses/coding/vscode.svg',
        },
        {
            name: 'IntelliJ IDEA',
            metadata: 'Java IDE',
            href: 'https://www.jetbrains.com/idea/',
            id: 'minhtran-intellij',
            image: '/uses/coding/intellij.svg',
        },
        {
            name: 'Jupyter Notebook',
            metadata: 'Data Science IDE',
            href: 'https://jupyter.org/',
            id: 'minhtran-jupyter',
            image: '/uses/coding/jupyter.svg',
        },
        {
            name: 'Xcode',
            metadata: 'IDE for Apple uses',
            href: 'https://developer.apple.com/xcode/',
            id: 'minhtran-xcode',
            image: '/uses/coding/xcode.svg',
        },
        {
            name: 'Android Studio',
            metadata: 'IDE for Android uses',
            href: 'https://developer.android.com/studio',
            id: 'minhtran-androidstudio',
            image: '/uses/coding/androidstudio.svg',
        },
        {
            name: 'Warp',
            metadata: 'Terminal Reimagined',
            href: 'https://www.warp.dev',
            id: 'minhtran-warp',
            image: '/uses/coding/warp.png',
        },
        {
            name: 'DBeaver',
            metadata: 'Database Management',
            href: 'https://dbeaver.io/',
            id: 'minhtran-dbeaver',
            image: '/uses/coding/DBeaver.svg',
        },
        {
            name: 'Docker',
            metadata: 'Containerization Platform',
            href: 'https://www.docker.com/',
            id: 'minhtran-docker',
            image: '/uses/coding/docker.svg',
        },
        {
            name: 'Postman',
            metadata: 'API Client Software',
            href: 'https://www.postman.com/',
            id: 'minhtran-postman',
            image: '/uses/coding/postman.svg',
        },
        {
            name: 'Cloudflare',
            metadata: 'DNS, CDN & Security',
            href: 'https://www.cloudflare.com/',
            id: 'minhtran-cloudflare',
            image: '/uses/coding/cloudflare.svg',
        },
        {
            name: 'AWS',
            metadata: 'Cloud Services',
            href: 'https://aws.amazon.com/',
            id: 'minhtran-aws',
            image: '/uses/coding/aws.svg',
        },
        {
            name: 'Digital Ocean',
            metadata: 'Cloud Services',
            href: 'https://www.digitalocean.com/',
            id: 'minhtran-digitalocean',
            image: '/uses/coding/digitalocean.svg',
        },
    ],
};
