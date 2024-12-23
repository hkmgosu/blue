import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAgencyIdAtom = focusAtom(originAtom, (optic) =>
  optic.prop('agency_id')
);
originAgencyIdAtom.debugLabel = 'originAgencyIdAtom';

export function useOriginAgencyId(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAgencyIdAtom);
}
