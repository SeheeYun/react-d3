import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';

function Barchart({ data }) {
  const wrapperRef = useRef();
  const svgRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions) return;

    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear() //
      .domain([0, 150])
      .range([dimensions.height, 0]);

    const colorScale = scaleLinear() //
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    svg
      .select('.xAxis_group')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);
    svg
      .select('.yAxis_group') //
      .call(yAxis);

    const handleMouseEnter = (event, d) => {
      const index = svg.selectAll('.bar').nodes().indexOf(event.target);
      svg
        .selectAll('.tooltip') //
        .data([d])
        .join(enter => enter.append('text').attr('y', yScale(d) - 4))
        .attr('class', 'tooltip')
        .text(d)
        .attr('x', xScale(index))
        .transition()
        .attr('y', yScale(d) - 8)
        .attr('opacity', 1);
    };

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1,-1)')
      .attr('x', (d, i) => xScale(i))
      .attr('y', -dimensions.height)
      .attr('width', xScale.bandwidth)
      .on('mouseenter', handleMouseEnter)
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', d => dimensions.height - yScale(d));
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}>
        <g className="xAxis_group" />
        <g className="yAxis_group" />
      </svg>
    </div>
  );
}

export default Barchart;
