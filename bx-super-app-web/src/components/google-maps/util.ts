import type {
  GoogleGeocodingAdapterType,
  GoogleAddressComponentValue,
} from './types';

export const adapterGeocodingResponse = (
  googleAddressResponse: google.maps.GeocoderResult
): GoogleGeocodingAdapterType | null => {
  return {
    address: googleAddressResponse.formatted_address,
    location: {
      latitude: googleAddressResponse.geometry.location.lat(),
      longitude: googleAddressResponse.geometry.location.lng(),
    },
    ...googleAddressResponse.address_components.reduce(
      (acum: GoogleAddressComponentValue, addressComponent) => {
        if (addressComponent.types.includes('street_number')) {
          return { ...acum, number: Number(addressComponent.long_name) };
        }
        if (addressComponent.types.includes('route')) {
          return { ...acum, street: addressComponent.long_name };
        }
        if (addressComponent.types.includes('administrative_area_level_1')) {
          return { ...acum, state: addressComponent.long_name };
        }
        if (addressComponent.types.includes('administrative_area_level_2')) {
          return { ...acum, city: addressComponent.long_name };
        }
        if (addressComponent.types.includes('administrative_area_level_3')) {
          return { ...acum, commune: addressComponent.long_name };
        }
        if (addressComponent.types.includes('country')) {
          return { ...acum, country: addressComponent.long_name };
        }

        return acum;
      },
      {
        city: '',
        country: '',
        county: '',
        commune: '',
        number: -1,
        state: '',
        street: '',
      } as GoogleAddressComponentValue
    ),
  };
};

type GeocodeByCordsType = {
  latitude: number;
  longitude: number;
};

export const geocodeByCords = (
  location: GeocodeByCordsType
): Promise<GoogleGeocodingAdapterType | null> =>
  new Promise((resolve) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
      },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          return resolve(null);
        }

        const geocoderParsed = adapterGeocodingResponse(results[0]);
        return resolve(geocoderParsed);
      }
    );
  });
