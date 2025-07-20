'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { readStreamableValue } from 'ai/rsc';
import { continueConversation } from '@/app/actions';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Memoized ChatMessage component to prevent unnecessary re-renders
const ChatMessage = ({ message, isUser, isStreaming = false }) => {
	const messageContent = useMemo(() => {
		if (isUser) {
			return <div className="chat-bubble chat-bubble-primary">{message.content}</div>;
		}

		return (
			<div className="chat-bubble">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={{
						a: ({ href, children }) => (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-400 underline hover:text-blue-500 transition-colors"
							>
								{children}
							</a>
						),
						img: ({ src, alt }) => (
							<img
								src={src}
								alt={alt}
								className="rounded-lg max-w-full h-auto"
								loading="lazy"
							/>
						),
						ul: ({ children }) => (
							<ul className="list-disc list-inside mb-2 space-y-1">
								{children}
							</ul>
						),
						ol: ({ children }) => (
							<ol className="list-decimal list-inside mb-2 space-y-1">
								{children}
							</ol>
						),
						li: ({ children }) => (
							<li className="mb-1">{children}</li>
						),
						blockquote: ({ children }) => (
							<blockquote className="border-l-4 border-primary/30 pl-3 italic mb-2 bg-base-200/50 py-2 rounded-r-lg">
								{children}
							</blockquote>
						),
						code: ({ children, className }) => {
							const isInline = !className;
							if (isInline) {
								return (
									<code className="bg-base-200 px-1 py-0.5 rounded text-sm font-mono">
										{children}
									</code>
								);
							}
							return (
								<pre className="bg-base-200 p-3 rounded-lg overflow-x-auto mb-2">
									<code className="text-sm font-mono">{children}</code>
								</pre>
							);
						},
						h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
						h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
						h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
						p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
					}}
				>
					{message.content}
				</ReactMarkdown>
				{isStreaming && (
					<div className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 rounded-sm"></div>
				)}
			</div>
		);
	}, [message.content, isUser, isStreaming]);

	return (
		<div className={`chat ${isUser ? 'chat-end' : 'chat-start'} animate-fade-in`}>
			{!isUser && (
				<div className="chat-image avatar">
					<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
						<img
							alt="Assistant avatar"
							src="/memoji/memojialo.png"
							className="w-full h-full rounded-full object-cover"
							loading="lazy"
						/>
					</div>
				</div>
			)}
			{messageContent}
			<div className="chat-footer opacity-50 text-xs mt-1">
				{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</div>
		</div>
	);
};

export default function LLMChat() {
	const [conversation, setConversation] = useState([
		{
			role: 'assistant',
			content: 'Hello! I\'m Minh\'s virtual assistant. How can I help you today?',
		},
	]);
	const [input, setInput] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isStreaming, setIsStreaming] = useState(false);

	const chatContainerRef = useRef(null);
	const inputRef = useRef(null);

	// Auto-scroll to bottom when conversation updates
	useEffect(() => {
		if (chatContainerRef.current) {
			const container = chatContainerRef.current;
			const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

			if (isNearBottom) {
				container.scrollTo({
					top: container.scrollHeight,
					behavior: 'smooth'
				});
			}
		}
	}, [conversation]);

	// Focus input when chat opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
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
				content: 'Hello! I\'m Minh\'s virtual assistant. How can I help you today?',
			},
		]);
		setError(null);
	}, []);

	return (
		<>
			{/* Custom styles for animations */}
			<style jsx>{`
				@keyframes fade-in {
					from { opacity: 0; transform: translateY(10px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-fade-in {
					animation: fade-in 0.3s ease-out;
				}
				.chat-container {
					backdrop-filter: blur(10px);
					border: 1px solid hsl(var(--b3) / 0.2);
				}
				.bounce-in {
					animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
				}
				@keyframes bounce {
					0% { transform: scale(0); }
					50% { transform: scale(1.1); }
					100% { transform: scale(1); }
				}
			`}</style>

			<div className="fixed bottom-0 right-0 z-[99999]">
				{/* Chat Trigger Button */}
				{!isOpen && (
					<div
						className="m-8 cursor-pointer tooltip tooltip-left tooltip-primary group hover:scale-110 transition-transform duration-200"
						onClick={toggleChat}
						aria-label="Open chat"
						data-tip="Minh's Virtual Assistant"
					>
						<div className="avatar avatar-online bounce-in">
							<div className="ring-primary ring-offset-base-100 w-[52px] h-[52px] rounded-full ring-2 ring-offset-2 group-hover:ring-4 transition-all duration-200 shadow-lg">
								<img
									src="/memoji/memojialo.png"
									alt="virtual assistant"
									className="rounded-full object-cover"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Chat Window */}
				{isOpen && (
					<div className="chat-container bg-base-100 rounded-box shadow-2xl w-[24rem] h-[32rem] flex flex-col m-4 animate-fade-in">
						{/* Chat Header */}
						<div className="h-[4rem] bg-primary flex justify-between items-center px-4 rounded-t-box">
							<div className="flex items-center gap-3 text-sm">
								<div className="avatar avatar-online">
									<div className="w-10 h-10 rounded-full">
										<img
											src="/memoji/memojialo.png"
											alt="virtual assistant"
											className="rounded-full object-cover"
										/>
									</div>
								</div>
								<div className="flex flex-col">
									<h1 className="text-primary-content font-semibold">
										Minh&apos;s Virtual Assistant
									</h1>
									<p className="text-xs text-primary-content/80">
										{isStreaming ? 'Typing...' : 'Online • Replies in real-time'}
									</p>
								</div>
							</div>
							<div className="flex gap-2">
								<button
									onClick={clearChat}
									className="btn btn-sm btn-circle btn-ghost hover:bg-primary-content/20"
									aria-label="Clear chat"
									title="Clear conversation"
								>
									<FontAwesomeIcon icon="fa-solid fa-trash text-primary-content text-sm" />
								</button>
								<button
									onClick={toggleChat}
									className="btn btn-sm btn-circle btn-ghost hover:bg-primary-content/20"
									aria-label="Minimize chat"
								>
									<FontAwesomeIcon icon="fa-solid fa-minus text-primary-content" />
								</button>
							</div>
						</div>

						{/* Chat Messages */}
						<div
							className="flex-1 overflow-y-auto p-3 space-y-3 scroll-smooth"
							ref={chatContainerRef}
						>
							{conversation.map((message, index) => (
								<ChatMessage
									key={`${message.role}-${index}`}
									message={message}
									isUser={message.role === 'user'}
									isStreaming={isStreaming && index === conversation.length - 1 && message.role === 'assistant'}
								/>
							))}
							{error && (
								<div className="alert alert-error text-sm">
									<FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" />
									<span>{error}</span>
								</div>
							)}
						</div>

						{/* Input Area */}
						<div className="p-3 border-t border-base-300">
							<form
								className="flex items-end gap-2"
								onSubmit={(e) => {
									e.preventDefault();
									sendMessage();
								}}
							>
								<div className="flex-1">
									<textarea
										ref={inputRef}
										className="textarea textarea-primary w-full text-sm resize-none min-h-[2.5rem] max-h-24"
										placeholder="Ask me anything about Minh..."
										value={input}
										onChange={(e) => setInput(e.target.value)}
										onKeyDown={handleKeyPress}
										rows={1}
										style={{
											height: `auto ${Math.min(Math.max(40, input.split('\n').length * 24), 96)}px`
										}}
										disabled={isLoading}
									/>
								</div>
								<button
									type="submit"
									className={`btn btn-circle btn-primary ${isLoading ? 'loading' : ''
										} ${!input.trim() ? 'btn-disabled' : ''}`}
									disabled={isLoading || !input.trim()}
									aria-label="Send message"
								>
									{isLoading ? (
										<span className="loading loading-spinner loading-sm"></span>
									) : (
										<FontAwesomeIcon icon="fa-solid fa-paper-plane text-primary-content text-sm" />
									)}
								</button>
							</form>
							<div className="text-xs text-base-content/60 mt-1 text-center">
								Press Enter to send • Shift+Enter for new line
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}