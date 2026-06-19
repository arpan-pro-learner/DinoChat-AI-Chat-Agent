import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2 opacity-60">
          <span className="text-4xl">🦖</span>
          <p className="text-sm">Roar! How can I help you today?</p>
        </div>
      )}
      
      {messages.map((msg) => (
        <MessageBubble key={msg.id} {...msg} />
      ))}
      
      {isLoading && (
        <div className="flex justify-start mb-4 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 text-white shrink-0">
            🦕
          </div>
          <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-none">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={scrollRef} />
    </div>
  );
};
