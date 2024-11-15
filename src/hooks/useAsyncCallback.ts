import { useCallback, useRef } from 'react';

export const useAsyncCallback = (
  callback: (...args: any[]) => Promise<any>,
  deps: any[],
) => {
  const done = useRef(true);

  return useCallback(async (...args) => {
    if (!done.current) return;
    done.current = false;
    try {
      await Promise.resolve(callback(...args));
      done.current = true;
    } catch (err) {
      done.current = true;
      throw new Error(err as any);
    }
  }, deps);
};

export default useAsyncCallback;
