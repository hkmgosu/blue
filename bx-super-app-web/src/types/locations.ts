export type GeolocationType = {
  latitude: number;
  longitude: number;
};
export type GoogleGeolocationType = {
  lat: number | undefined;
  lng: number | undefined;
};

export type LocationType = {
  reference?: string;
  country_name: string;
  state_name: string;
  city_name: string;
  city_id: string | null;
  neighborhood_name?: string | null;
  street_name: string;
  street_number: string;
  other_info?: string;
  zip_code: string | null;
  geolocation: GeolocationType;
};

export type FromToType = {
  from: string;
  to: string;
};

export type OpenHoursType = {
  monday: FromToType[] | null;
  tuesday: FromToType[] | null;
  wednesday: FromToType[] | null;
  thursday: FromToType[] | null;
  friday: FromToType[] | null;
  saturday: FromToType[] | null;
  sunday: FromToType[] | null;
  holidays: FromToType[] | null;
};

export type DimensionsType = {
  length: number;
  height: number;
  width: number;
  weight: number;
};

export type RegionType = {
  __v: number;
  _id: string;
  country: number;
  id: string;
  name: string;
  region_code: number;
  region_iso_3166: string;
  region_number: string;
};

export type CommuneType = {
  geolocation: GeolocationType;
  _id: string;
  code: string;
  name: string;
  PSES_CDG_ISO: string;
  region_code: number;
  postal_code: string;
  PRVC_CDG: string;
  region: string;
  base_post: string;
  zone: string;
  radio: string;
  base_name: string;
  id: string;
  location_code: string;
};

export type GeoSpatialType = {
  type: string;
};

export type AgencyType = {
  geospatial: GeoSpatialType;
  _id: string;
  commune_code: string;
  agency_id: string;
  agency_name: string;
  phone: string;
  location: LocationType;
  package_reception: boolean;
  open_hours: OpenHoursType;
  status: string;
  last_updated: string | null;
  volumetric_capacity: string | null;
  maximum_package_dimensions: DimensionsType;
  __v: number;
};

export type RegionAsOptionType = {
  _id: string;
  value: string;
  name: string;
  region_number: string;
  region_iso_3166: string;
  country: number;
  __v: number;
  id: string;
};

export type CommuneAsOptionType = {
  geolocation: GeolocationType;
  _id: string;
  code: string;
  name: string;
  PSES_CDG_ISO: string;
  region_code: number;
  postal_code: string;
  PRVC_CDG: string;
  region: string;
  base_post: string;
  zone: string;
  radio: string;
  base_name: string;
  id: string;
  value: string;
  location_code: string;
};
