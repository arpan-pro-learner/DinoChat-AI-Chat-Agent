import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text, timestamp }) => {
  const isUser = sender === 'user';
  
  const timeString = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 text-white shrink-0 shadow-lg border border-slate-100">
          <span className="text-lg">🦕</span>
        </div>
      )}
      <div className={cn(
        "max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm leading-relaxed",
        isUser 
          ? "bg-dino-medium text-white rounded-tr-none" 
          : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
      )}>
        <p className="whitespace-pre-wrap">{text}</p>
        <p className={cn(
          "text-[10px] mt-1 opacity-70 flex items-center",
          isUser ? "justify-end" : "justify-start"
        )}>
          {timeString}
        </p>
      </div>
    </div>
  );
};
