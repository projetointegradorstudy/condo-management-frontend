import { useCallback, useState } from 'react';
import storage from './storage';

export default function useStorage(key: string) {
  const [state, setState] = useState(() => storage.get(key));

  const set = useCallback(
    (newValue: string) => {
      storage.set(key, newValue);
      setState(newValue);
    },
    [key],
  );

  const remove = useCallback(() => {
    storage.remove(key);
    setState(undefined);
  }, [key]);

  return [state, set, remove];
}
