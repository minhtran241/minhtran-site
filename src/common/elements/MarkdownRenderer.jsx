'use client';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Suspense } from 'react';

// Updated import paths - use /dist/esm/ instead of /dist/cjs/
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';

import Loading from '@/app/loading';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

// Register languages
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('yaml', yaml); // Register both yml and yaml
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('c', c);

// Define prose styles as a constant for better maintainability
const proseStyles = [
  // Base prose configuration
  'prose prose-base max-w-none',

  // Typography and spacing
  'prose-headings:text-primary prose-headings:my-4',
  'prose-p:my-4',
  'prose-ul:my-2 prose-li:my-0',
  'prose-hr:text-gray',
  'marker:text-primary',

  // pre background removed to avoid conflicts with syntax highlighting
  'prose-pre:bg-transparent',
  // 'prose-pre:text-base prose-pre:font-m
  // 'md:prose-pre:text-base lg:prose-pre:text-base sm:prose-pre:text-sm',

  // Images and figures
  'prose-img:mx-auto prose-img:mb-2 prose-img:rounded-box',
  'prose-figcaption:text-center prose-figcaption:my-2 prose-figcaption:text-gray-500',

  // Blockquotes
  'prose-blockquote:my-4 prose-blockquote:p-4 prose-blockquote:bg-base-300 prose-blockquote:rounded-box',

  // Inline code
  'prose-code:rounded-box',

  // Layout
  'items-center justify-center',
].join(' ');

const MarkdownRender = ({ mdString }) => (
  <Suspense fallback={<Loading />}>
    <article className={proseStyles}>
      <Markdown
        rehypePlugins={[rehypeRaw]}
        // linkTarget="_blank"
        components={{
          pre: (pre) => {
            // const codeChunk =
            // 	pre.node.children[0].children[0].value;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            // const [copyTip, setCopyTip] = useState('Copy code');

            const language = pre.children?.props?.className?.replace(
              /language-/g,
              '',
            );

            return (
              <div className='relative'>
                <span
                  style={{
                    bottom: 0,
                    right: 0,
                  }}
                  className='absolute z-40 mr-7 mb-7 rounded bg-gray-300/40 p-1 text-xs text-white uppercase backdrop-blur-sm'
                >
                  {language}
                </span>
                {/* Pre element */}
                <pre {...pre.props}>{pre.children}</pre>
              </div>
            );
          },
          code({ inline, className, ...props }) {
            const hasLang = /language-(\w+)/.exec(className || '');
            return !inline && hasLang ? (
              <SyntaxHighlighter
                style={oneDark}
                language={hasLang[1]}
                // PreTag="div"
                className='mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded'
                // showLineNumbers={true}
                useInlineStyles={true}
                components={{}}
              >
                {String(props.children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props} />
            );
          },
          image: (props) => <Image {...props} alt={props.alt} loading='lazy' />,
          a: (props) => {
            return (
              <Link
                href={props.href}
                target='_blank'
                className='text-primary no-underline hover:underline'
              >
                {props.children}
              </Link>
            );
          },
        }}
      >
        {mdString}
      </Markdown>
    </article>
  </Suspense>
);

export default MarkdownRender;
