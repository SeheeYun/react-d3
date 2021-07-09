import {
  axisRight,
  axisTop,
  curveCardinal,
  line,
  scaleLinear,
  select,
} from 'd3';
import React, { useEffect, useRef, useState } from 'react';

function Line() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear() //
      .domain([0, 75])
      .range([150, 0]);

    const xAxis = axisTop(xScale)
      .ticks(7)
      .tickFormat(i => i + 1);
    const yAxis = axisRight(yScale);

    svg
      .select('.xAxis_group')
      .style('transform', 'translateY(150px)')
      .call(xAxis);
    svg.select('.yAxis_group').call(yAxis);

    const linearGenerator = line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(curveCardinal);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', d => linearGenerator(d))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        <g className="xAxis_group" />
        <g className="yAxis_group" />
      </svg>
      <button
        onClick={() => {
          setData(data.map(value => value + 5));
        }}
      >
        Update data
      </button>
      <button
        onClick={() => {
          setData(data.filter(value => value <= 35));
        }}
      >
        Filter data
      </button>
    </>
  );
}

export default Line;
