import { useSyncExternalStore } from 'react';

export function useQueryParam(key: string): string | null {
  const subscribeToPopState = (listener: (event: PopStateEvent) => void) => {
    window.addEventListener('popstate', listener);

    return () => {
      window.removeEventListener('popstate', listener);
    };
  };

  const getCurrentValueOfQueryParam = () => {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get(key);
  };

  const valueOfQueryParam = useSyncExternalStore(subscribeToPopState, getCurrentValueOfQueryParam);

  return valueOfQueryParam;
}
