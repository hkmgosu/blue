import { SetStateAction, useAtom } from 'jotai';

import { EmissionStoreType } from '../../types';
import { repayEmissionAtom } from '../../store';

export function useRepayEmission(): [
  EmissionStoreType | null,
  (update: SetStateAction<EmissionStoreType | null>) => void
] {
  return useAtom(repayEmissionAtom);
}
