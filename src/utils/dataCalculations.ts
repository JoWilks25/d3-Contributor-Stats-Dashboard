import { data } from '../data/d3_contributor_data';

export interface KPIMetrics {
    totalContributors: number;
    totalCommits: number;
    totalAdditions: number;
    totalDeletions: number;
}

/**
 * Calculate key performance indicators from the contributor data
 */
export function calculateKPIMetrics(): KPIMetrics {
    const totalContributors = data.length;

    let totalCommits = 0;
    let totalAdditions = 0;
    let totalDeletions = 0;

    // Sum up all alltime stats across contributors
    data.forEach(contributor => {
        totalCommits += contributor.alltime.commits;
        totalAdditions += contributor.alltime.additions;
        totalDeletions += contributor.alltime.deletions;
    });

    return {
        totalContributors,
        totalCommits,
        totalAdditions,
        totalDeletions
    };
}

export interface ContributorCommitData {
    username: string;
    commits: number;
}

/**
 * Get top contributors by commit count for the bar chart
 */
export function getTopContributorsByCommits(limit: number = 10): ContributorCommitData[] {
    return data
        .map(contributor => ({
            username: contributor.username,
            commits: contributor.alltime.commits
        }))
        .sort((a, b) => b.commits - a.commits)
        .slice(0, limit);
}

export interface CommitBreakdownData {
    additions: number;
    deletions: number;
    additionsPercentage: number;
    deletionsPercentage: number;
    totalCommits: number;
}

/**
 * Calculate commit breakdown data for the doughnut chart
 */
export function getCommitBreakdownData(): CommitBreakdownData {
    const kpiMetrics = calculateKPIMetrics();
    const { totalAdditions, totalDeletions, totalCommits } = kpiMetrics;

    const total = totalAdditions + totalDeletions;
    const additionsPercentage = total > 0 ? Math.round((totalAdditions / total) * 100) : 0;
    const deletionsPercentage = total > 0 ? Math.round((totalDeletions / total) * 100) : 0;

    return {
        additions: totalAdditions,
        deletions: totalDeletions,
        additionsPercentage,
        deletionsPercentage,
        totalCommits
    };
}

/**
 * Format large numbers with appropriate suffixes (K, M, etc.)
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}
