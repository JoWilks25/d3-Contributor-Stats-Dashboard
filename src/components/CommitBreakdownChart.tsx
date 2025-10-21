import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { formatNumber, type CommitBreakdownData } from '../utils/dataCalculations';

interface CommitBreakdownChartProps {
    data: CommitBreakdownData;
    title?: string;
}

export default function CommitBreakdownChart({
    data,
    title = "Commit Breakdown"
}: CommitBreakdownChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

    // ResizeObserver to dynamically measure container and update dimensions
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                // Calculate size based on available height, prioritizing height constraint
                // Account for title (h3) and legend space (~120px total)
                const availableHeight = height - 120;
                const availableWidth = width - 48; // 48px for padding

                // Use the smaller dimension to maintain square aspect ratio
                // but prioritize height constraint from the contributors list
                const size = Math.min(availableWidth, availableHeight);
                const finalSize = Math.max(size, 200); // Minimum 200px
                setDimensions({ width: finalSize, height: finalSize });
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!svgRef.current || !data) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous render

        const { width, height } = dimensions;
        const radius = Math.min(width, height) / 2;
        const innerRadius = radius * 0.6; // Creates the doughnut hole

        // Chart data
        const chartData = [
            { label: 'Additions', value: data.additions, percentage: data.additionsPercentage, color: '#10B981' },
            { label: 'Deletions', value: data.deletions, percentage: data.deletionsPercentage, color: '#EF4444' }
        ];

        // Create pie generator
        const pie = d3.pie<typeof chartData[0]>()
            .value(d => d.value)
            .sort(null);

        // Create arc generator
        const arc = d3.arc<d3.PieArcDatum<typeof chartData[0]>>()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        // Create SVG group centered with viewBox for responsive scaling
        const g = svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Create arcs
        const arcs = g.selectAll('.arc')
            .data(pie(chartData))
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Add paths with animation
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color)
            .attr('stroke', 'currentColor')
            .attr('stroke-width', 2)
            .attr('class', 'stroke-slate-200 dark:stroke-slate-700')
            .style('opacity', 0)
            .transition()
            .duration(800)
            .style('opacity', 1)
            .attrTween('d', function (d) {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t)) || '';
                };
            });

        // Add center text
        const centerText = g.append('g')
            .attr('class', 'center-text')
            .style('text-anchor', 'middle');

        centerText.append('text')
            .attr('dy', '-0.5em')
            .attr('class', 'text-2xl font-bold fill-slate-900 dark:fill-slate-100')
            .style('font-size', '24px')
            .style('font-weight', 'bold')
            .text(formatNumber(data.totalCommits));

        centerText.append('text')
            .attr('dy', '1em')
            .attr('class', 'text-sm fill-slate-600 dark:fill-slate-400')
            .style('font-size', '12px')
            .text('Total Commits');

    }, [data, dimensions]);

    return (
        <div
            ref={containerRef}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors h-full flex flex-col"
        >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {title}
            </h3>
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 min-h-0">
                <div className="w-full flex items-center justify-center" style={{ height: `${dimensions.height}px` }}>
                    <svg ref={svgRef} className="max-w-full max-h-full"></svg>
                </div>
                {/* Legend */}
                <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-700 dark:text-slate-300">
                            Additions ({data.additionsPercentage}%)
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-slate-700 dark:text-slate-300">
                            Deletions ({data.deletionsPercentage}%)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
