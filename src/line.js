import { curveCardinal, line, select } from 'd3';
import { useEffect, useRef, useState } from 'react';

function Line() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const linearGenerator = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', d => linearGenerator(d))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
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
