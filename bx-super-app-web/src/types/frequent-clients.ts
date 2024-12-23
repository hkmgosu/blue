import {
  ShippingOriginDestinyType,
  ShippingReceiverType,
} from 'emission-lib/types';

export type FrequentClientsResponseType = {
  _id: string;
  created: Date;
  pyme_id: string;
  user_id: string;
  receiver: ShippingReceiverType;
  destiny: ShippingOriginDestinyType;
};
