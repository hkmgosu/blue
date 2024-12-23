import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { paymentStateAtom } from '../../store';

const paymentStateIsLoading = focusAtom(paymentStateAtom, (optic) =>
  optic.prop('isLoading')
);
paymentStateIsLoading.debugLabel = 'paymentStateIsLoading';
export function usePaymentStateIsLoading(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(paymentStateIsLoading);
}
