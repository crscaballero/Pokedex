import { useState, useEffect } from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debounceValue, setDebouncedValue] = useState<string>(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);
    return () => {
      clearTimeout(timeout); // Clear (or cancel) the above timeout when the input change, so it's triggered only after `time` seconds after the last change
    }
  }, [input]);

  return debounceValue;
}
