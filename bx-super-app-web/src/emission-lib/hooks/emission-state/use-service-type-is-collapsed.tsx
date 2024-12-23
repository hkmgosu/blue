import { useAtom, SetStateAction } from 'jotai';

import { serviceTypeIsCollapsedAtom } from '../../store';

export function useServiceTypeIsCollapsed(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(serviceTypeIsCollapsedAtom);
}
