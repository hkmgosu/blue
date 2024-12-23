import { atom } from 'jotai';
import { cleanRut, formatRutOnlyScript } from '@bx-design/validate-rut';

import {
  newBusinessSchema,
  businessSocialReasonSchema,
  businessRutSchema,
} from 'utils/validations/business/new-business.validation';
import { validateSchema } from 'utils/validate-schema';
import {
  ColaboratorQuantityType,
  ShippingPackageContentType,
  ShippingQuantityType,
} from 'types/new-business';
import { CommuneType, RegionType } from 'types/locations';
import { getCommuneByCoordinate, getRegionByIso } from 'api/locations';
import { initialCommune, initialRegion } from 'atoms/pyme-billing-info';

export const newBusinessSocialReasonAtom = atom('');

export const newBusinessSocialReasonIsValidAtom = atom((get) => {
  const socialReason = get(newBusinessSocialReasonAtom);
  return validateSchema(businessSocialReasonSchema, {
    social_reason: socialReason,
  });
});

export const newBusinessBillingAddressAtom = atom('');
export const newBusinessBillingAddressNumberAtom = atom('');
export const newBusinessBillingAddressCityAtom = atom('');
export const newBusinessBillingDeptoAtom = atom('');
export const newBusinessBillingOfficeAtom = atom('');
export const newBusinessBillingPhoneAtom = atom('');
export const newBusinessBillingEmailAtom = atom('');
export const newBusinessAddressGeoLocationAtom = atom({
  latitude: 0,
  longitude: 0,
});
export const newBusinessGoogleDataAtom = atom({
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
export const newBusinessRutAtom = atom('');

export const newBusinessRutIsValidAtom = atom((get) => {
  const rut = get(newBusinessRutAtom);
  return validateSchema(businessRutSchema, { rut });
});

export const newBusinessShippingQuantityAtom =
  atom<ShippingQuantityType>('INVALID');
export const newBusinessShippingWeightAverageAtom = atom('');
export const newBusinessShippingTypeAtom =
  atom<ShippingPackageContentType>('INVALID');

export const newBusinessShippingOtherTypeAtom = atom(false);
export const newBusinessBusinessColaboratorQuantityAtom =
  atom<ColaboratorQuantityType>('INVALID');

export const newBusinessBusinessOtherShippingContentExplainAtom = atom('');
export const neBusinessgetAddressInfoAtom = atom((get) => {
  const geolocation = get(newBusinessAddressGeoLocationAtom);
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
export const newBusinessValuesAtom = atom((get) => {
  const rut = get(newBusinessRutAtom);
  const cleaned = cleanRut(rut);
  const addressInfo = get(neBusinessgetAddressInfoAtom);
  return {
    social_reason: get(newBusinessSocialReasonAtom),
    rut: formatRutOnlyScript(cleaned),
    shipping_quantity: get(newBusinessShippingQuantityAtom),
    shipping_average: get(newBusinessShippingWeightAverageAtom),
    shipping_type: get(newBusinessShippingTypeAtom),
    collaborator_quantity: get(newBusinessBusinessColaboratorQuantityAtom),
    other_type: get(newBusinessBusinessOtherShippingContentExplainAtom),
    billing_address: get(newBusinessBillingAddressAtom),
    commune: {
      code: addressInfo?.getCommune.code,
      name: addressInfo?.getCommune.name,
      region: addressInfo?.getCommune.region,
      base_post: addressInfo?.getCommune.base_post,
      location_code: addressInfo?.getCommune.location_code,
    },
    region: {
      name: addressInfo?.getRegion.name,
      region_iso_3166: addressInfo?.getRegion.region_iso_3166,
      region_number: addressInfo?.getRegion.region_number,
    },
    city_name: get(newBusinessBillingAddressCityAtom),
    address_number: get(newBusinessBillingAddressNumberAtom),
    billing_depto: get(newBusinessBillingDeptoAtom),
    billing_office: get(newBusinessBillingOfficeAtom),
    billing_phone: get(newBusinessBillingPhoneAtom),
    billing_email: get(newBusinessBillingEmailAtom),
  };
});

export const newBusinessValuesIsValidAtom = atom((get) => {
  const values = get(newBusinessValuesAtom);

  return newBusinessSchema.isValid({ ...values });
});

export const newBusinessIsLoadingAtom = atom(false);

export const newBusinessIsErrorAtom = atom(false);

export const newBusinessErrorAtom = atom<string | null>(null);

export const newBusinessIsSuccessAtom = atom(false);
