import DarkModeToggle from './components/DarkModeToggle';
import KPICard from './components/KPICard';
import BarChart from './components/BarChart';
import TopContributorsList from './components/TopContributorsList';
import CommitBreakdownChart from './components/CommitBreakdownChart';
import { calculateKPIMetrics, formatNumber, getTopContributorsByCommits } from './utils/dataCalculations';
import { Users, GitCommit, Plus, Minus } from 'lucide-react';

export default function App() {
  const kpiMetrics = calculateKPIMetrics();
  const topContributors = getTopContributorsByCommits(10);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="pt-6 pb-8">
          <div className="flex items-center justify-between bg-white/70 dark:bg-slate-800/60 rounded-xl px-6 py-4 shadow-sm backdrop-blur-sm">
            <div>
              <h1 className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl font-semibold">D3.js Contributor Analytics</h1>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">GitHub Repository Statistics (2016–2025)</p>
            </div>
            <DarkModeToggle aria-label="Toggle dark mode" />
          </div>
        </header>

        {/* KPI Row */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <KPICard
              icon={<Users size={24} />}
              value={formatNumber(kpiMetrics.totalContributors)}
              label="Total Contributors"
              iconBgColor="bg-blue-500"
            />
            <KPICard
              icon={<GitCommit size={24} />}
              value={formatNumber(kpiMetrics.totalCommits)}
              label="Total Commits"
              iconBgColor="bg-green-500"
            />
            <KPICard
              icon={<Plus size={24} />}
              value={formatNumber(kpiMetrics.totalAdditions)}
              label="Lines Added"
              iconBgColor="bg-purple-500"
            />
            <KPICard
              icon={<Minus size={24} />}
              value={formatNumber(kpiMetrics.totalDeletions)}
              label="Lines Deleted"
              iconBgColor="bg-red-500"
            />
          </div>
        </section>

        {/* Main Content Area */}
        <main className="space-y-8">
          <BarChart
            data={topContributors}
            title="Contributor Commit Statistics"
            width={800}
            height={400}
          />

          {/* Bottom Row - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopContributorsList contributors={topContributors} />
            <CommitBreakdownChart />
          </div>
        </main>
      </div>
    </div>
  );
}
