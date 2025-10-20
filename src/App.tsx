import DarkModeToggle from './components/DarkModeToggle';
export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 px-4 sm:px-6 lg:px-8">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-between bg-white/70 dark:bg-slate-800/60 rounded-xl py-4 shadow-sm">
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl font-semibold">D3.js Contributor Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">GitHub Repository Statistics (2016–2025)</p>
          </div>
          <DarkModeToggle aria-label="Toggle dark mode" />
        </div>
      </header>
    </div>
  );
}
