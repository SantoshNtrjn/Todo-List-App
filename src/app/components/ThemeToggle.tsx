"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-800" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
}
