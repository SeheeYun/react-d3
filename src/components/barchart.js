import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import { useEffect, useRef, useState } from 'react';

function Barchart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, 300])
      .padding(0.5);
    const yScale = scaleLinear() //
      .domain([0, 150])
      .range([150, 0]);
    const colorScale = scaleLinear() //
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    svg
      .select('.xAxis_group')
      .style('transform', 'translateY(150px)')
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
      .attr('y', -150)
      .attr('width', xScale.bandwidth)
      .on('mouseenter', handleMouseEnter)
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', d => 150 - yScale(d));
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        <g className="xAxis_group" />
        <g className="yAxis_group" />
      </svg>
      <button
        onClick={() => {
          setData(data.map(d => d + 10));
        }}
      >
        Update data
      </button>
      <button
        onClick={() => {
          setData(data.filter(d => d <= 35));
        }}
      >
        Filter data
      </button>
    </>
  );
}

export default Barchart;
