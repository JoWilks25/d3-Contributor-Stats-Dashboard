import React, { useEffect, useState } from 'react';

export default function DarkModeToggle(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true;
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') return true;
        if (stored === 'light') return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // sync the HTML root class and storage whenever isDark changes
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <div className="flex items-center space-x-2">
            <span className="text-slate-700 dark:text-slate-300 text-sm">Dark Mode</span>
            <button
                onClick={toggleTheme}
                aria-label={props['aria-label'] || 'Toggle dark mode'}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
}
