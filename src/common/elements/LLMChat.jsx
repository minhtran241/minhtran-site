'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { readStreamableValue } from 'ai/rsc';
import { continueConversation } from '@/app/actions';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

// Memoized ChatMessage component to prevent unnecessary re-renders
const ChatMessage = ({ message, isUser, isStreaming = false }) => {
  const messageContent = useMemo(() => {
    if (isUser) {
      return (
        <div className='chat-bubble chat-bubble-primary max-w-xs'>
          {message.content}
        </div>
      );
    }

    return (
      <div className='chat-bubble max-w-sm'>
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
                loading='lazy'
                width={300}
                height={200}
              />
            ),
            ul: ({ children }) => (
              <ul className='list-inside list-disc space-y-1'>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className='list-inside list-decimal space-y-1'>{children}</ol>
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
          <div className='h-10 w-10 rounded-full'>
            <Image
              alt='Agent avatar'
              src='/memoji/memojialo.png'
              className='h-full w-full rounded-full object-cover'
              loading='lazy'
              width={40}
              height={40}
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
};

export default function LLMChat() {
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm Minh's AI agent. How can I help you today?",
    },
  ]);
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
    setConversation([
      {
        role: 'assistant',
        content: "Hello! I'm Minh's AI agent. How can I help you today?",
      },
    ]);
    setError(null);
  }, []);

  // Auto-resize textarea
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
  }, []);

  return (
    <div className='fixed right-0 bottom-0 z-[99999]'>
      {/* Chat Trigger Button */}
      {!isOpen && (
        <div
          className='group m-6 cursor-pointer'
          onClick={toggleChat}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleChat()}
        >
          <div
            className='tooltip tooltip-left'
            data-tip="Chat with Minh's AI Agent"
          >
            <div className='avatar online placeholder transition-transform duration-300 group-hover:scale-110'>
              <div className='bg-primary text-primary-content ring-primary ring-offset-base-100 h-14 w-14 rounded-full shadow-lg ring ring-offset-2'>
                <Image
                  loading='lazy'
                  width={56}
                  height={56}
                  src='/memoji/memojialo.png'
                  alt='AI Agent'
                  className='rounded-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className='chat-container bg-base-100 rounded-box m-4 flex h-[32rem] w-96 flex-col shadow-2xl'>
          {/* Chat Header */}
          <div className='from-primary to-secondary text-primary-content rounded-t-box bg-gradient-to-r p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='avatar online'>
                  <div className='h-10 w-10 rounded-full'>
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
                  <h1 className='font-semibold'>Minh&apos;s AI Agent</h1>
                  <div className='flex items-center gap-2 text-xs opacity-90'>
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
              <div className='flex gap-1'>
                <div className='tooltip tooltip-bottom' data-tip='Clear chat'>
                  <button
                    onClick={clearChat}
                    className='btn btn-sm btn-circle btn-ghost hover:bg-white/20'
                  >
                    <FontAwesomeIcon icon='fa-solid fa-trash text-sm' />
                  </button>
                </div>
                <div className='tooltip tooltip-bottom' data-tip='Close chat'>
                  <button
                    onClick={toggleChat}
                    className='btn btn-sm btn-circle btn-ghost hover:bg-white/20'
                  >
                    <FontAwesomeIcon icon='fa-solid fa-times text-sm' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className='flex-1 space-y-4 overflow-y-auto p-4'
            ref={chatContainerRef}
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
              <div className='alert alert-error'>
                <FontAwesomeIcon icon='fa-solid fa-exclamation-triangle' />
                <span>{error}</span>
              </div>
            )}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='border-base-300 border-t p-4'>
            <form
              className='flex gap-2'
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <textarea
                ref={inputRef}
                className='textarea textarea-bordered textarea-primary max-h-24 min-h-[2.5rem] flex-1 resize-none'
                placeholder='Ask me anything about Minh...'
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
                disabled={isLoading}
              />
              <button
                type='submit'
                className={`btn btn-primary btn-circle ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <span className='loading loading-spinner loading-sm'></span>
                ) : (
                  <FontAwesomeIcon icon='fa-solid fa-paper-plane text-sm' />
                )}
              </button>
            </form>
            <div className='text-base-content/60 mt-2 text-center text-xs'>
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
