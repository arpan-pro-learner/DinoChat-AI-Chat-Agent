import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSendMessage(value.trim());
      setValue('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 border-t border-slate-100 bg-white/80 backdrop-blur-sm"
    >
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          maxLength={4000}
          placeholder="Type your question..."
          className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-dino-medium/50 focus:border-dino-medium transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="absolute right-1.5 p-2 bg-dino-medium text-white rounded-full hover:bg-dino-dark transition-colors disabled:opacity-50 disabled:hover:bg-dino-medium shadow-sm flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};
