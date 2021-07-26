import { select } from 'd3';
import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';

function Geochart({ data }) {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Geochart;
