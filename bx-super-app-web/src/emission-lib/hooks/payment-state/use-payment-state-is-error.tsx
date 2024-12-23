import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { paymentStateAtom } from '../../store';

const paymentStateIsError = focusAtom(paymentStateAtom, (optic) =>
  optic.prop('isError')
);
paymentStateIsError.debugLabel = 'paymentStateIsError';

export function usePaymentStateIsError(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(paymentStateIsError);
}
