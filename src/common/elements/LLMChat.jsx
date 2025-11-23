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
  ({ message, isUser, isStreaming = false, onCopy }) => {
    const messageContent = useMemo(() => {
      if (isUser) {
        return (
          <div className='chat-bubble chat-bubble-primary max-w-sm text-sm wrap-break-word'>
            {message.content}
          </div>
        );
      }

      return (
        <div className='chat-bubble bg-base-200 text-base-content group/message relative max-w-sm text-sm wrap-break-word'>
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
            <div className='text-base-content/50 mt-2 flex items-center gap-2'>
              <span className='loading loading-dots loading-sm'></span>
              <span className='text-xs'>typing...</span>
            </div>
          )}
          {!isStreaming && (
            <button
              onClick={() => onCopy(message.content)}
              className='btn btn-xs btn-circle btn-ghost bg-base-100 border-base-300 absolute -top-1 -right-1 border opacity-0 transition-opacity group-hover/message:opacity-100'
              aria-label='Copy message'
              title='Copy to clipboard'
            >
              <FontAwesomeIcon icon='fa-solid fa-copy' className='text-xs' />
            </button>
          )}
        </div>
      );
    }, [message.content, isUser, isStreaming, onCopy]);

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
      prevProps.isStreaming === nextProps.isStreaming &&
      prevProps.onCopy === nextProps.onCopy
    );
  },
);

