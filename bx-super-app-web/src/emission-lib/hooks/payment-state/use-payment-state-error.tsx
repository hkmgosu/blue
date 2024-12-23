import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { paymentStateAtom } from '../../store';

const paymentStateError = focusAtom(paymentStateAtom, (optic) =>
  optic.prop('error')
);
paymentStateError.debugLabel = 'paymentStateError';
export function usePaymentStateError(): [
  string | null,
  (update: SetStateAction<string | null>) => void
] {
  return useAtom(paymentStateError);
}
