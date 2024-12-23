import { useAtom, SetStateAction } from 'jotai';

import { emitterDataIsCollapsedAtom } from '../../store';

export function useEmitterDataIsCollapsed(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(emitterDataIsCollapsedAtom);
}
