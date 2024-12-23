import * as yup from 'yup';

export const priceQuoteSchema = yup.object().shape({
  pyme_id: yup.string(),
  pyme_name: yup.string(),
  originRegion: yup.object().shape({
    name: yup.string().required(),
    region_number: yup.string().required(),
    region_iso_3166: yup.string().required(),
    country: yup.number().required(),
  }),
  originCommune: yup.object().shape({
    base_name: yup.string().required(),
    name: yup.string().required(),
    code: yup.string().required(),
    base_post: yup.string().required(),
    zone: yup.string().required(),
  }),
  destinyRegion: yup.object().shape({
    name: yup.string().required(),
    region_number: yup.string().required(),
    region_iso_3166: yup.string().required(),
    country: yup.number().required(),
  }),
  destinyCommune: yup.object().shape({
    base_name: yup.string().required(),
    name: yup.string().required(),
    code: yup.string().required(),
    base_post: yup.string().required(),
    zone: yup.string().required(),
  }),
  size: yup.mixed().oneOf(['XS', 'S', 'M', 'L']).required(),
  sizes: yup.object().shape({
    length: yup.number().required().max(60),
    width: yup.number().required().max(60),
    height: yup.number().required().max(60),
    weight: yup.number().required().max(16),
  }),
  bxShippingService: yup.mixed().oneOf(['STANDARD', 'NEXT DAY']).required(),
  volumetricWeight: yup.bool().oneOf([false]).required(),
});
