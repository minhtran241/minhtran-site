'use client';

import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { readStreamableValue } from '@ai-sdk/rsc';
import { continueConversation } from '@/app/actions';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

// Memoized ChatMessage component to prevent unnecessary re-renders
const ChatMessage = memo(
  ({ message, isUser, isStreaming = false }) => {
    const messageContent = useMemo(() => {
      if (isUser) {
        return (
          <div className='chat-bubble chat-bubble-primary max-w-xs'>
            {message.content}
          </div>
        );
      }

      return (
        <div className='chat-bubble max-w-sm text-sm'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link link-primary'
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <Image
                  src={src}
                  alt={alt}
                  className='h-auto max-w-full rounded-lg'
                  width={200}
                  height={100}
                />
              ),
              ul: ({ children }) => (
                <ul className='list-inside list-disc space-y-1'>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className='list-inside list-decimal space-y-1'>
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className='border-primary border-l-4 pl-4 italic opacity-80'>
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className='bg-base-300 rounded px-1.5 py-0.5 font-mono text-sm'>
                      {children}
                    </code>
                  );
                }
                return (
                  <div className='mockup-code my-2 text-sm'>
                    <pre>
                      <code>{children}</code>
                    </pre>
                  </div>
                );
              },
              h1: ({ children }) => (
                <h1 className='my-2 text-xl font-bold'>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className='my-2 text-lg font-bold'>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className='text-md my-1 font-bold'>{children}</h3>
              ),
              p: ({ children }) => (
                <p className='my-1 leading-relaxed'>{children}</p>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          {isStreaming && (
            <span className='loading loading-dots loading-sm ml-2'></span>
          )}
        </div>
      );
    }, [message.content, isUser, isStreaming]);

    return (
      <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
        {!isUser && (
          <div className='chat-image avatar'>
            <div className='h-8 w-8 rounded-full'>
              <Image
                alt='Agent avatar'
                src='/memoji/memojialo.png'
                className='h-full w-full rounded-full object-cover'
                width={40}
                height={40}
                priority
              />
            </div>
          </div>
        )}
        {messageContent}
        <div className='chat-footer text-xs opacity-50'>
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for memo optimization
    return (
      prevProps.message.content === nextProps.message.content &&
      prevProps.isUser === nextProps.isUser &&
      prevProps.isStreaming === nextProps.isStreaming
    );
  },
);

