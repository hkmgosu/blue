import { useAtom } from 'jotai';
import { menuCollapsed } from 'atoms/dashboard';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function useComponentVisible(initialIsVisible: any): {
  ref: React.MutableRefObject<null>;
  isComponentVisible: any;
  setIsComponentVisible: React.Dispatch<any>;
} {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<any>(null);
  const [, setIsOpenSidebar] = useAtom(menuCollapsed);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        window.innerWidth < 600
      ) {
        setIsOpenSidebar(false);
        setIsComponentVisible(false);
      }
    },
    [setIsOpenSidebar]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref, isComponentVisible, setIsComponentVisible };
}
