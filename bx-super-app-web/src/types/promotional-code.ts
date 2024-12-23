import { PaymentMethod } from './payment';

export type PromotionalCodeType = {
  id: string;
  code: string;
  is_fraction: boolean;
  is_active?: boolean;
  is_free_shipping: boolean;
  value: number;
  paymentAvailable: PaymentMethod;
};
