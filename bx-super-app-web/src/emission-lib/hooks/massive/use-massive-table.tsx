import { useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';
import { MassiveResponseSuccess } from 'types/massive-table';

const massiveShippingListAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('table')
);

massiveShippingListAtom.debugLabel = 'massiveTable';

export const useMassiveTable = (): [
  MassiveResponseSuccess | null,
  (data: MassiveResponseSuccess | null) => void
] => useAtom(massiveShippingListAtom);
