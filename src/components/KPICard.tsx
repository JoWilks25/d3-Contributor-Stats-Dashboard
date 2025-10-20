import { ReactNode } from 'react';

interface KPICardProps {
    icon: ReactNode;
    value: string | number;
    label: string;
    iconBgColor?: string;
}

export default function KPICard({
    icon,
    value,
    label,
    iconBgColor = 'bg-blue-500'
}: KPICardProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center">
                <div className={`${iconBgColor} rounded-lg p-3 mr-4`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        {label}
                    </div>
                </div>
            </div>
        </div>
    );
}
