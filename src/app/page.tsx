"use client";

import { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`p-8 rounded-lg shadow-md w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">To-Do List</h1>
          <ThemeToggle />
        </div>
        <InputField addTask={addTask} />
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}