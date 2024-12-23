import { useAtom, SetStateAction } from 'jotai';

import { storeAtom } from '../../store';
import { EmissionStoreType } from '../../types';

export function useEmissionStore(): [
  EmissionStoreType,
  (update: SetStateAction<EmissionStoreType>) => void
] {
  return useAtom(storeAtom);
}
