import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAgencyNameAtom = focusAtom(originAtom, (optic) =>
  optic.prop('agency_name')
);
originAgencyNameAtom.debugLabel = 'originAgencyNameAtom';

export function useOriginAgencyName(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAgencyNameAtom);
}
