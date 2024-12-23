import type { GeolocationType, RegionType, CommuneType } from 'types/locations';
import type { ServiceType } from './appraisal';

export type ServicesAvailable = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
};

export type Size = {
  id: number;
  name: string;
  label: string;
  extra: {
    long: number;
    height: number;
    width: number;
    weight: number;
  };
};

export type ErrorMessage = {
  message: string;
  path: string[];
  type: string;
};

export type MassiveEmissions = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  comuna?: string;
  region?: string;
  pais?: string;
  garantia?: number;
  producto?: string;
  precio?: number;
  boleta?: string;
  largo?: number;
  alto?: number;
  ancho?: number;
  peso?: number;
  servicio?: number;
  addressResponse?: any;
  tamaño?: Size;
  servicesAvailable?: ServicesAvailable[];
  selectedService?: ServiceType;
  warranty?: number;
  distance?: number;
  total?: number;
  errorType?: string;
  errorMessage?: ErrorMessage[];
  'es pickup'?: 1 | 2 | null;
  region_iso_3166?: string;
  code?: string;
  id?: string;
};

export type Emitter = {
  pyme_id?: string;
  email: string;
  phone: string;
};

export type Pickup = {
  agency_id: string;
  agency_name: string;
  country_name: string;
  state_name: string;
  city_name: string;
  street_name: string;
  street_number: string;
  geolocation?: GeolocationType;
  region: RegionType;
  commune: CommuneType;
};

export type Address = {
  state: string;
  city: string;
  street: string;
  street_number: string;
  country: string;
  complement?: string;
  reference?: string;
};

export type Origin = {
  isPickup: boolean;
  pickup?: Pickup;
  address?: Address;
};

export type MassiveEmissionsResponse = {
  origin: Origin;
  emitter: Emitter;
  success: MassiveEmissions[];
  errors: MassiveEmissions[];
};

export type Receiver = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Destiny = {
  isPickup: boolean;
  pickup?: Pickup;
  address?: Address;
};

export type Package = {
  content: string;
  package_value: number;
  dangerous_merchandise: boolean;
  insurance: boolean;
};

export type PackageSizes = {
  weight: number;
  width: number;
  height: number;
  length: number;
};

export type ShippingValue = {
  size: string;
  package_sizes: PackageSizes;
  bx_shipping_service: number;
  value: number;
  tax: number;
  billingType: string;
};

export type Shipping = any;
