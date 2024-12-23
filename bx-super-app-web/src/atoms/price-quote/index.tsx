import { atom } from 'jotai';

import type {
  PriceQuoteRegionType,
  PriceQuoteCommuneType,
  PriceQuoteSizeType,
  PriceQuoteLenghtType,
  PriceQuoteWidthType,
  PriceQuoteHeightType,
  PriceQuoteWeightType,
  PriceQuoteShippingBxServiceType,
  PriceQuoteSummaryType,
} from './types';
import type { UseReturnQuoteType } from 'types/pricing';
import { priceQuoteSchema } from 'utils/validations/price-quote';

export const businessAtom = atom({
  pyme_id: '',
  pyme_name: '',
});

export const originRegionAtom = atom<PriceQuoteRegionType>({
  name: '',
  region_number: '',
  region_iso_3166: '',
  country: 0,
});

export const originCommuneAtom = atom<PriceQuoteCommuneType>({
  base_name: '',
  name: '',
  code: '',
  base_post: '',
  zone: '',
  location_code: '',
});

export const destinyRegionAtom = atom<PriceQuoteRegionType>({
  name: '',
  region_number: '',
  region_iso_3166: '',
  country: 0,
});

export const destinyCommuneAtom = atom<PriceQuoteCommuneType>({
  base_name: '',
  name: '',
  code: '',
  base_post: '',
  zone: '',
  location_code: '',
});

export const toggleCollapseSenderAtom = atom<boolean>(true);
export const toggleCollapseOriginAtom = atom<boolean>(true);
export const toggleCollapseDestinyAtom = atom<boolean>(true);
export const toggleCollapseMeasuresAtom = atom<boolean>(true);
export const toggleCollapseServiceAtom = atom<boolean>(true);
export const showLengthErrorAtom = atom<boolean>(false);
export const showWidthErrorAtom = atom<boolean>(false);
export const showHeightErrorAtom = atom<boolean>(false);
export const showWeightErrorAtom = atom<boolean>(false);
export const toggleCollapseAtom = atom<boolean>(false);

export const showEdgeErrorToastAtom = atom<boolean>((get) => {
  const height = Number(get(sizeHeightAtom));
  const length = Number(get(sizeLengthAtom));
  const width = Number(get(sizeWidthAtom));
  if (height > 60 || length > 60 || width > 60) {
    return true;
  }
  return false;
});

export const showWeightErrorToastAtom = atom<boolean>((get) => {
  const weight = Number(get(sizeWeightAtom));
  if (weight > 16) {
    return true;
  }
  return false;
});
export const sizePackageAtom = atom<PriceQuoteSizeType>('none');

export const sizeLengthAtom = atom<PriceQuoteLenghtType>(0);

export const sizeWidthAtom = atom<PriceQuoteWidthType>(0);

export const sizeHeightAtom = atom<PriceQuoteHeightType>(0);

export const sizeWeightAtom = atom<PriceQuoteWeightType>(0);

export const bxShippingServiceAtom =
  atom<PriceQuoteShippingBxServiceType>(null);

export const priceQuoteVolumetricErrorAtom = atom((get) => {
  const height = Number(get(sizeHeightAtom));
  const length = Number(get(sizeLengthAtom));
  const width = Number(get(sizeWidthAtom));
  const volumetricWeight: number = (height * length * width) / 4000;
  if (volumetricWeight > 16) {
    return true;
  }
  return false;
});

export const pricingDtoAtom = atom((get) => {
  const codeOrigin = get(originCommuneAtom).location_code;
  const codeDestination = get(destinyCommuneAtom).location_code;
  const broad = Number(get(sizeWidthAtom));
  const high = Number(get(sizeHeightAtom));
  const length = Number(get(sizeLengthAtom));
  const weight = Number(get(sizeWeightAtom));
  const volumetricError = get(priceQuoteVolumetricErrorAtom);
  if (!volumetricError) {
    const pricingDto = {
      codeOrigin,
      codeDestination,
      broad,
      high,
      length,
      weight,
    };

    return pricingDto;
  }
  return {
    codeOrigin,
    codeDestination,
    broad: 0,
    high: 0,
    length: 0,
    weight: 0,
  };
});

export const priceAtom = atom<UseReturnQuoteType[]>([
  {
    tax: 0,
    totalValue: 0,
    codeOrigin: null,
    codeDestination: null,
    price: 0,
    weight: 0,
    service: 'NEXT DAY',
    sla: 1,
  },
  {
    tax: 0,
    totalValue: 0,
    codeOrigin: null,
    codeDestination: null,
    price: 0,
    weight: 0,
    service: 'STANDARD',
    sla: 2,
  },
]);

export const submitAtom = atom<PriceQuoteSummaryType>((get) => {
  const businessName = get(businessAtom).pyme_name;
  const bxShippingService = get(bxShippingServiceAtom);
  const originCommune = get(originCommuneAtom).name;
  const destinyCommune = get(destinyCommuneAtom).name;
  const price = get(priceAtom);
  const size = get(sizePackageAtom);
  const width = Number(get(sizeWidthAtom));
  const height = Number(get(sizeHeightAtom));
  const length = Number(get(sizeLengthAtom));
  const weight = get(sizeWeightAtom);
  const originCommuneData = get(originCommuneAtom);
  const originRegionData = get(originRegionAtom);
  const destinyCommuneData = get(destinyCommuneAtom);
  const destinyRegionData = get(destinyRegionAtom);

  return {
    businessName,
    originCommune,
    destinyCommune,
    size,
    sizes: {
      width,
      height,
      length,
      weight,
    },
    price: price.find((pri) => pri.service === bxShippingService),
    originCommuneData,
    originRegionData,
    destinyCommuneData,
    destinyRegionData,
    bxShippingService,
  };
});

export const isValidAtom = atom<boolean>(async (get) => {
  const business = get(businessAtom);
  const originRegion = get(originRegionAtom);
  const originCommune = get(originCommuneAtom);
  const destinyRegion = get(destinyRegionAtom);
  const destinyCommune = get(destinyCommuneAtom);
  const size = get(sizePackageAtom);
  const width = get(sizeWidthAtom);
  const height = get(sizeHeightAtom);
  const length = get(sizeLengthAtom);
  const weight = Number(get(sizeWeightAtom));
  const bxShippingService = get(bxShippingServiceAtom);
  const volumetricWeight = get(priceQuoteVolumetricErrorAtom);

  return await priceQuoteSchema.isValid({
    ...business,
    originRegion,
    originCommune,
    destinyRegion,
    destinyCommune,
    size,
    sizes: {
      width,
      height,
      length,
      weight,
    },
    bxShippingService,
    volumetricWeight,
  });
});
