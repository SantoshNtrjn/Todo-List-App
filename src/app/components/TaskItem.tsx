"use client";

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

interface TaskItemProps {
  task: Task;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

export default function TaskItem({ task, updateTask, deleteTask }: TaskItemProps) {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateTask(task.id, { text: editText });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex items-center justify-between p-2 border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            className={`p-1 border rounded ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
            autoFocus
          />
        ) : (
          <span
            onClick={handleStartEditing}
            className={`cursor-pointer ${
              task.completed
                ? theme === 'dark'
                  ? 'line-through text-gray-500'
                  : 'line-through text-gray-400'
                : theme === 'dark'
                ? 'text-white'
                : 'text-black'
            }`}
          >
            {task.text}
          </span>
        )}
      </div>
      <button
        onClick={handleDelete}
        className={`text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors`}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </li>
  );
}