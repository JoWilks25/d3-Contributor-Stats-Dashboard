import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type BarChartProps = { data: number[]; width?: number; height?: number };

export default function BarChart({ data, width = 500, height = 200 }: BarChartProps) {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const margin = { top: 8, right: 8, bottom: 24, left: 32 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const x = d3
            .scaleBand()
            .domain(data.map((_, i) => String(i)))
            .range([0, innerWidth])
            .padding(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data) ?? 0])
            .nice()
            .range([innerHeight, 0]);

        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        const g = svg
            .attr('viewBox', `0 0 ${width} ${height}`)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (_, i) => x(String(i))!)
            .attr('y', d => y(d))
            .attr('width', x.bandwidth())
            .attr('height', d => innerHeight - y(d))
            .attr('fill', '#60a5fa');

        g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(x).tickSizeOuter(0));
        g.append('g').call(d3.axisLeft(y).ticks(5));
    }, [data, width, height]);

    return (
        <div className="w-full max-w-xl rounded border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
            <svg ref={ref} className="w-full h-auto" />
        </div>
    );
}
