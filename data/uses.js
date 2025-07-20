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
			name: 'Ghostty',
			metadata: 'Terminal uses platform-native UI and GPU acceleration',
			href: 'https://ghostty.org/',
			id: 'minhtran-ghostty',
			image: '/uses/coding/ghostty.png',
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
			name: 'Insomnia',
			metadata: 'API Client',
			href: 'https://insomnia.rest/',
			id: 'minhtran-insomnia',
			image: '/uses/coding/insomnia.png',
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
		{
			name: 'Nord Theme',
			metadata: 'Theme for VS Code',
			href: 'https://www.nordtheme.com/',
			id: 'minhtran-nordtheme',
			image: '/uses/coding/nord.png',
		},
	],
	Softwares: [
		{
			name: 'Stats',
			metadata: 'System monitor',
			href: 'https://github.com/exelban/stats',
			id: 'minhtran-stats',
			image: '/uses/softwares/stats.png',
		},
		{
			name: 'AnyDesk',
			metadata: 'Remote Desktop',
			href: 'https://anydesk.com/',
			id: 'minhtran-anydesk',
			image: '/uses/softwares/anydesk.png',
		},
		// {
		//     name: 'RealVNC Viewer',
		//     metadata: 'Remote Desktop',
		//     href: 'https://www.realvnc.com/',
		//     id: 'minhtran-realvnc',
		//     image: '/uses/softwares/realvnc.webp',
		// },
		{
			name: 'Netbird',
			metadata: 'Network management',
			href: 'https://netbird.io',
			id: 'minhtran-netbird',
			image: '/uses/softwares/netbird.png',
		},
		{
			name: 'Notion',
			metadata: 'Note-taking',
			href: 'https://www.notion.so/',
			id: 'minhtran-notion',
			image: '/uses/softwares/notion.svg',
		},
		{
			name: 'CleanMyMac',
			metadata: 'Mac cleaner',
			href: 'https://cleanmymac.com',
			id: 'minhtran-cleanmymac',
			image: '/uses/softwares/cleanmymac.png',
		},
		{
			name: 'Dropbox',
			metadata: 'File storage',
			href: 'https://www.dropbox.com/',
			id: 'minhtran-dropbox',
			image: '/uses/softwares/dropbox.svg',
		},
		{
			name: 'Safari',
			metadata: 'Web Browser',
			href: 'https://www.apple.com/safari/',
			id: 'minhtran-safari',
			image: '/uses/softwares/safari.svg',
		},
		{
			name: 'Spotify',
			metadata: 'Music Streaming',
			href: 'https://www.spotify.com/',
			id: 'minhtran-spotify',
			image: '/uses/softwares/spotify.svg',
		},
		{
			name: 'VLC',
			metadata: 'Media Player',
			href: 'https://www.videolan.org/vlc/',
			id: 'minhtran-vlc',
			image: '/uses/softwares/vlc.svg',
		},
	],
};
