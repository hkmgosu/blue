import { useQuery } from 'react-query';

import { getPayment } from 'api/payment';
import { PaymentResponseType } from 'types/payment';

type TransactionIdType = string;

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: PaymentResponseType | undefined;
  isSuccess: boolean;
  isIdle: boolean;
};

export function useGetPayment(transactionId: TransactionIdType): ReturnType {
  const { isLoading, isError, error, data, isSuccess, isIdle } = useQuery<
    PaymentResponseType | undefined,
    Error
  >('get-payment', () => getPayment(transactionId));

  return {
    isLoading,
    isError,
    error,
    data,
    isSuccess,
    isIdle,
  };
}
