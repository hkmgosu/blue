import {
  ShippingRegionType,
  ShippingServiceType,
  ShippingCommuneType,
  ShippingGeolocationType,
} from 'emission-lib/types';
import { massive } from 'dictionary';

export type MassiveModalMessages = keyof typeof massive.modal;

export type MassiveCatch = { message: MassiveModalMessages };

export interface MassiveTableColumns {
  price: number;
  name: string;
  lastName: string;
  phone: string;
  taxpayerId: string;
  email: string;
  isPickup: boolean;
  region: string;
  commune: string;
  address: string;
  addressNumber: string;
  apartmentOffice: string;
  referenceHelp: string;
  descriptionContent: string;
  valueContent: number;
  warranty: boolean;
  invoiceNumber: string;
  size: string;
}

export type MassiveCell<P, V> = {
  property: P;
  value: V;
  error: boolean;
};

export type MassiveFields = {
  [prop in keyof MassiveTableColumns]: MassiveCell<
    prop,
    MassiveTableColumns[prop]
  >;
}[keyof MassiveTableColumns];

export type TypeMassiveColumn<T extends keyof MassiveTableColumns> = {
  [I in T]: MassiveTableColumns[I];
}[T];

export type MassiveRowObject = {
  [I in keyof MassiveTableColumns]: MassiveCell<I, MassiveTableColumns[I]>;
};

export type MassiveTypesColumns<Internal> = {
  [I in keyof MassiveTableColumns]?: (
    data: MassiveRowObject & Internal,
    value: { value: MassiveTableColumns[I]; error: boolean }
  ) => any;
} & {
  [I in keyof Internal]?: (
    data: MassiveRowObject & Internal,
    value: Internal[I]
  ) => any;
} & {
  default(
    data: MassiveRowObject & Internal,
    value: { value: any; error: boolean },
    property: string
  ): any;
};

export interface MassiveUnknownData {
  [index: string]: any;
}

export interface MassiveResponseErrorUpload {
  error?: number;
}

export interface MassiveMetaData {
  city: string;
  street: string;
  streetNumber: string;
  region: ShippingRegionType;
  commune: ShippingCommuneType;
  geolocation: ShippingGeolocationType;
  shippingService: ShippingServiceType;
  tax: number;
  warranty: boolean;
  warrantyExtended: number;
  warrantyValue: number;
  warrantyBillNumber: string;
}

export interface MassiveField {
  row: number;
  error: boolean;
  metadata: MassiveMetaData;
  fields: MassiveFields[];
}

export interface MassiveResponseSuccess {
  status: boolean;
  allRecords: number;
  successRecords: number;
  errorRecords: number;
  data: MassiveField[];
}
