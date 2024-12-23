import type { GeolocationType, RegionType, CommuneType } from 'types/locations';
import type {
  ShippingAddressType,
  ShippingEmitterType,
  ShippingCommuneType,
  ShippingRegionType,
} from 'types/shipping';

export type EmissionPickupType = {
  agency_id?: string;
  agency_name?: string;
  country_name?: string;
  state_name?: string;
  city_name?: string;
  street_name?: string;
  street_number?: string;
};

export type EmissionEmitterType = ShippingEmitterType;

export type EmissionOriginType = {
  type: 'pickup' | 'address';
  isPickup: boolean;
  pickup: {
    pickup_data: EmissionPickupType;
    geolocation: GeolocationType;
    region: ShippingRegionType;
    commune: ShippingCommuneType;
  };
  save_frequent_origin: boolean;
};

export enum SizeEnum {
  none = 'none',
  S = 'S',
  M = 'M',
  L = 'L',
}

export type PackageSizesType = {
  weight: number;
  width: number;
  height: number;
  long: number;
};

export type Address = {
  state: string;
  city: string;
  street: string;
  street_number: string;
  country: string;
  complement: string;
  reference: string;
  location: string;
  geolocation: GeolocationType;
};

export type EmissionDataType = {
  emitter: EmissionEmitterType;
  origin: EmissionOriginType;
  receiver_count: number;
  receiver: Array<{
    name: string;
    lastName: string;
    email: string;
    phone: string;
    save_frequent_client: boolean;
    frequent_alias_client?: string;
  }>;
  destiny: {
    type: 'pickup' | 'address' | undefined;
    isPickup: boolean;
    pickup: {
      pickup_data: EmissionPickupType;
      geolocation: GeolocationType;
      region: RegionType;
      commune: CommuneType;
    };
    address: Address;
    package_count: number;
    package: Array<{
      content: string;
      package_value: string;
      dangerous_merchandise: boolean;
      content_value: string;
      insurance: boolean;
      ticket: string;
    }>;
    shipping_value: Array<{
      save_frequent_package: boolean;
      frequent_alias_package?: string;
      size?: SizeEnum;
      package_sizes: PackageSizesType;
      bx_shipping_service: string;
      value: number;
      tax: number;
    }>;
  };
  shipping: Array<{
    destiny: {
      address?: ShippingAddressType;
      pickup?: EmissionPickupType;
    };
    shipping_value?: {
      bx_shipping_service?: number;
      size?: string;
    };
  }>;
  payment_info?: { amount?: number; payment_method?: string };
  billingType?: 'ticket' | 'bill';
  paymentType?: 'webpay' | 'oneclick' | 'receiver' | 'free';
  selectedCard: string | null;
  isResultModalOpen: boolean;
  isAcceptedTerms: boolean;
};

export type PriceType = {
  price: number;
};

export type CalculatePricingType = {
  distance: number;
  size: string | null;
  service: string;
  extra: {
    weight: number;
    width: number;
    height: number;
    length: number;
  };
};

export interface EmissionType extends Partial<EmissionDataType> {
  _id?: string;
  __v?: number;
  created?: string;
  status?: string;
}

export type EmissionItemListType = {
  id: string;
  pyme_id: string;
  date: string;
  payment: {
    amount: number;
    payment_method: string;
  };
  status: string;
  fileUrl: string;
  transaction_id?: number;
};

export type EmissionList = EmissionItemListType[];
