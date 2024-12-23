import { useAtomValue } from 'jotai/utils';

import { storeEmissionSummaryDtoAtom } from '../../store';
import { EmissionSummaryDtoType } from '../../types';

export function useEmissionSummaryDto(): EmissionSummaryDtoType {
  return useAtomValue(storeEmissionSummaryDtoAtom);
}
