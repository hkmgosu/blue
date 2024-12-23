import { useAtomValue } from 'jotai/utils';

import { storeEmissionDtoAtom } from '../../store';
import { EmissionDtoType } from '../../types';

export function useEmissionDto(): EmissionDtoType {
  return useAtomValue(storeEmissionDtoAtom);
}
