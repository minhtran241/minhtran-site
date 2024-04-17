'use client';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    oneDark,
    oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from 'lucide-react';
import { Suspense, useState } from 'react';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import lua from 'react-syntax-highlighter/dist/cjs/languages/prism/lua';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import Loading from '@/app/loading';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('lua', lua);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('yml', yaml);

export default function MarkdownRender({ mdString }) {
    const { theme } = useTheme();

    return (
        <Suspense fallback={<Loading />}>
            <article className="prose prose-base dark:prose-invert prose-pre:not-prose text-black dark:text-white prose-headings:text-[#0033A0] dark:prose-headings:text-blue-600 prose-headings:my-4 prose-ul:my-2 prose-p:my-4 prose-strong:text-black dark:prose-strong:text-white prose-li:my-0 prose-hr:text-gray marker:text-[#0033A0] dark:marker:text-blue-600 items-center justify-center !max-w-full md:prose-pre:text-base lg:prose-pre:text-base sm:prose-pre:text-sm prose-img:mx-auto prose-figcaption:text-center prose-figcaption:my-2 prose-img:mb-2 prose-img:rounded-md prose-figcaption:text-gray-600 dark:prose-figcaption:text-gray-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:my-4 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:bg-gray-200 dark:prose-blockquote:bg-gray-900 prose-blockquote:rounded-lg prose-blockquote:shadow-lg prose-blockquote:border prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700 prose-blockquote:transition prose-blockquote:duration-300 prose-blockquote:ease-in-out prose-blockquote:dark:shadow-lg prose-blockquote:dark:border-gray-700 prose-blockquote:dark:bg-gray-900 prose-blockquote:dark:text-gray-400 dark:prose-code:bg-gray-900 prose-code:rounded-lg prose-code:border prose-code:border-gray-200 dark:prose-code:border-gray-700">
                <Markdown
                    rehypePlugins={[rehypeRaw]}
                    linkTarget="_blank"
                    components={{
                        pre: (pre) => {
                            const codeChunk =
                                pre.node.children[0].children[0].value;

                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const [copyTip, setCopyTip] = useState('Copy code');

                            const language =
                                pre.children[0]?.props.className.replace(
                                    /language-/g,
                                    ''
                                );

                            return (
                                <div className="relative overflow-x-hidden">
                                    <button
                                        style={{
                                            right: 0,
                                        }}
                                        className="tooltip tooltip-left absolute z-40 mr-2 mt-5"
                                        data-tip={copyTip}
                                    >
                                        <CopyToClipboard
                                            text={codeChunk}
                                            onCopy={async () => {
                                                setCopyTip('Copied');
                                                // reset the tooltip after 2 seconds
                                                setTimeout(() => {
                                                    setCopyTip('Copy code');
                                                }, 2000);
                                                toast(
                                                    'Code copied to clipboard!'
                                                );
                                            }}
                                        >
                                            <Copy className="h-5 w-5 cursor-pointer text-gray-400 hover:text-[#0033A0] dark:hover:text-blue-600 dark:text-base-300" />
                                        </CopyToClipboard>
                                    </button>
                                    <span
                                        style={{
                                            bottom: 0,
                                            right: 0,
                                        }}
                                        className="absolute z-40 mb-5 mr-1 rounded-lg bg-base-content/40 p-1 text-xs uppercase text-base-300 backdrop-blur-sm"
                                    >
                                        {language}
                                    </span>
                                    <pre {...pre}></pre>
                                </div>
                            );
                        },
                        code({ inline, className, ...props }) {
                            const hasLang = /language-(\w+)/.exec(
                                className || ''
                            );
                            return !inline && hasLang ? (
                                <SyntaxHighlighter
                                    style={
                                        theme === 'dark' ? oneDark : oneLight
                                    }
                                    language={hasLang[1]}
                                    PreTag="div"
                                    className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
                                    showLineNumbers={true}
                                    useInlineStyles={true}
                                    components={{}}
                                >
                                    {String(props.children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props} />
                            );
                        },
                        image: (props) => {
                            return <Image {...props} alt={props.alt} />;
                        },
                        a: (props) => {
                            return (
                                <Link
                                    href={props.href}
                                    target="_blank"
                                    className="hover:underline text-[#0033A0] dark:text-blue-600 no-underline hover:text-blue-800 dark:hover:text-blue-500"
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
}
