import { useState, useEffect } from 'react';

export default function useLocalStorage(
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse
) {
  const [state, setState] = useState(() => {
    return deserialize(localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    if (prevState => state !== prevState) {
      return localStorage.setItem(key, serialize(state));
    }
  }, [key, serialize, state]);

  return [state, setState];
}
