import  { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 250) {
  const [debounceValue, setDebouncevalue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncevalue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
}
