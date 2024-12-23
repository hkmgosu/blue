import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';
import { BillingType } from '../../types';

const billingTypeAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('billingType')
);
billingTypeAtom.debugLabel = 'billingTypeAtom';

export function useBilling(): [
  BillingType,
  (update: SetStateAction<BillingType>) => void
] {
  return useAtom(billingTypeAtom);
}
