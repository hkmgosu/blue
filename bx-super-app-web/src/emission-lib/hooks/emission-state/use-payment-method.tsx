import { useAtom, SetStateAction } from 'jotai';
import { PaymentMethod } from 'types/payment';
import { paymentMethodAtom } from '../../store';

export function usePaymentMethod(): [
  Lowercase<PaymentMethod>,
  (update: SetStateAction<Lowercase<PaymentMethod>>) => void
] {
  return useAtom(paymentMethodAtom);
}
