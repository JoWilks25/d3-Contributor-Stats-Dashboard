import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  // initialize from html class
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  // sync changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark(prev => !prev)}
      className="group relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-700 transition-colors hover:bg-slate-300 dark:hover:bg-slate-600"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {/* Show the target mode icon using dark: utilities */}
      <Moon
        className={`h-5 w-5 text-slate-800 dark:hidden transition-transform group-hover:scale-110`}
      />
      <Sun
        className={`h-5 w-5 hidden dark:block text-slate-100 transition-transform group-hover:scale-110`}
      />
    </button>
  );
}
