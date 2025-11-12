# Minh Tran - Professional Portfolio Website

A comprehensive, high-performance portfolio website showcasing professional experience, technical expertise, published work, and open-source contributions. Built with modern web technologies and optimized for performance and accessibility.

## Overview

This is the source repository for minhtran.com, a professional portfolio and knowledge-sharing platform. The website serves as a central hub to highlight professional background, technical projects, research publications, and technical insights through an active blog.

## Technical Stack

### Core Framework

- **Next.js 16.0.0** - React framework with server-side rendering and static generation
- **React 19.2.0** - Modern UI library with concurrent rendering capabilities
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for responsive design
- **DaisyUI 5.3.8** - Tailwind CSS component library for enhanced UI

### Content & Media Processing

- **Markdown Processing**
  - `react-markdown` - Markdown to React component conversion
  - `remark-gfm` - GitHub Flavored Markdown support
  - `rehype-raw` - Raw HTML in markdown
  - `reading-time` - Article reading time estimation

- **Image Optimization**
  - `next/image` - Next.js optimized image component
  - `sharp` - Image processing and optimization
  - `@plaiceholder/next` - Responsive placeholder generation

### Data & Services Integration

- **API Integration**
  - `@apollo/client` - GraphQL client for data fetching
  - `swr` - Data fetching with caching and revalidation
  - `axios` - HTTP client

- **External Services**
  - Spotify API integration for music tracking
  - WakaTime API integration for coding activity metrics
  - Cohere AI integration for content generation

### Monitoring & Analytics

- `@vercel/analytics` - Web analytics
- `@vercel/speed-insights` - Performance monitoring
- `@umami/api-client` - Privacy-focused analytics

### Development Tools

- **Package Manager**: Bun 1.3.0
- **Node Version**: >=18.18.0
- **Build Tool**: Turbopack for rapid development

- **Code Quality**
  - ESLint - JavaScript linting
  - Prettier - Code formatting
  - Husky - Git hooks management
  - lint-staged - Pre-commit linting

### UI & Utilities

- **Data Visualization**
  - `recharts` - React charting library

- **Utilities**
  - `clsx` - Conditional className management
  - `tailwind-merge` - Tailwind CSS class merging
  - `date-fns` - Date manipulation library
  - `date-fns-tz` - Timezone support
  - `theme-change` - Dark mode switching
  - `jsdom` - DOM implementation for server-side rendering

## Project Structure

```text
/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.jsx           # Home page
│   │   ├── layout.js          # Root layout
│   │   ├── api/               # API routes
│   │   ├── blogs/             # Blog routes
│   │   ├── projects/          # Projects routes
│   │   ├── uses/              # Uses/tech stack routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Common/            # Shared components
│   │   ├── Home/              # Homepage components
│   │   ├── Post/              # Blog post components
│   │   ├── Project/           # Project components
│   │   └── Uses/              # Uses/tech components
│   ├── common/                # Shared utilities
│   │   ├── constants/         # Application constants
│   │   ├── elements/          # Reusable elements
│   │   ├── helpers/           # Utility functions
│   │   └── libs/              # Library wrappers
│   └── services/              # External service integrations
│       ├── spotify.js         # Spotify API service
│       └── wakatime.js        # WakaTime API service
├── data/                      # Static data files
│   ├── employment.json        # Employment history
│   ├── education.json         # Education background
│   ├── publications.json      # Research publications
│   ├── projectList.js         # Featured projects
│   ├── uses.js                # Technology stack
│   ├── blogs/                 # Blog content
│   │   ├── blogs.json         # Blog metadata
│   │   └── contents/          # Markdown blog posts
│   └── news-logs.json         # News and updates
├── public/                    # Static assets
│   ├── blog/                  # Blog assets
│   ├── projects/              # Project assets
│   ├── home/                  # Homepage assets
│   ├── memoji/                # Avatar images
│   └── favicon/               # Web app icons
├── assets/                    # Additional assets
│   ├── fa6/                   # FontAwesome 6 icons
│   └── font/                  # Custom fonts
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.mjs          # ESLint configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- Bun 1.3.0 or higher (recommended package manager)

### Installation

```bash
# Install dependencies using Bun
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Development

```bash
# Start development server with Turbopack
bun run dev

# Server will be available at http://localhost:3000
```

### Build

```bash
# Build for production
bun run build

# Start production server
bun run start
```

### Code Quality

```bash
# Check code formatting
bun run check

# Fix code formatting
bun run format

# Run linting
bun run prettier
```

## Features

### Professional Profile

- Comprehensive employment history with detailed experience descriptions
- Educational background and certifications
- Published research and academic contributions
- Integration with external services for real-time activity tracking

### Technical Blog

- Markdown-based content with syntax highlighting
- Reading time estimation
- GitHub Flavored Markdown support
- Responsive image handling with optimization
- Category and tag organization

### Project Showcase

- Featured projects with thumbnails and descriptions
- Direct links to GitHub repositories
- Project filtering and organization
- Embedded project metadata

### Dynamic Content

- Integration with Spotify API for currently playing tracks
- WakaTime integration for coding activity visualization
- Real-time analytics and performance monitoring
- Server-side rendering with dynamic data

### Performance Optimizations

- Turbopack for fast builds and hot module replacement
- Image optimization with responsive sizing
- CSS and JavaScript code splitting
- Caching strategies for static assets
- Server-side rendering and static generation

### Security

- Content Security Policy headers
- X-Frame-Options protection
- XSS protection headers
- Referrer policy configuration
- HTTPS enforcement

### Accessibility

- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Responsive design for all devices
- Dark mode support with theme switching

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_USERNAME=minhtran241
```

### Analytics

The site includes privacy-focused analytics via Umami and Vercel Analytics. Configure endpoints in the environment as needed.

### API Integration

API routes are configured in `src/app/api/` directory. Services for Spotify and WakaTime integration are located in `src/services/`.

## Build Optimization

The project includes bundle analysis capabilities:

```bash
# Generate bundle analysis
bun run analyze
```

The Next.js configuration includes:

- Turbopack for rapid development builds
- Optimized package imports to reduce bundle size
- Source maps in production for debugging
- Compression and header optimization

## Deployment

The website is optimized for deployment on Vercel but can be deployed to any Node.js hosting platform:

```bash
# Build for production
bun run build

# Test production build locally
bun run start
```

### Hosting Requirements

- Node.js runtime environment
- Support for Next.js 16.0.0
- Environment variable configuration capability
- Optional: CDN for static asset caching

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Author

### Minh Tran

- Website: [https://minhtran.com](https://minhtran.com)
- GitHub: [https://github.com/minhtran241](https://github.com/minhtran241)
- Professional Focus: Software Engineering, Data Engineering, Machine Learning

## Contributing

For bug reports and feature requests, please open an issue on the GitHub repository. The repository is primarily maintained as a personal portfolio but welcomes technical discussions and suggestions.

## Performance

Current performance metrics:

- Next.js 16.0 with Turbopack for optimized builds
- Lighthouse scores optimized for Core Web Vitals
- Real-time monitoring via Vercel Speed Insights
- Responsive image optimization with sharp
- Automatic code splitting and lazy loading

## Version History

- **v4.0.0** - Current version
- See git history for detailed changelog

## Support

For technical questions or feedback regarding the website, please refer to the GitHub issues page or contact through the website's contact methods.

---

**Last Updated**: November 2025
