import { useQuery, UseQueryResult } from 'react-query';

import { getEmissionByTransactionId } from 'api/emissions/emission';
import {
  ShippingEmitterType,
  ShippingCommuneType,
  ShippingRegionType,
} from 'types/shipping';

export type EmissionByTransactionIdType = {
  billing_information?: {
    rut: string;
    address: string;
    address_number: string;
    postal_code: string;
    city_name: string;
    commune: ShippingCommuneType;
    region: ShippingRegionType;
    legacy_id: string;
  };
  created_at: string;
  discount: number;
  emission_file_url?: string;
  emission_order_service?: string;
  emitter: ShippingEmitterType & {
    user_id: string;
    user_fullname: string;
  };
  payment_info?: { amount: number; payment_method: string };
  price: number;
  promotion_code: string;
  promotion_id: string;
  shipping: string[];
  shipping_price: number;
  status: 'IN_PROCESS' | 'PAID' | 'CONFIRMED' | 'REJECTED' | 'REFUNDED';
  tax: number;
  terms_and_conditions_accepted: boolean;
  terms_and_conditions_accepted_date: string;
  transaction_id: number;
  updated_at: string;
  warranty: number;
  withPromotion: boolean;
  emission_type: string;
  _id: string;
};

export function useGetEmissionByTransactionId(
  transactionId: string,
  isRefetching?: boolean | null,
  enabled = true
): UseQueryResult<EmissionByTransactionIdType | undefined, Error> {
  return useQuery<EmissionByTransactionIdType | undefined, Error>(
    'get-emission-by-transaction-id',
    () => getEmissionByTransactionId(transactionId),
    {
      refetchInterval: isRefetching ? 5000 : false,
      enabled,
      queryHash: transactionId,
    }
  );
}
