import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { paymentStateAtom } from '../../store';

const paymentStateIsSuccess = focusAtom(paymentStateAtom, (optic) =>
  optic.prop('isSuccess')
);
paymentStateIsSuccess.debugLabel = 'paymentStateIsSuccess';
export function usePaymentStateIsSuccess(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(paymentStateIsSuccess);
}
