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