// Suggested prompts for quick start
const SUGGESTED_PROMPTS = [
  "Tell me about Minh's experience",
  "What are Minh's technical skills?",
  'Show me recent projects',
  'How can I contact Minh?',
];

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

  // Copy message to clipboard
  const handleCopyMessage = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Toast notification will be added via context
      })
      .catch(() => {
        // Silent failure - could add error toast in future
      });
  }, []);

  // Retry last message on error
  const retryLastMessage = useCallback(() => {
    if (conversation.length > 1) {
      const lastUserMessage = [...conversation]
        .reverse()
        .find((msg) => msg.role === 'user');
      if (lastUserMessage) {
        setInput(lastUserMessage.content);
        setError(null);
      }
    }
  }, [conversation]);

  // Send suggested prompt
  const sendSuggestedPrompt = useCallback(
    async (prompt) => {
      setInput(prompt);
      // Need to manually trigger send since input state won't update in time
      const userMessage = { role: 'user', content: prompt };
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
          textContent += delta;
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
    },
    [conversation],
  );

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
              <span className='bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
              <span className='bg-success relative inline-flex h-3 w-3 rounded-full'></span>
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className='chat-container bg-base-100 rounded-box border-base-300 animate-in slide-in-from-bottom-4 m-2 flex h-[calc(100vh-3rem)] max-h-[500px] w-[calc(100vw-1rem)] flex-col border shadow-xl transition-all duration-300 sm:m-4 sm:h-[450px] sm:w-[360px]'
          role='dialog'
          aria-label='Chat with AI Agent'
          aria-modal='true'
        >
          {/* Chat Header */}
          <div className='bg-primary rounded-t-box shrink-0 p-2.5 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='avatar'>
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
                  <h1 className='text-primary-content text-sm font-semibold'>
                    Minh&apos;s AI Agent
                  </h1>
                  <div className='text-primary-content/70 flex items-center gap-1.5 text-xs'>
                    <div className='bg-success h-2 w-2 animate-pulse rounded-full'></div>
                    {isStreaming ? (
                      <span className='flex items-center gap-1'>
                        <span className='loading loading-dots loading-xs'></span>
                        Typing...
                      </span>
                    ) : (
                      <span>Online</span>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex gap-1'>
                <button
                  onClick={clearChat}
                  className='text-primary-content btn btn-xs btn-circle btn-ghost hover:bg-base-200/20'
                  aria-label='Clear chat history'
                  disabled={isLoading}
                  title='Clear chat'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-sm fa-trash'
                    aria-hidden='true'
                  />
                </button>
                <button
                  onClick={toggleChat}
                  className='text-primary-content btn btn-xs btn-circle btn-ghost hover:bg-base-200/20'
                  aria-label='Close chat'
                  title='Close chat'
                >
                  <FontAwesomeIcon
                    icon='fa-solid fa-sm fa-times'
                    aria-hidden='true'
                  />
                </button>
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
                onCopy={handleCopyMessage}
              />
            ))}
            {/* Show typing indicator when loading but no streamed content yet */}
            {isLoading &&
              conversation.length > 1 &&
              conversation[conversation.length - 1].role === 'user' && (
                <div className='chat chat-start'>
                  <div className='chat-image avatar'>
                    <div className='h-8 w-8 rounded-full'>
                      <Image
                        alt='Agent avatar'
                        src='/memoji/memojialo.png'
                        className='h-full w-full rounded-full object-cover'
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <div className='chat-bubble bg-base-200 text-base-content flex items-center gap-2'>
                    <span className='loading loading-dots loading-sm'></span>
                    <span className='text-base-content/60 text-xs'>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
            {error && (
              <div
                className='bg-error/10 border-error/20 animate-in fade-in slide-in-from-top-2 rounded-lg border p-2'
                role='alert'
                aria-live='assertive'
              >
                <div className='flex items-start gap-2'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-exclamation-circle'
                    className='text-error mt-0.5 shrink-0 text-sm'
                    aria-hidden='true'
                  />
                  <span className='text-error flex-1 text-sm font-medium'>
                    {error}
                  </span>
                  <div className='flex shrink-0 gap-1'>
                    <button
                      className='btn btn-xs btn-ghost text-error hover:bg-error/20'
                      onClick={retryLastMessage}
                      aria-label='Retry last message'
                    >
                      <FontAwesomeIcon
                        icon='fa-solid fa-rotate-right'
                        className='text-xs'
                      />
                    </button>
                    <button
                      className='btn btn-xs btn-circle btn-ghost text-error hover:bg-error/20'
                      onClick={() => setError(null)}
                      aria-label='Dismiss error message'
                    >
                      <FontAwesomeIcon
                        icon='fa-solid fa-times'
                        className='text-xs'
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='border-base-300 bg-base-100 shrink-0 border-t p-2.5'>
            {/* Suggested prompts - show when conversation is empty */}
            {conversation.length === 1 && (
              <div className='mb-2'>
                <div className='flex flex-wrap gap-1.5'>
                  {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => sendSuggestedPrompt(prompt)}
                      className='btn btn-xs btn-ghost bg-base-200 hover:bg-primary hover:text-primary-content border-0 font-normal normal-case'
                      disabled={isLoading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <form
              className='flex gap-2'
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <div className='relative flex-1'>
                <textarea
                  ref={inputRef}
                  className='textarea textarea-bordered textarea-primary focus:textarea-primary max-h-20 min-h-9 w-full resize-none text-sm focus:outline-none'
                  placeholder='Ask me anything about Minh...'
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  rows={1}
                  disabled={isLoading}
                  aria-label='Message input'
                  maxLength={1000}
                />
                {input.length > 800 && (
                  <div
                    className={`absolute right-2 bottom-2 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                      input.length > 950
                        ? 'text-error bg-error/10'
                        : 'text-base-content/40 bg-base-200'
                    }`}
                  >
                    {input.length}/1000
                  </div>
                )}
              </div>
              <button
                type='submit'
                className={`btn btn-primary btn-circle focus-visible:ring-primary h-10 min-h-10 w-10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 ${isLoading ? 'loading' : 'hover:scale-105 active:scale-95'}`}
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
            <div className='text-base-content/50 mt-1.5 text-[10px]'>
              <span className='hidden sm:inline'>
                <kbd className='kbd kbd-xs'>Enter</kbd> send •{' '}
                <kbd className='kbd kbd-xs'>Shift + Enter</kbd> new line
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
