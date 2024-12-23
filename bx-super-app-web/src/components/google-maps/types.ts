export type GoogleAddressComponentValue = {
  country: string;
  county: string;
  city: string;
  commune: string;
  state: string;
  number: number;
  street: string;
};

export type GoogleAddressType = {
  address: string;
};

export type GoogleLocation = {
  location: {
    latitude: number;
    longitude: number;
  };
};

export type GoogleGeocodingAdapterType = GoogleAddressType &
  GoogleLocation &
  GoogleAddressComponentValue;

export type AdapterGeocodingWithInputValueType = GoogleGeocodingAdapterType & {
  inputAddress: string;
};

export type MarkerType = {
  lat: number;
  lng: number;
  id?: string;
  onClickWithGeocode?: (address: GoogleGeocodingAdapterType | null) => void;
  onClick?: () => void;
  title?: string;
};
