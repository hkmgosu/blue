import { queryClient } from '../query-client';
import type { UserType } from 'types/auth';
import type {
  AgencyType,
  GeolocationType,
  CommuneType,
  RegionType,
} from 'types/locations';
import { getCommuneByCoordinate } from 'api/locations';
import { FrequentOriginResponseType } from 'types/frequent-origin';
import { atom } from 'jotai';
import {
  EmissionStateType,
  EmissionStoreType,
  ShippingStoreType,
} from './types';

export const userInfo = queryClient.getQueryData<UserType>('user');

export const initialGoogleAddress = {
  geolocation: {
    latitude: 0,
    longitude: 0,
  },
  state: '',
  city: '',
  street: '',
  street_number: '',
  country: '',
};

export const initialCacheCommune = {
  geolocation: {
    latitude: 0,
    longitude: 0,
  },
  _id: '',
  code: '',
  name: '',
  PSES_CDG_ISO: '',
  region_code: 0,
  postal_code: '',
  PRVC_CDG: '',
  region: '',
  base_post: '',
  zone: '',
  radio: '',
  base_name: '',
  id: '',
  location_code: '',
};

export const initialCommune = {
  name: '',
  code: '',
  base_post: '',
  base_name: '',
  zone: '',
  location_code: '',
};

export const initialRegion = {
  name: '',
  region_number: '',
  region_iso_3166: '',
  country: 0,
};

export const initialGeolocation = {
  geolocation: {
    latitude: -33.4334882,
    longitude: -70.797831917,
  },
};

export const initialPickupAgency = {
  agency_id: '',
  agency_name: '',
  country_name: '',
  state_name: '',
  city_name: '',
  street_name: '',
  street_number: '',
  geolocation: {
    latitude: 0,
    longitude: 0,
  },
};

export const fakePricing = [
  {
    warrantyValue: 0,
    tax: 0,
    totalValue: 0,
    codeOrigin: null,
    codeDestination: null,
    price: 0,
    weight: 0,
    service: 'STANDARD',
    sla: 0,
  },
];

export const locationsAgencies =
  queryClient.getQueryData<AgencyType[]>('locations-agencies');

export const locationsRegions =
  queryClient.getQueryData<RegionType[]>('locations-regions');

export const locationsCommunes =
  queryClient.getQueryData<CommuneType[]>('locations-communes');

export async function getCommuneByCoordinateUtil(
  req: GeolocationType
): Promise<CommuneType> {
  try {
    const response = await getCommuneByCoordinate(req);
    return response;
  } catch (err) {
    return initialCacheCommune;
  }
}

export const frequentOriginCache =
  queryClient.getQueryData<FrequentOriginResponseType>(
    'frequent-origin-by-pyme-id'
  );

export const newShippingMultiSelectedTabAtom = atom<number>(1);

export const initialShippingState: ShippingStoreType = {
  destiny: {
    address: {
      city: '',
      commune: {
        base_name: '',
        base_post: '',
        code: '',
        location_code: '',
        name: '',
        zone: '',
      },
      complement: '',
      country: '',
      depto: '',
      geolocation: {
        latitude: -33.4334882,
        longitude: -70.797831917,
      },
      office: '',
      reference: '',
      region: {
        country: 0,
        name: '',
        region_iso_3166: '',
        region_number: '',
      },
      street: '',
      street_number: '',
    },
    agency_id: '',
    agency_name: '',
    isPickup: undefined,
  },
  frequent_alias_client: undefined,
  frequent_alias_package: undefined,
  package: [
    {
      content: '',
      dangerous_merchandise: false,
      package_sizes: {
        weight: 0,
        width: 0,
        height: 0,
        length: 0,
      },
      shipping_service: {
        codeDestination: null,
        codeOrigin: null,
        price: 0,
        service: 'STANDARD',
        sla: 0,
        weight: 0,
      },
      size: 'none',
      tax: 0,
      total_value: 0,
      warranty: false,
      warranty_bill_number: '',
      warranty_extended: 0,
      warranty_value: 0,
    },
  ],
  receiver: {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    rut: '',
  },
  save_frequent_client: false,
  save_frequent_package: false,
  save_refund_address: false,
};

