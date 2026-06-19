import React, { useState, useEffect } from 'react';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { RefreshCcw, X, MessageCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize session and history
  useEffect(() => {
    const savedSessionId = localStorage.getItem('dinochat_sessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      fetchHistory(savedSessionId);
    }
  }, []);

  const fetchHistory = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history/${id}`);
      if (!response.ok) throw new Error('Failed to load history');
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const handleSendMessage = async (text: string) => {
    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (!sessionId && data.sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem('dinochat_sessionId', data.sessionId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    localStorage.removeItem('dinochat_sessionId');
    setSessionId(null);
    setMessages([]);
    setError(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div className={cn(
        "flex flex-col h-[500px] w-[90vw] sm:w-[350px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transition-all duration-500 origin-bottom-right",
        // Position adjustments for mobile vs desktop
        "fixed bottom-24 right-4 sm:bottom-28 sm:right-6",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-12 pointer-events-none"
      )}>
        {/* Header */}
        <div className="px-6 py-4 bg-dino-medium flex items-center justify-between text-white shadow-md z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-md border border-white/10">
              🦕
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">DinoChat</h2>
              <p className="text-[10px] opacity-80 uppercase tracking-widest font-medium">Support Agent</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={resetChat}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              title="Reset Conversation"
            >
              <RefreshCcw size={18} className="group-active:rotate-180 transition-transform duration-500" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold underline">Dismiss</button>
          </div>
        )}

        {/* Messages */}
        <MessageList messages={messages} isLoading={isLoading} />

        {/* Input */}
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "mt-4 p-4 rounded-full shadow-2xl transition-all duration-300 transform active:scale-90 flex items-center justify-center relative",
          isOpen ? "bg-white text-dino-medium rotate-90" : "bg-dino-medium text-white hover:bg-dino-dark"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            {messages.length}
          </span>
        )}
      </button>
    </div>
  );
};
