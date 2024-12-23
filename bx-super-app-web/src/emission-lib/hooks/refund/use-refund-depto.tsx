import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { refundAtom } from '../../store';

const refundDeptoAtom = focusAtom(refundAtom, (optic) =>
  optic.prop('address').prop('depto')
);
refundDeptoAtom.debugLabel = 'refundDeptoAtom';

export function useRefundDepto(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(refundDeptoAtom);
}
