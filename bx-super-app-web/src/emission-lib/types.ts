import { MassiveResponseSuccess } from 'types/massive-table';
import { PaymentMethod } from 'types/payment';
import { PromotionalCodeType } from 'types/promotional-code';

export type ShippingEmitterType = {
  email: string;
  phone: string;
  pyme_id: string;
  pyme_name: string;
};

export type ShippingGeolocationType = {
  latitude: number;
  longitude: number;
};

export type ShippingRegionType = {
  country: number;
  name: string;
  region_iso_3166: string;
  region_number: string;
};

export type ShippingCommuneType = {
  base_name: string;
  base_post: string;
  code: string;
  location_code: string;
  name: string;
  zone: string;
};

export type ShippingAddressDataType = {
  city: string;
  commune: ShippingCommuneType;
  complement: string;
  country: string;
  depto: string;
  geolocation: ShippingGeolocationType;
  office: string;
  reference: string;
  region: ShippingRegionType;
  street: string;
  street_number: string;
};

export type ShippingOriginDestinyType = {
  address: ShippingAddressDataType;
  agency_id: string;
  agency_name: string;
  isPickup?: boolean;
};

export type ShippingReceiverType = {
  email: string;
  lastName: string;
  name: string;
  phone: string;
  rut: string;
};

export type ShippingPackageSizes = {
  height: number;
  length: number;
  weight: number;
  width: number;
};

export type ShippingPackageDtoSizes = {
  height: number;
  length: number;
  weight: number;
  width: number;
  volumetricWeight: number;
};

export type ShippingBxServiceType = 'STANDARD' | 'NEXT DAY';

export type ShippingServiceType = {
  codeDestination: string | null;
  codeOrigin: string | null;
  price: number;
  service: ShippingBxServiceType | null;
  sla: number;
  weight: number;
};

export type ShippingSizeType = 'XS' | 'S' | 'M' | 'L' | 'none';

export type ShippingPackageType = {
  content: string;
  dangerous_merchandise: boolean;
  package_sizes: ShippingPackageSizes;
  shipping_service: ShippingServiceType;
  size: ShippingSizeType;
  tax: number;
  total_value: number;
  warranty: boolean;
  warranty_bill_number: string;
  warranty_extended: number;
  warranty_value: number;
};

export type ShippingPackageDtoType = {
  content: string;
  dangerous_merchandise: boolean;
  package_sizes: ShippingPackageDtoSizes;
  shipping_service: ShippingServiceType;
  size: ShippingSizeType;
  tax: number;
  total_value: number;
  warranty: boolean;
  warranty_bill_number: string;
  warranty_extended: number;
  warranty_value: number;
};

export type ShippingDtoType = {
  destiny: ShippingOriginDestinyType;
  frequent_alias_client?: string;
  frequent_alias_package?: string;
  origin: ShippingOriginDestinyType;
  package: ShippingPackageDtoType[];
  receiver: ShippingReceiverType;
  refund: ShippingOriginDestinyType;
  save_frequent_client: boolean;
  save_frequent_origin: boolean;
  save_frequent_package: boolean;
  save_refund_address: boolean;
};

export type CreateEmissionShippingPackageDtoType = {
  content: string;
  dangerous_merchandise: boolean;
  package_sizes: ShippingPackageSizes;
  promotion_id: string;
  shipping_service: ShippingServiceType;
  size: ShippingSizeType;
  tax: number;
  total_value: number;
  warranty: boolean;
  warranty_bill_number: string;
  warranty_extended: number;
  warranty_value: number;
};

export type CreateEmissionShippingDtoType = {
  destiny: ShippingOriginDestinyType;
  frequent_alias_client?: string;
  frequent_alias_package?: string;
  origin: ShippingOriginDestinyType;
  package: CreateEmissionShippingPackageDtoType[];
  receiver: ShippingReceiverType;
  refund: ShippingOriginDestinyType;
  save_frequent_client: boolean;
  save_frequent_origin: boolean;
  save_frequent_package: boolean;
  save_refund_address: boolean;
};

export type BillingType = 'INVOICE' | 'BILL';

export type ShippingStoreType = {
  destiny: ShippingOriginDestinyType;
  frequent_alias_client?: string;
  frequent_alias_package?: string;
  package: ShippingPackageType[];
  receiver: ShippingReceiverType;
  save_frequent_client: boolean;
  save_frequent_package: boolean;
  save_refund_address: boolean;
};

