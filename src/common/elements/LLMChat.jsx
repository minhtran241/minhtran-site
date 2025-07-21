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
				<div className="chat-bubble chat-bubble-primary max-w-xs">
					{message.content}
				</div>
			);
		}

		return (
			<div className="chat-bubble max-w-sm">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={{
						a: ({ href, children }) => (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="link link-primary"
							>
								{children}
							</a>
						),
						img: ({ src, alt }) => (
							<Image
								src={src}
								alt={alt}
								className="rounded-lg max-w-full h-auto"
								loading="lazy"
								width={300}
								height={200}
							/>
						),
						ul: ({ children }) => (
							<ul className="list-disc list-inside space-y-1">
								{children}
							</ul>
						),
						ol: ({ children }) => (
							<ol className="list-decimal list-inside space-y-1">
								{children}
							</ol>
						),
						blockquote: ({ children }) => (
							<blockquote className="border-l-4 border-primary pl-4 italic opacity-80">
								{children}
							</blockquote>
						),
						code: ({ children, className }) => {
							const isInline = !className;
							if (isInline) {
								return (
									<code className="bg-base-300 px-1.5 py-0.5 rounded text-sm font-mono">
										{children}
									</code>
								);
							}
							return (
								<div className="mockup-code text-sm my-2">
									<pre><code>{children}</code></pre>
								</div>
							);
						},
						h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
						h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
						h3: ({ children }) => <h3 className="text-md font-bold my-1">{children}</h3>,
						p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
					}}
				>
					{message.content}
				</ReactMarkdown>
				{isStreaming && (
					<span className="loading loading-dots loading-sm ml-2"></span>
				)}
			</div>
		);
	}, [message.content, isUser, isStreaming]);

	return (
		<div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
			{!isUser && (
				<div className="chat-image avatar">
					<div className="w-10 h-10 rounded-full">
						<Image
							alt="Agent avatar"
							src="/memoji/memojialo.png"
							className="w-full h-full rounded-full object-cover"
							loading="lazy"
							width={40}
							height={40}
						/>
					</div>
				</div>
			)}
			{messageContent}
			<div className="chat-footer opacity-50 text-xs">
				{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</div>
		</div>
	);
};

export default function LLMChat() {
	const [conversation, setConversation] = useState([
		{
			role: 'assistant',
			content: 'Hello! I\'m Minh\'s AI agent. How can I help you today?',
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
			const { messages, newMessage } = await continueConversation(newConversation);

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
			setConversation(prev => [
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
	const handleKeyPress = useCallback((e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}, [sendMessage]);

	const clearChat = useCallback(() => {
		setConversation([
			{
				role: 'assistant',
				content: 'Hello! I\'m Minh\'s AI agent. How can I help you today?',
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
		<div className="fixed bottom-0 right-0 z-[99999]">
			{/* Chat Trigger Button */}
			{!isOpen && (
				<div
					className="m-6 cursor-pointer group"
					onClick={toggleChat}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => e.key === 'Enter' && toggleChat()}
				>
					<div className="tooltip tooltip-left" data-tip="Chat with Minh's AI Agent">
						<div className="avatar online placeholder group-hover:scale-110 transition-transform duration-300">
							<div className="bg-primary text-primary-content w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
								<Image
									loading="lazy"
									width={56}
									height={56}
									src="/memoji/memojialo.png"
									alt="AI Agent"
									className="rounded-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Chat Window */}
			{isOpen && (
				<div className="chat-container bg-base-100 rounded-box shadow-2xl w-96 h-[32rem] flex flex-col m-4">
					{/* Chat Header */}
					<div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-4 rounded-t-box">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-3">
								<div className="avatar online">
									<div className="w-10 h-10 rounded-full">
										<Image
											src="/memoji/memojialo.png"
											alt="AI Agent"
											className="rounded-full object-cover"
											width={40}
											height={40}
										/>
									</div>
								</div>
								<div>
									<h1 className="font-semibold">Minh&apos;s AI Agent</h1>
									<div className="text-xs opacity-90 flex items-center gap-2">
										<div className="inline-grid *:[grid-area:1/1]">
											<div className="status status-success animate-ping"></div>
											<div className="status status-success"></div>
										</div>
										{isStreaming ? (
											<span className="flex items-center gap-1">
												<span className="loading loading-dots loading-xs"></span>
												Typing...
											</span>
										) : (
											'Online • Ready to help'
										)}
									</div>
								</div>
							</div>
							<div className="flex gap-1">
								<div className="tooltip tooltip-bottom" data-tip="Clear chat">
									<button
										onClick={clearChat}
										className="btn btn-sm btn-circle btn-ghost hover:bg-white/20"
									>
										<FontAwesomeIcon icon="fa-solid fa-trash text-sm" />
									</button>
								</div>
								<div className="tooltip tooltip-bottom" data-tip="Close chat">
									<button
										onClick={toggleChat}
										className="btn btn-sm btn-circle btn-ghost hover:bg-white/20"
									>
										<FontAwesomeIcon icon="fa-solid fa-times text-sm" />
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Chat Messages */}
					<div
						className="flex-1 overflow-y-auto p-4 space-y-4"
						ref={chatContainerRef}
					>
						{conversation.map((message, index) => (
							<ChatMessage
								key={`${message.role}-${index}-${message.content.slice(0, 10)}`}
								message={message}
								isUser={message.role === 'user'}
								isStreaming={isStreaming && index === conversation.length - 1 && message.role === 'assistant'}
							/>
						))}
						{error && (
							<div className="alert alert-error">
								<FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" />
								<span>{error}</span>
							</div>
						)}
						{/* Invisible element to scroll to */}
						<div ref={messagesEndRef} />
					</div>

					{/* Input Area */}
					<div className="border-t border-base-300 p-4">
						<form
							className="flex gap-2"
							onSubmit={(e) => {
								e.preventDefault();
								sendMessage();
							}}
						>
							<textarea
								ref={inputRef}
								className="textarea textarea-bordered textarea-primary flex-1 resize-none min-h-[2.5rem] max-h-24"
								placeholder="Ask me anything about Minh..."
								value={input}
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
								rows={1}
								disabled={isLoading}
							/>
							<button
								type="submit"
								className={`btn btn-primary btn-circle ${isLoading ? 'loading' : ''}`}
								disabled={isLoading || !input.trim()}
							>
								{isLoading ? (
									<span className="loading loading-spinner loading-sm"></span>
								) : (
									<FontAwesomeIcon icon="fa-solid fa-paper-plane text-sm" />
								)}
							</button>
						</form>
						<div className="text-xs text-base-content/60 mt-2 text-center">
							Press Enter to send • Shift+Enter for new line
						</div>
					</div>
				</div>
			)}
		</div>
	);
}