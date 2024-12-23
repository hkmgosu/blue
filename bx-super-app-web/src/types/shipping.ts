import { GeolocationType } from './locations';

export type ShippingEmitterType = {
  pyme_id: string;
  email: string;
  phone: string;
};

export type ShippingRegionType = {
  name: string;
  country: number;
  region_iso_3166: string;
  region_number: string;
};

export type ShippingCommuneType = {
  base_name: string;
  name: string;
  code: string;
  base_post: string;
  zone: string;
  location_code: string;
};

export type ShippingAddressDataType = {
  country: string;
  city: string;
  street: string;
  street_number: string;
  complement: string;
  reference: string;
  depto: string;
  office: string;
  geolocation: GeolocationType;
};

export type ShippingAddressType = ShippingAddressDataType & {
  region: ShippingRegionType;
  commune: ShippingCommuneType;
};

export type ShippingReceiverType = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  rut: string;
};

export type ShippingPackageSizes = {
  weight: number;
  width: number;
  height: number;
  length: number;
};

export type ShippingOriginDestinyType = {
  isPickup: boolean;
  agency_id: string | null;
  agency_name: string | null;
  address: ShippingAddressType;
};

export type ShippingBxServiceType = 'STANDARD' | 'NEXT DAY';

export type ShippingServiceType = {
  codeOrigin: string | null;
  codeDestination: string | null;
  price: number;
  weight: number;
  service: ShippingBxServiceType | null;
  sla: number;
};

export type ShippingSizeType = 'XS' | 'S' | 'M' | 'L' | 'none';

export type ShippingPackageType = {
  dangerous_merchandise: boolean;
  content: string | null;
  warranty: boolean;
  warranty_value: number | null;
  warranty_bill_number: string | null;
  warranty_extended: number;
  size: ShippingSizeType;
  package_sizes: ShippingPackageSizes;
  shipping_service: ShippingServiceType;
  total_value: number;
  tax: number;
};

export type ShippingOriginRefundType = {
  isPickup: boolean;
  agency_id: string | null;
  agency_name: string | null;
  address: ShippingAddressType;
};

export type ShippingType = {
  origin: ShippingOriginDestinyType;
  save_frequent_origin: boolean;
  save_refund_address: boolean;
  refund: ShippingOriginRefundType;
  receiver: ShippingReceiverType;
  destiny: ShippingOriginDestinyType;
  save_frequent_client: boolean;
  frequent_alias_client: string | null;
  package: ShippingPackageType[];
  save_frequent_package: boolean;
  frequent_alias_package: string | null;
};

export type ShippingEmissionDtoType = {
  emission_type: string;
  emitter: ShippingEmitterType;
  billingType: NewShippingBillingType;
  shipping: ShippingType[];
  withPromotion: boolean;
  promotion_code: string;
  promotion_id: string;
  shipping_price: number;
  discount: number;
  tax: number;
  warranty: number;
  total_price: number;
  terms_and_conditions_accepted: boolean;
  terms_and_conditions_accepted_date: string | null;
};

export type ShippingHashDtoType =
  | 'emitter'
  | 'billingType'
  | 'shipping'
  | 'total_price';

export type NewShippingBillingType = 'INVOICE' | 'BILL';

export type NewShippingCountType = 'UNITARY' | 'MULTI' | 'MASSIVE';

export type NewShippingRetryEmissionAtomType = {
  emitter: ShippingEmitterType;
  billingType: NewShippingBillingType;
  shipping: Array<{ id: string } & ShippingType>;
  total_price: number;
  new_shipping_type: NewShippingCountType;
};
