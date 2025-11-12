# Minh Tran - Professional Portfolio Website

A comprehensive, high-performance portfolio website showcasing professional experience, technical expertise, published work, and open-source contributions. Built with modern web technologies and optimized for performance and accessibility.

## Overview

This is the source repository for minhtran.com, a professional portfolio and knowledge-sharing platform. The website serves as a central hub to highlight professional background, technical projects, research publications, and technical insights through an active blog.

## Technical Stack

### Core Framework

- [Next.js 16.0.0](https://nextjs.org) - React framework for production-grade applications with server-side rendering and static generation
- [React 19.2.0](https://react.dev) - Modern UI library with latest features and concurrent rendering
- [Tailwind CSS 4.1.11](https://tailwindcss.com) - Utility-first CSS framework for responsive design
- [DaisyUI 5.3.8](https://daisyui.com) - Tailwind CSS component library

### Content & Media

- **Markdown Processing**
  - [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown to React component conversion
  - [remark-gfm](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown support
  - [rehype-raw](https://github.com/rehypejs/rehype-raw) - Raw HTML in markdown
  - [reading-time](https://github.com/ngryman/reading-time) - Article reading time estimation
- **Image Optimization**
  - [next/image](https://nextjs.org/docs/app/api-reference/components/image) - Next.js optimized image component
  - [sharp](https://sharp.pixelplumbing.com) - Image processing and optimization
  - [Plaiceholder](https://plaiceholder.co) - Responsive placeholder generation

### Data & Services

- **API Integration**
  - [Apollo Client](https://www.apollographql.com/docs/react) - GraphQL client for data fetching
  - [SWR](https://swr.vercel.app) - Data fetching with caching and revalidation
  - [Axios](https://axios-http.com) - HTTP client
- **External Services**
  - [Spotify API](https://developer.spotify.com/documentation/web-api) - Music tracking
  - [WakaTime API](https://wakatime.com/api) - Coding activity metrics
  - [Vercel AI](https://sdk.vercel.ai/) - AI-powered agent capabilities

### Monitoring & Analytics

- [Vercel Analytics](https://vercel.com/analytics) - Web analytics
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - Performance monitoring
- [Umami](https://umami.is) - Privacy-focused analytics

### Development Tools

- **Package Manager**: [Bun 1.3.0](https://bun.sh)
- **Node Version**: >=18.18.0 ([Node.js](https://nodejs.org))
- **Build Tool**: [Turbopack](https://turbo.build/pack) - Next.js bundler
- **Code Quality**
  - [ESLint](https://eslint.org) - JavaScript linting
  - [Prettier](https://prettier.io) - Code formatting
  - [Husky](https://typicode.github.io/husky) - Git hooks management
  - [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit linting

### UI & Utilities

- **Data Visualization**
  - [Recharts](https://recharts.org) - React charting library

- **Utilities**
  - [clsx](https://github.com/lukeed/clsx) - Conditional className management
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Tailwind CSS class merging
  - [date-fns](https://date-fns.org) - Date manipulation library
  - [date-fns-tz](https://date-fns.org/docs/Locale) - Timezone support
  - [theme-change](https://github.com/saadeglamr/theme-change) - Dark mode switching
  - [jsdom](https://github.com/jsdom/jsdom) - DOM implementation for server-side rendering

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

- Turbopack for fast builds and HMR
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

```bash
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

## Contributing

For bug reports and feature requests, please open an issue on the GitHub repository. The repository is primarily maintained as a personal portfolio but welcomes technical discussions and suggestions.

## Performance

Current performance metrics:

- Next.js 16.0 with Turbopack for optimized builds
- Lighthouse scores optimized for Core Web Vitals
- Real-time monitoring via Vercel Speed Insights
- Responsive image optimization with sharp
- Automatic code splitting and lazy loading

## Support

For technical questions or feedback regarding the website, please refer to the GitHub issues page or contact through the website's contact methods.
