import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { refundAtom } from '../../store';

const refundOfficeAtom = focusAtom(refundAtom, (optic) =>
  optic.prop('address').prop('office')
);
refundOfficeAtom.debugLabel = 'refundOfficeAtom';

export function useRefundOffice(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(refundOfficeAtom);
}
