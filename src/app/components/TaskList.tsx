"use client";

import { AnimatePresence, motion } from 'framer-motion';
import TaskItem from './TaskItem';
import { useTheme } from '../context/ThemeContext';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

interface TaskListProps {
  tasks: Task[];
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList({ tasks, updateTask, deleteTask }: TaskListProps) {
  const { theme } = useTheme();

  if (tasks.length === 0) {
    return (
      <p
        className={`text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        No tasks yet. Add one to get started!
      </p>
    );
  }

  return (
    <ul className={`space-y-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <AnimatePresence>
        {tasks.map(task => (
          <motion.ul
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
          </motion.ul>
        ))}
      </AnimatePresence>
    </ul>
  );
}