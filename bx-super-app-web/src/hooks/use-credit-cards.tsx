import { useQuery } from 'react-query';

import { getPaymentCards } from 'api/payment/alternative';
import type { CardType } from 'types/payment';

type ReturnType = {
  isLoading: boolean;
  data: CardType[] | undefined;
  error: Error | null;
};

export const useCreditCards = (): ReturnType => {
  const { isLoading, data, error } = useQuery<CardType[], Error>(
    'credit-cards',
    getPaymentCards
  );

  return { isLoading, data, error };
};
