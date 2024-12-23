import { PymeType } from './auth';
import type { RegionType, CommuneType, AgencyType } from 'types/locations';

export type CollaboratorType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  accepted_date: Date;
};

export type ServiceType = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
  iva?: number;
  warranty?: number;
  total?: number;
};

export type ShippingServicesType = {
  services: ServiceType[] | ServiceType;
  id?: string;
  name?: string;
  price?: number;
  duration?: string;
  description?: string;
  icon?: string;
};

export type StateType = {
  selectedOriginRegion: RegionType | null;
  selectedOriginCommune: CommuneType | null;
  selectedOriginAgency: AgencyType | null;
  selectedDestinyRegion: RegionType | null;
  selectedDestinyCommune: CommuneType | null;
  regions: RegionType[] | null;
  originCommunes: CommuneType[] | null;
  destinyCommunes: CommuneType[] | null;
  selectedPyme: PymeType | null;
  selectedSize: SizeType | null | undefined;
  packagesNumber: number;
  sizes: SizeType[];
  shippingServices: ServiceType[] | null;
  selectedService: ServiceType | null;
  trustInfoOpen: boolean;
  distance: number | null;
  showAgencies: boolean;
  originCommuneAgencies: AgencyType[] | null;
  agenciesLoading: boolean;
  price: number | null;
  priceLoading: boolean;
  total: number;
};

export type SelectedOriginLocationType = AgencyType & CommuneType;

export type ExtraType = {
  long: number;
  height: number;
  width: number;
  weight: number;
};

export type SendType = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  icon: string;
  extra: ExtraType;
};

export type SizeType = {
  extra?: {
    long: number;
    height: number;
    width: number;
    weight: number;
  };
  id?: number;
  name?: string | null;
  label?: string;
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

export type ShippingServicesResponseType = {
  services: ServiceType[];
};
