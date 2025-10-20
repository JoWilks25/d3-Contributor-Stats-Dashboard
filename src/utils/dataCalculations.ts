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
