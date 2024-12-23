import { useCallback, useEffect, useState } from 'react';

function useMediaQuery(width: number): boolean {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener('change', updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', updateTarget);
  }, [updateTarget, width]);

  return targetReached;
}

export function useIsTablet(): boolean {
  return useMediaQuery(768);
}

export function useIsLarge(): boolean {
  return useMediaQuery(1200);
}
