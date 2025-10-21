interface CommitBreakdownChartProps {
    title?: string;
}

export default function CommitBreakdownChart({
    title = "Commit Breakdown"
}: CommitBreakdownChartProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {title}
            </h3>
            <div className="flex items-center justify-center h-64">
                <p className="text-slate-500 dark:text-slate-400 text-center">
                    Placeholder chart goes here
                </p>
            </div>
        </div>
    );
}
