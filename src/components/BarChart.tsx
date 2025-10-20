import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { ContributorCommitData } from '../utils/dataCalculations';

type BarChartProps = {
    data: ContributorCommitData[];
    width?: number;
    height?: number;
    title?: string;
};

export default function BarChart({ data, width = 800, height = 400, title = "Contributor Commit Statistics" }: BarChartProps) {
    const ref = useRef<SVGSVGElement | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    );

    // Listen for dark mode changes
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    setIsDarkMode(isDark);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!ref.current || !data.length) return;

        const margin = { top: 20, right: 20, bottom: 80, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Use the state variable for dark mode

        // Color scheme for dark/light mode
        const colors = {
            bar: isDarkMode ? '#60a5fa' : '#3b82f6',
            text: isDarkMode ? '#e2e8f0' : '#374151',
            axis: isDarkMode ? '#64748b' : '#6b7280'
        };

        const x = d3
            .scaleBand()
            .domain(data.map(d => d.username))
            .range([0, innerWidth])
            .padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.commits) ?? 0])
            .nice()
            .range([innerHeight, 0]);

        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        const g = svg
            .attr('viewBox', `0 0 ${width} ${height}`)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Add bars
        g.selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', d => x(d.username)!)
            .attr('y', d => y(d.commits))
            .attr('width', x.bandwidth())
            .attr('height', d => innerHeight - y(d.commits))
            .attr('fill', colors.bar)
            .attr('rx', 4)
            .attr('ry', 4);

        // Add value labels on top of bars
        g.selectAll('.bar-label')
            .data(data)
            .join('text')
            .attr('class', 'bar-label')
            .attr('x', d => x(d.username)! + x.bandwidth() / 2)
            .attr('y', d => y(d.commits) - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', colors.text)
            .attr('font-size', '12px')
            .attr('font-weight', '500')
            .text(d => d.commits.toLocaleString());

        // Add x-axis
        const xAxis = g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        xAxis.selectAll('text')
            .attr('fill', colors.text)
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em');

        xAxis.selectAll('path, line')
            .attr('stroke', colors.axis);

        // Add y-axis
        const yAxis = g.append('g')
            .call(d3.axisLeft(y).ticks(5).tickFormat(d => d.toLocaleString()));

        yAxis.selectAll('text')
            .attr('fill', colors.text);

        yAxis.selectAll('path, line')
            .attr('stroke', colors.axis);

        // Add y-axis label
        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (innerHeight / 2))
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .attr('fill', colors.text)
            .attr('font-size', '14px')
            .attr('font-weight', '500')
            .text('Commits');

    }, [data, width, height, isDarkMode]);

    return (
        <div className="w-full rounded border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 transition-colors">
            {title && (
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {title}
                    </h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        All Time
                    </div>
                </div>
            )}
            <div className="w-full overflow-x-auto">
                <svg ref={ref} className="w-full h-auto min-w-[600px]" />
            </div>
        </div>
    );
}
