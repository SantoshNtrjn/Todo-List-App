import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
  title: 'To-Do List App',
  description: 'A sleek and modern to-do list app built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}