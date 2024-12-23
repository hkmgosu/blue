import { useAtomValue } from 'jotai/utils';

import { createEmissionDtoAtom } from '../../store';
import { CreateEmissionDtoType } from '../../types';

export function useCreateEmissionDto(): CreateEmissionDtoType {
  return useAtomValue(createEmissionDtoAtom);
}
