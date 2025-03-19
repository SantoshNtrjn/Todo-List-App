"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';

interface InputFieldProps {
  addTask: (text: string) => void;
}

export default function InputField({ addTask }: InputFieldProps) {
  const { theme } = useTheme();
  const [input, setInput] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };
  
  if (!isMounted) {
    return <div className="flex mb-4 h-10" />; 
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        className={`flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-black placeholder-gray-500'
        }`}
      />
      <button
        type="submit"
        className={`p-2 rounded-r-md ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        <ChevronDoubleDownIcon className="h-5 w-5"/>
      </button>
    </form>
  );
}