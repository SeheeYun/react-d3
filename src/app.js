import { useEffect, useRef } from 'react';
import './app.css';

const data = [25, 30, 45, 60, 20];

function App() {
  const svgRef = useRef();
  console.log(svgRef);

  useEffect(() => {
    console.log(svgRef);
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default App;