export const initialEmission: EmissionStoreType = {
  billingType: 'BILL',
  discount: 0,
  emitter: {
    pyme_id: '',
    pyme_name: '',
    email: '',
    phone: '',
  },
  origin: {
    address: {
      city: '',
      commune: {
        base_name: '',
        base_post: '',
        code: '',
        location_code: '',
        name: '',
        zone: '',
      },
      complement: '',
      country: '',
      depto: '',
      geolocation: {
        latitude: -33.4334882,
        longitude: -70.797831917,
      },
      office: '',
      reference: '',
      region: {
        country: 0,
        name: '',
        region_iso_3166: '',
        region_number: '',
      },
      street: '',
      street_number: '',
    },
    agency_id: '',
    agency_name: '',
    isPickup: true,
  },
  promotion_code: '',
  promotion_id: '',
  refund: {
    address: {
      city: '',
      commune: {
        base_name: '',
        base_post: '',
        code: '',
        location_code: '',
        name: '',
        zone: '',
      },
      complement: '',
      country: '',
      depto: '',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      office: '',
      reference: '',
      region: {
        country: 0,
        name: '',
        region_iso_3166: '',
        region_number: '',
      },
      street: '',
      street_number: '',
    },
    agency_id: '',
    agency_name: '',
    isPickup: false,
  },
  save_frequent_origin: false,
  shipping: [
    {
      destiny: {
        address: {
          city: '',
          commune: {
            base_name: '',
            base_post: '',
            code: '',
            location_code: '',
            name: '',
            zone: '',
          },
          complement: '',
          country: '',
          depto: '',
          geolocation: {
            latitude: 0,
            longitude: 0,
          },
          office: '',
          reference: '',
          region: {
            country: 0,
            name: '',
            region_iso_3166: '',
            region_number: '',
          },
          street: '',
          street_number: '',
        },
        agency_id: '',
        agency_name: '',
        isPickup: undefined,
      },
      frequent_alias_client: undefined,
      frequent_alias_package: undefined,
      package: [
        {
          content: '',
          dangerous_merchandise: false,
          package_sizes: {
            weight: 0,
            width: 0,
            height: 0,
            length: 0,
          },
          shipping_service: {
            codeDestination: null,
            codeOrigin: null,
            price: 0,
            service: 'STANDARD',
            sla: 0,
            weight: 0,
          },
          size: 'none',
          tax: 0,
          total_value: 0,
          warranty: false,
          warranty_bill_number: '',
          warranty_extended: 0,
          warranty_value: 0,
        },
      ],
      receiver: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        rut: '',
      },
      save_frequent_client: false,
      save_frequent_package: false,
      save_refund_address: false,
    },
  ],
  shipping_price: 0,
  tax: 0,
  terms_and_conditions_accepted: false,
  terms_and_conditions_accepted_date: undefined,
  total_price: 0,
  warranty: 0,
  withPromotion: false,
  emission_type: '',
};

export const initialEmissionState: EmissionStateType = {
  autoFilledFrequentOrigin: false,
  destinyView: 1,
  emissionId: '',
  emitterAddressIsCollapsed: true,
  emitterDataIsCollapsed: true,
  errorStep1: false,
  errorStep2: false,
  exitModalIsOpen: false,
  frequentClientsModal: false,
  measureWidth: 0,
  modalTermsIsOpen: false,
  multiSelectedTab: 1,
  nextModalOpen: false,
  openIsInvalid: false,
  paymentMethod: 'webpay',
  promotionalCodeIsFraction: false,
  receiverAddressIsCollapsed: true,
  promotionalCodeIsFree: false,
  serviceTypeIsCollapsed: true,
  shippingContentData: true,
  step: 1,
};
