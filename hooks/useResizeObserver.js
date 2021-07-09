import { useEffect, useState } from 'react';

function useResizeObserver(ref) {
  const [demensions, setDemensions] = useState(null);

  useEffect(() => {
    const observerTatget = ref.current;
  }, []);

  return demensions;
}

export default useResizeObserver;
