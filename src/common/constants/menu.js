import FontAwesomeIcon from '../elements/FontAwesomeIcon';
import { userBasicInfo } from '@/common/constants/userBasic';

export const SOCIAL_MEDIA = [
  {
    name: 'Email',
    title: userBasicInfo.email,
    href: `mailto:${userBasicInfo.email}`,
    type: 'sw', // social and work
    // icon: <Mail className="lg:w-5 lg:h-5 w-4 h-4" />,
    icon: <FontAwesomeIcon icon='fa-brands fa-google' />,
    className: '!bg-gradient-to-r from-[#D44638] to-[#D44638] border',
  },

  {
    name: 'LinkedIn',
    title: userBasicInfo.linkedinUsername,
    href: userBasicInfo.linkedinLink,
    type: 'sw', // social and work
    icon: <FontAwesomeIcon icon='fa-brands fa-linkedin' />,
    className: '!bg-gradient-to-r from-[#0077B5] to-[#00A0DC] border',
  },
  // {
  //     name: 'X',
  //     title: userBasicInfo.twitterUsername,
  //     href: userBasicInfo.twitterLink,
  //     type: 's', // social only
  //     icon: <FontAwesomeIcon icon="fa-brands fa-x-twitter" />,
  //     className: '!bg-gradient-to-r from-[#1DA1F2] to-[#1DA1F2] border',
  // },
  {
    name: 'Instagram',
    title: `@${userBasicInfo.instagramUsername}`,
    href: userBasicInfo.instagramLink,
    type: 's', // social only
    icon: <FontAwesomeIcon icon='fa-brands fa-instagram' />,
    className: '!bg-gradient-to-r from-[#E1306C] to-[#405DE6] border',
  },
  {
    name: 'Facebook',
    title: userBasicInfo.facebookUsername,
    href: userBasicInfo.facebookLink,
    type: 's', // social only
    icon: <FontAwesomeIcon icon='fa-brands fa-facebook' />,
    className: '!bg-gradient-to-r from-[#1877F2] to-[#1877F2] border ',
  },
  {
    name: 'Github',
    title: userBasicInfo.githubUsername,
    href: userBasicInfo.githubLink,
    type: 'sw', // social and work
    icon: <FontAwesomeIcon icon='fa-brands fa-github' />,
    className: '!bg-gradient-to-r from-[#333333] to-[#333333] border ',
  },
];

export const MENU_TABS = [
  {
    title: 'Home',
    href: '/',
    icon: <FontAwesomeIcon icon='fa-duotone fa-home' />,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: <FontAwesomeIcon icon='fa-duotone fa-project-diagram' />,
  },
  {
    title: 'Blogs',
    href: '/blogs',
    icon: <FontAwesomeIcon icon='fa-duotone fa-blog' />,
  },
  // {
  //     title: 'Reads',
  //     href: '/reads',
  // },
  {
    title: 'Uses',
    href: '/uses',
    icon: <FontAwesomeIcon icon='fa-duotone fa-tools' />,
  },
  // {
  //     title: 'Contact',
  //     href: '/contact',
  //     icon: <FontAwesomeIcon icon="fa-duotone fa-envelope" />,
  // },
];
