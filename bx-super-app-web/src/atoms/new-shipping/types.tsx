import type { GeolocationType } from 'types/locations';
import {
  NewShippingBillingType,
  NewShippingCountType,
  ShippingBxServiceType,
  ShippingCommuneType,
  ShippingEmitterType,
  ShippingOriginDestinyType,
  ShippingPackageSizes,
  ShippingReceiverType,
  ShippingRegionType,
  ShippingSizeType,
  ShippingType,
} from 'types/shipping';

export type NewShippingAgencyAtomType = {
  agency_id: string;
  agency_name: string;
  country_name: string;
  state_name: string;
  city_name: string;
  street_name: string;
  street_number: string;
  geolocation: GeolocationType;
};

export type NewShippingBusinessAtomType = {
  pyme_id: string;
  pyme_name: string;
};

export type NewShippingOriginPickupCommuneAtomType = ShippingCommuneType;

export type NewShippingOriginPickupRegionAtomType = ShippingRegionType;

export type NewShippingRefundCommuneAtomType = ShippingCommuneType;

export type NewShippingRefundRegionAtomType = ShippingRegionType;

export type NewShippingShippingListAtomType = {
  id: string;
  selected: boolean;
};

export type NewShippingIdAtomParamsType = {
  shippingId: string;
};

export type ReceiverNameAtomType = {
  name: string;
};

export type ReceiverLastNameAtomType = {
  lastName: string;
};

export type ReceiverEmailAtomType = {
  email: string;
};

export type ReceiverRutAtomType = {
  rut: string;
};

export type ReceiverPhoneAtomType = {
  phone: string;
};

export type DestinyIsPickupAtomType = {
  isPickup: boolean | null;
};

export type DestinyPickupRegionAtomType = ShippingRegionType;

export type DestinyAddressMapAtomType = {
  geolocation: GeolocationType;
};

export type DestinyGoogleAddressAtomType = {
  state: string;
  city: string;
  street: string;
  street_number: string;
  country: string;
  geolocation: GeolocationType;
};

export type DestinyGoogleInputValueAtomType = {
  value: string;
};

export type DestinyPickupCommuneAtomType = ShippingCommuneType;

export type DestinyPickupAgencyAtomType = {
  agency_id: string;
  agency_name: string;
  country_name: string;
  state_name: string;
  city_name: string;
  street_name: string;
  street_number: string;
  geolocation: GeolocationType;
};

export type DestinyAddressType = {
  state: string;
  city: string;
  street: string;
  street_number: string;
  country: string;
};

export type DestinyAddressComplementAtomType = {
  complement: string;
};

export type DestinyAddressReferenceAtomType = {
  reference: string;
};

export type SaveFrequentClientType = {
  save_frequent_client: boolean;
};

export type SaveFrequentClientAliasType = {
  frequent_alias_client: string;
};

export type ShippingValueSizeAtomType = {
  size: ShippingSizeType;
};

export type ShippingValueSizeLenghtAtomType = {
  length: string;
};

export type ShippingValueSizeWidthAtomType = {
  width: string;
};

export type ShippingValueSizeHeightAtomType = {
  height: string;
};

export type ShippingValueSizeWeightAtomType = {
  weight: string;
};

export type ShippingSizesValuesAtomType = ShippingValueSizeLenghtAtomType &
  ShippingValueSizeWidthAtomType &
  ShippingValueSizeHeightAtomType &
  ShippingValueSizeWeightAtomType;

export type PackageContentValueType = {
  content: string;
};

export type PackageDangerousType = {
  dangerous_merchandise: boolean;
};

export type PackageWarrantyType = {
  warranty: boolean;
};

export type PackageWarrantyValueType = {
  package_value: string;
};

export type PackageWarrantyBillType = {
  bill_number: string;
};

export type SaveFrequentPackageType = {
  save_frequent_package: boolean;
};

export type SaveFrequentPackageAliasType = {
  frequent_alias_package: string;
};

export type NewShippingBxServiceAtomType = {
  bx_shipping_service: 'STANDARD' | 'NEXT DAY' | null;
};

export type ShippingValueAtomType = {
  value: number;
};

export type ShippingBillingAtomType = {
  billing_type: NewShippingBillingType;
};

export type PaymentMethodType = 'webpay' | 'oneclick';

export type NewShippingPricingAtomType = {
  warrantyValue: number;
  tax: number;
  totalValue: number;
  codeOrigin: string | null;
  codeDestination: string | null;
  price: number;
  weight: number;
  service: 'STANDARD' | 'NEXT DAY';
  sla: number;
}[];

export type ButtonArrowAtomType = {
  isOpen: boolean;
};

export type NewShippingSizesPriceAtomType = {
  broad: number;
  high: number;
  length: number;
  weight: number;
};

export type NewShippingCodeDestinationPricingAtomType = {
  isPickup: boolean | null;
  codePickup: string | null;
  googleBasepost: string | null;
};

export type PricingDtoAtomType = {
  broad: number;
  high: number;
  length: number;
  weight: number;
  codeOrigin: string | null;
  isPickup: boolean | null;
  codeDestination: string | null;
};

export type ShippingAddressStatusAtomType = {
  street: string;
  street_number: string;
  city: string;
  region: string;
};

export type NewShippingAddressAtomType = {
  country: string;
  state: string;
  city: string;
  street: string;
  street_number: string;
  complement: string;
  reference: string;
  geolocation: GeolocationType;
  region: ShippingRegionType;
  commune: ShippingCommuneType;
};

type PackageAtomType = {
  dangerous_merchandise: boolean;
  content: string;
  warranty: boolean;
  warranty_value: number;
  warranty_bill_number: string;
  package_sizes: ShippingPackageSizes;
  shipping_service: ShippingBxServiceType;
};

type NewShippingAtomType = {
  id: string;
  receiver: ShippingReceiverType;
  destiny: ShippingOriginDestinyType;
  package: PackageAtomType[];
};

export type NewShippingListAtomType = NewShippingAtomType[];

export type NewShippingRetryEmissionAtomType = {
  emitter: ShippingEmitterType;
  billingType: NewShippingBillingType;
  shipping: Array<{ id: string } & ShippingType>;
  total_price: number;
  new_shipping_type: NewShippingCountType;
};
