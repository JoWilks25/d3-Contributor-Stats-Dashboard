import { formatNumber } from '../utils/dataCalculations';

interface Contributor {
    username: string;
    commits: number;
}

interface TopContributorsListProps {
    contributors: Contributor[];
    title?: string;
}

export default function TopContributorsList({
    contributors,
    title = "Top 10 Contributors"
}: TopContributorsListProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {title}
            </h3>
            <div className="space-y-3">
                {contributors.map((contributor, index) => (
                    <div
                        key={contributor.username}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-medium">
                                {index === 0 ? (
                                    <div className="w-6 h-6 rounded-full bg-yellow-500/50 flex items-center justify-center">
                                        🥇
                                    </div>
                                ) : index === 1 ? (
                                    <div className="w-6 h-6 rounded-full bg-gray-400/50 flex items-center justify-center">
                                        🥈
                                    </div>
                                ) : index === 2 ? (
                                    <div className="w-6 h-6 rounded-full bg-amber-600/50 flex items-center justify-center">
                                        🥉
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                        {index + 1}
                                    </div>
                                )}
                            </div>
                            <span className="text-slate-900 dark:text-slate-100 font-medium">
                                {contributor.username}
                            </span>
                        </div>
                        <span className="text-blue-500 font-semibold">
                            {formatNumber(contributor.commits)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
