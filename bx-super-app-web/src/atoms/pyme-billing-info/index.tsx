import { atom } from 'jotai';
import { cleanRut, formatRutOnlyScript } from '@bx-design/validate-rut';

import { getCommuneByCoordinate, getRegionByIso } from 'api/locations';
import { CommuneType, RegionType } from 'types/locations';
import { queryClient } from '../../query-client';

import type { RegionSelectedType, CommuneSelectedType } from './types';
import { UserType } from 'types/auth';
import { pymeBillingInfoSchema } from 'utils/validations/pyme-form';

const userInfo = queryClient.getQueryData<UserType>('user');
const pyme = userInfo?.pymes.find(
  (_pyme) => _pyme.id === userInfo.default_pyme
);

export const pymeBillingAddressAtom = atom('');

export const isBillingEditableAtom = atom(
  pyme?.has_billing_information || false
);

export const rutAtom = atom(
  userInfo && userInfo?.pymes?.length > 0 && pyme?.billing_information
    ? `${pyme?.billing_information.rut}`
    : ''
);

export const googleAddressAtom = atom(
  userInfo && userInfo?.pymes?.length > 0 && pyme?.billing_information
    ? `${pyme?.billing_information.address} ${pyme?.billing_information.address_number}, ${pyme?.billing_information.city_name}`
    : ''
);

export const pymeBillingAddressOfficeAtom = atom(
  userInfo &&
    userInfo?.pymes?.length > 0 &&
    pyme?.billing_information &&
    pyme.billing_information.address_office
    ? `${pyme?.billing_information.address_office}`
    : ''
);

export const pymeBillingAddressDepartmentAtom = atom(
  userInfo &&
    userInfo?.pymes?.length > 0 &&
    pyme?.billing_information &&
    pyme.billing_information.department
    ? `${pyme?.billing_information.department}`
    : ''
);

export const googleDataAtom = atom({
  number: 0,
  street: '',
  city: '',
  county: '',
  country: '',
  state: '',
  address: '',
  location: {
    latitude: 0,
    longitude: 0,
  },
});

export const addressAtom = atom('');

export const addressNumberAtom = atom('');

export const addressGeoLocationAtom = atom({
  latitude: 0,
  longitude: 0,
});

export const regionAtom = atom<RegionSelectedType>({
  name: '',
  region_iso_3166: '',
  country: 0,
});

export const communeAtom = atom<CommuneSelectedType>({
  name: '',
  code: '',
  region: '',
  base_post: '',
  location_code: '',
});

export const initialCommune = {
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

export const initialRegion: RegionType = {
  _id: '',
  name: '',
  region_number: '',
  region_iso_3166: '',
  country: 0,
  region_code: 0,
  __v: 0,
  id: '',
};

export const postalCodeAtom = atom(
  userInfo && userInfo?.pymes?.length > 0 && pyme?.billing_information
    ? `${pyme?.billing_information.postal_code}`
    : ''
);

export const phoneAtom = atom(
  userInfo && userInfo?.pymes?.length > 0 && pyme?.billing_information
    ? `${pyme?.billing_information.phone}`
    : ''
);

export const emailAtom = atom(
  userInfo && userInfo?.pymes?.length > 0 && pyme?.billing_information
    ? `${pyme?.billing_information.email}`
    : ''
);

export const getAddressInfoAtom = atom((get) => {
  const geolocation = get(addressGeoLocationAtom);
  async function getAddressInfo(): Promise<
    | {
        getCommune: CommuneType;
        getRegion: RegionType;
      }
    | undefined
  > {
    try {
      const getCommune = await getCommuneByCoordinate(geolocation);
      if (getCommune) {
        const getRegion = await getRegionByIso(getCommune.region);
        if (getRegion) {
          return {
            getCommune,
            getRegion,
          };
        }
      }
    } catch (error) {
      return {
        getCommune: initialCommune,
        getRegion: initialRegion,
      };
    }
  }
  return getAddressInfo();
});

export const pymeFormYupValidationAtom = atom<boolean>(async (get) => {
  const rut = get(rutAtom);
  const phone = get(phoneAtom);
  const email = get(emailAtom);
  const address = get(googleAddressAtom);
  const values = {
    rut: rut,
    phone: phone,
    email: email,
    address,
  };

  return await pymeBillingInfoSchema.isValid({ ...values });
});

export const pymeFormModalAtom = atom(false);

export const pymeFormIsErrorAtom = atom(false);

export const pymeFormErrorAtom = atom('');

export const pymeFormIsLoadingAtom = atom(false);

export const pymeFormSubmit = atom((get) => {
  const rut = get(rutAtom);
  const postalCode = get(postalCodeAtom);
  const phone = get(phoneAtom);
  const email = get(emailAtom);
  const addressInfo = get(getAddressInfoAtom);
  const googleData = get(googleDataAtom);
  const address = get(googleAddressAtom);
  const address_office = get(pymeBillingAddressOfficeAtom);
  const department = get(pymeBillingAddressDepartmentAtom);

  if (addressInfo) {
    const newBillingInfo = {
      rut: formatRutOnlyScript(cleanRut(rut)),
      postal_code: postalCode,
      phone,
      email,
      commune: {
        code: addressInfo.getCommune.code,
        name: addressInfo.getCommune.name,
        region: addressInfo.getCommune.region,
        base_post: addressInfo.getCommune.base_post,
        location_code: addressInfo.getCommune.location_code,
      },
      addressData: address,
      googleAddressData: googleData.street,
      address: googleData.street,
      address_office,
      department,
      address_number: googleData.number,
      city_name: googleData.city,
      region: {
        name: addressInfo.getRegion.name,
        region_iso_3166: addressInfo.getRegion.region_iso_3166,
        region_number: addressInfo.getRegion.region_number,
      },
    };
    return newBillingInfo;
  }
  return {
    rut: formatRutOnlyScript(cleanRut(rut)),
    postal_code: postalCode,
    phone,
    email,
    commune: {
      code: '',
      name: '',
      region: '',
      base_post: '',
      location_code: '',
    },
    googleAddressData: googleData.street,
    addressData: address,
    address: '',
    address_office: '',
    department: '',
    address_number: '',
    city_name: '',
    region: {
      name: '',
      region_iso_3166: '',
      region_number: '',
    },
  };
});