export type EmissionStoreType = {
  billingType: BillingType;
  discount: number;
  emitter: ShippingEmitterType;
  origin: ShippingOriginDestinyType;
  promotion_code: string;
  promotion_id: string;
  refund: ShippingOriginDestinyType;
  save_frequent_origin: boolean;
  shipping: Array<ShippingStoreType>;
  shipping_price: number;
  tax: number;
  terms_and_conditions_accepted: boolean;
  terms_and_conditions_accepted_date?: string;
  total_price: number;
  warranty: number;
  withPromotion: boolean;
  emission_type: string;
};

export type EmissionStateType = {
  autoFilledFrequentOrigin: boolean;
  destinyView: number;
  emissionId: string;
  emitterAddressIsCollapsed: boolean;
  emitterDataIsCollapsed: boolean;
  errorStep1: boolean;
  errorStep2: boolean;
  exitModalIsOpen: boolean;
  frequentClientsModal: boolean;
  measureWidth: number;
  modalTermsIsOpen: boolean;
  promotionalCodeIsFree: boolean;
  multiSelectedTab: number;
  nextModalOpen: boolean;
  openIsInvalid: boolean;
  paymentMethod: Lowercase<PaymentMethod>;
  promotionalCodeResponse?: PromotionalCodeType;
  promotionalCodeIsFraction: boolean;
  receiverAddressIsCollapsed: boolean;
  serviceTypeIsCollapsed: boolean;
  shippingContentData: boolean;
  step: number;
};

export type EmissionDtoType = {
  billingType: BillingType;
  emitter: ShippingEmitterType;
  shipping: Array<ShippingDtoType>;
  shipping_price: number;
  tax: number;
  total_price: number;
  warranty: number;
};

export type CreateEmissionShippingEmitterType = {
  pyme_id: string;
  email: string;
  phone: string;
};

export type CreateEmissionDtoType = {
  billingType: BillingType;
  discount: number;
  emitter: CreateEmissionShippingEmitterType;
  promotion_code: string;
  promotion_id: string;
  shipping: Array<CreateEmissionShippingDtoType>;
  shipping_price: number;
  tax: number;
  terms_and_conditions_accepted: boolean;
  terms_and_conditions_accepted_date?: string;
  total_price: number;
  warranty: number;
  withPromotion: boolean;
  elabel?: string;
};

export type EmissionSummaryDtoType = {
  whoSend: {
    business_name: string;
    pickup: string;
  };
  destiny: {
    name: string;
    address: string;
    package: {
      size: ShippingSizeType;
      service: 'STANDARD' | 'NEXT DAY' | null;
    };
    shipping_value: {
      value: number;
      warrantyExtended: number;
      tax: number;
      total: number;
    };
    shipping_service: {
      codeDestination: string | null;
      codeOrigin: string | null;
      price: number;
      service: 'STANDARD' | 'NEXT DAY' | null;
      sla: number;
      tax: number;
      totalValue: number;
      weight: number;
      warrantyExtended: number;
    };
  }[];
};

export type CreateEmissionStateType = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
};

export type PaymentStateType = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
};

export type MassiveStoreType = {
  inputFile: File | null | undefined;
  inProgress: boolean;
  progress: number;
  packageDangerousAtom: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  shippingList: null | Array<NewShippingListAtomType>;
  table: MassiveResponseSuccess | null;
  processDetail: {
    process: number;
    error: number;
  };
};

export type MassiveShippingAddressDataType = {
  city: string;
  commune: ShippingCommuneType;
  complement: string | null;
  country: string;
  geolocation: ShippingGeolocationType;
  reference: string | null;
  region: ShippingRegionType;
  state: string;
  street: string;
  street_number: string;
};

export type ShippingResponseDestinyType = {
  address: MassiveShippingAddressDataType;
  agency_id: string | null;
  agency_name: string | null;
  isPickup: boolean;
};

export type NewShippingListAtomType = {
  receiver: ShippingReceiverType;
  destiny: ShippingResponseDestinyType;
  package: Array<{
    dangerous_merchandise: boolean;
    content: string;
    warranty: boolean;
    warranty_value: number;
    warranty_bill_number: string;
    package_sizes: ShippingPackageSizes;
    shipping_service: ShippingBxServiceType;
  }>;
};

export type EmissionErrorMessage = {
  message: string;
  path: string;
};

export type EmissionValidate = {
  errors?: EmissionErrorMessage[];
};
