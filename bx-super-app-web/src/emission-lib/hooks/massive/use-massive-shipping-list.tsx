import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';
import { NewShippingListAtomType } from '../../types';

const massiveShippingListAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('shippingList')
);
massiveShippingListAtom.debugLabel = 'massiveShippingListAtom';

export function useMassiveShippingList(): [
  NewShippingListAtomType[] | null,
  (update: SetStateAction<NewShippingListAtomType[] | null>) => void
] {
  return useAtom(massiveShippingListAtom);
}