export default function LLMChat() {
  const INITIAL_MESSAGE = useMemo(
    () => [
      {
        role: 'assistant',
        content: "Hello! I'm Minh's AI agent. How can I help you today?",
      },
    ],
    [],
  );

  const [conversation, setConversation] = useState(INITIAL_MESSAGE);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll to bottom when conversation updates or streaming changes
  useEffect(() => {
    scrollToBottom();
  }, [conversation, isStreaming, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    setError(null);
  }, []);

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, toggleChat]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newConversation = [...conversation, userMessage];

    setConversation(newConversation);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);

    try {
      const { messages, newMessage } =
        await continueConversation(newConversation);

      let textContent = '';
      for await (const delta of readStreamableValue(newMessage)) {
        // console.error('Received delta:', delta);
        textContent += delta;
        // console.error('Text content:', textContent);
        setConversation([
          ...messages,
          { role: 'assistant', content: textContent },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Sorry, I encountered an error. Please try again.');
      setConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [input, conversation, isLoading]);

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  const clearChat = useCallback(() => {
    setConversation(INITIAL_MESSAGE);
    setError(null);
  }, [INITIAL_MESSAGE]);

  // Auto-resize textarea
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
  }, []);

  return (
    <div className='fixed right-0 bottom-0 z-50'>
      {/* Chat Trigger Button */}
      {!isOpen && (
        <button
          className='group focus-visible:ring-primary m-4 cursor-pointer rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:m-6'
          onClick={toggleChat}
          aria-label="Open chat with Minh's AI Agent"
          title="Chat with Minh's AI Agent"
        >
          <div className='relative'>
            <div className='avatar online placeholder'>
              <div className='bg-primary text-primary-content ring-primary ring-offset-base-100 h-14 w-14 rounded-full shadow-lg ring-2 ring-offset-2 transition-shadow duration-300 group-hover:shadow-xl sm:h-16 sm:w-16'>
                <Image
                  width={64}
                  height={64}
                  src='/memoji/memojialo.png'
                  alt='AI Agent'
                  className='rounded-full object-cover'
                  priority
                />
              </div>
            </div>
            {/* Pulse animation indicator */}
            <span className='absolute top-0 right-0 flex h-3 w-3'>
              <span className='bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
              <span className='bg-primary relative inline-flex h-3 w-3 rounded-full'></span>
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className='chat-container bg-base-100 rounded-box border-base-300 animate-in slide-in-from-bottom-4 m-2 flex h-[calc(100vh-5rem)] max-h-[600px] w-[calc(100vw-1rem)] flex-col border shadow-2xl transition-all duration-300 sm:m-4 sm:h-128 sm:w-96'
          role='dialog'
          aria-label='Chat with AI Agent'
          aria-modal='true'
        >
          {/* Chat Header */}
          <div className='from-primary to-secondary text-primary-content rounded-t-box shrink-0 bg-linear-to-r p-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='avatar online'>
                  <div className='h-8 w-8 rounded-full'>
                    <Image
                      src='/memoji/memojialo.png'
                      alt='AI Agent'
                      className='rounded-full object-cover'
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div>
                  <h1 className='text-base-content font-semibold'>
                    Minh&apos;s AI Agent
                  </h1>
                  <div className='text-base-content/70 flex items-center gap-2 text-xs'>
                    <div className='inline-grid *:[grid-area:1/1]'>
                      <div className='status status-success animate-ping'></div>
                      <div className='status status-success'></div>
                    </div>
                    {isStreaming ? (
                      <span className='flex items-center gap-1'>
                        <span className='loading loading-dots loading-xs'></span>
                        Typing...
                      </span>
                    ) : (
                      'Online • Ready to help'
                    )}
                  </div>
                </div>
              </div>
              <div className='text-base-content/70 flex gap-1'>
                <div className='tooltip tooltip-bottom' data-tip='Clear chat'>
                  <button
                    onClick={clearChat}
                    className='btn btn-sm btn-circle btn-ghost hover:bg-base-200 focus-visible:ring-primary transition-transform hover:scale-110 focus-visible:ring-2 active:scale-95'
                    aria-label='Clear chat history'
                    disabled={isLoading}
                  >
                    <FontAwesomeIcon
                      icon='fa-solid fa-trash text-sm'
                      aria-hidden='true'
                    />
                  </button>
                </div>
                <div className='tooltip tooltip-left' data-tip='Close chat'>
                  <button
                    onClick={toggleChat}
                    className='btn btn-sm btn-circle btn-ghost hover:bg-base-200 focus-visible:ring-primary transition-transform hover:scale-110 focus-visible:ring-2 active:scale-95'
                    aria-label='Close chat'
                  >
                    <FontAwesomeIcon
                      icon='fa-solid fa-times text-sm'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className='scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-4'
            ref={chatContainerRef}
            role='log'
            aria-live='polite'
            aria-atomic='false'
          >
            {conversation.map((message, index) => (
              <ChatMessage
                key={`${message.role}-${index}-${message.content.slice(0, 10)}`}
                message={message}
                isUser={message.role === 'user'}
                isStreaming={
                  isStreaming &&
                  index === conversation.length - 1 &&
                  message.role === 'assistant'
                }
              />
            ))}
            {error && (
              <div
                className='alert alert-error animate-in fade-in slide-in-from-top-2 shadow-lg'
                role='alert'
                aria-live='assertive'
              >
                <FontAwesomeIcon
                  icon='fa-solid fa-exclamation-triangle'
                  aria-hidden='true'
                />
                <span>{error}</span>
                <button
                  className='btn btn-sm btn-circle btn-ghost focus-visible:ring-error transition-transform hover:scale-110 focus-visible:ring-2 active:scale-95'
                  onClick={() => setError(null)}
                  aria-label='Dismiss error message'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-times'
                    aria-hidden='true'
                  />
                </button>
              </div>
            )}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='border-base-300 bg-base-100 shrink-0 border-t p-3 sm:p-4'>
            <form
              className='flex gap-2'
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <textarea
                ref={inputRef}
                className='textarea textarea-bordered textarea-primary focus:textarea-primary max-h-24 min-h-10 flex-1 resize-none text-sm transition-colors focus:outline-none sm:text-base'
                placeholder='Ask me anything about Minh...'
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
                disabled={isLoading}
                aria-label='Message input'
                maxLength={1000}
              />
              <button
                type='submit'
                className={`btn btn-primary btn-circle focus-visible:ring-primary h-12 min-h-12 w-12 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 ${isLoading ? 'loading' : 'hover:scale-105 active:scale-95'}`}
                disabled={isLoading || !input.trim()}
                aria-label='Send message'
                title={isLoading ? 'Sending...' : 'Send message'}
              >
                {isLoading ? (
                  <span
                    className='loading loading-spinner loading-sm'
                    aria-hidden='true'
                  ></span>
                ) : (
                  <FontAwesomeIcon
                    icon='fa-solid fa-paper-plane text-sm'
                    aria-hidden='true'
                  />
                )}
              </button>
            </form>
            <div className='text-base-content/60 mt-2 hidden text-center text-xs sm:block'>
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
