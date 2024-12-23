import { useAtom, SetStateAction } from 'jotai';

import { emitterAddressIsCollapsedAtom } from '../../store';

export function useEmitterAddressIsCollapsed(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(emitterAddressIsCollapsedAtom);
}
