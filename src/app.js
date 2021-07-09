import React, { useState } from 'react';
import './app.css';
import Barchart from './components/barchart';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  return (
    <>
      <Barchart data={data} />
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

export default App;
