import type {
  ShippingOriginDestinyType,
  ShippingOriginRefundType,
} from 'types/shipping';

export type FrequentOriginResponseType = {
  _id: string;
  created: Date;
  updated: Date;
  pyme_id?: string;
  user_id: string;
  email: string;
  phone: string;
  origin: ShippingOriginDestinyType;
  refund: ShippingOriginRefundType;
};
