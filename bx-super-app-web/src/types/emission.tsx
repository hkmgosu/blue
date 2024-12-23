import {
  ShippingEmitterType,
  ShippingOriginDestinyType,
  ShippingCommuneType,
  ShippingRegionType,
  ShippingPackageSizes,
  ShippingSizeType,
  ShippingOriginRefundType,
} from './shipping';
import { PymeBankInformation } from './pyme';

export type EmitterType = ShippingEmitterType & {
  user_id: string;
  user_fullname: string;
};

export type ReceiverType = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  rut: string;
};

export type ShippingServiceType = {
  codeOrigin: string;
  codeDestination: string;
  price: number;
  weight: number;
  service: string;
  sla: number;
};

export type SizesType = 'S' | 'M' | 'L' | null;

export type PackageType = {
  content: string;
  dangerous_merchandise: boolean;
  package_sizes: ShippingPackageSizes;
  package_value: number;
  size: ShippingSizeType;
  shipping_service: ShippingServiceType;
  warranty: boolean;
  warranty_value: number;
  warranty_bill_number?: string;
  warranty_extended?: number;
  total_value: number;
  tax: number;
};

export type ShippingStatusType = 'CREATED' | 'CONFIRMED' | 'WITH_ERROR';

export type ShippingType = {
  emission_id: string;
  user_id: string;
  pyme_id: string;
  origin: ShippingOriginDestinyType;
  destiny: ShippingOriginDestinyType;
  receiver: ReceiverType;
  package: PackageType[];
  order_service_id: string;
  refund: ShippingOriginRefundType;
  status: ShippingStatusType;
  created_at: string;
  updated_at: string;
  shipping_file_url?: string;
};

export type PaymentInfoType = {
  amount: number;
  payment_method: string;
};

export type BillingType = 'ticket' | 'bill';

export type BillingInformationType = {
  rut: string;
  address: string;
  address_number: string;
  postal_code: string;
  city_name: string;
  commune: ShippingCommuneType;
  region: ShippingRegionType;
  legacy_id: string;
};

export type EmissionType = {
  created_at: string;
  updated_at: string;
  status: 'IN_PROCESS' | 'PAID' | 'CONFIRMED' | 'REJECTED';
  emitter: EmitterType;
  shipping: ShippingType[];
  emission_file_url?: string;
  emission_order_service?: string;
  payment_info?: PaymentInfoType;
  price: number;
  billingType: BillingType;
  billing_information?: BillingInformationType;
};

export type EmissionServiceType = 'NEXT DAY' | 'STANDARD';

export type ResumeEmissionType = {
  regions: {
    name: string;
    count: number;
  }[];
  sizes: {
    name: ShippingSizeType;
    count: number;
  }[];
  services: EmissionServiceType[];
};

export type CancelOsRequest = {
  reason: string;
  bankInformation: PymeBankInformation;
  otherReason: string;
};
