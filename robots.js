import { SITE_URL } from '@/common/constants/site';

export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				allow: ['/'],
				disallow: [
					'/api/',
					'/_next/',
					'/admin/',
					'/private/',
					'/*.json$',
					'/*?*utm*',
					'/*?*ref*',
					'/*?*source*',
				],
				crawlDelay: 1,
			},
			{
				userAgent: ['Googlebot', 'Bingbot'],
				allow: ['/'],
				disallow: [
					'/api/',
					'/_next/',
					'/admin/',
					'/private/',
				],
				crawlDelay: 1,
			},
			{
				userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp'],
				allow: ['/'],
				disallow: [],
			},
			{
				userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot'],
				disallow: ['/'],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}