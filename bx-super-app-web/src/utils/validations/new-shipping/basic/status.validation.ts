import * as Yup from 'yup';

export const statusValidationSchema = Yup.object().shape({
  name: Yup.string().required().min(3),
  lastName: Yup.string().required().min(3),
  phone: Yup.string()
    .required()
    .matches(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/),
  email: Yup.string().required().email(),
  destiny: Yup.object().shape({
    isPickup: Yup.boolean(),
    pickup: Yup.object().shape({
      agency_id: Yup.string(),
      agency_name: Yup.string(),
      country_name: Yup.string(),
      state_name: Yup.string(),
      city_name: Yup.string(),
      street_name: Yup.string(),
      street_number: Yup.string(),
      geolocation: Yup.object().shape({
        latitude: Yup.number(),
        longitude: Yup.number(),
      }),
      region: Yup.object().shape({
        name: Yup.string(),
        region_number: Yup.string(),
        region_iso_3166: Yup.string(),
        country: Yup.number(),
      }),
      commune: Yup.object().shape({
        base_name: Yup.string().required(),
        name: Yup.string(),
        code: Yup.string(),
        region: Yup.string(),
        zone: Yup.string().required(),
      }),
    }),
    address: Yup.object({
      state: Yup.string(),
      city: Yup.string(),
      street: Yup.string(),
      street_number: Yup.string(),
      country: Yup.string(),
      complement: Yup.string(),
      reference: Yup.string(),
    }),
    save_frequent_client: Yup.boolean(),
    frequent_alias_client: Yup.string(),
  }),
  package: Yup.object()
    .shape({
      content: Yup.string().when('warranty', {
        is: true,
        then: Yup.string().required('Verifica que esté todo correcto'),
      }),
      dangerous_merchandise: Yup.boolean().isTrue(),
      warranty: Yup.boolean(),
      package_value: Yup.string().required('Verifica que esté todo correcto'),
      bill_number: Yup.string().when('warranty', {
        is: true,
        then: Yup.string()
          .required('Verifica que esté todo correcto')
          .matches(/^[a-zA-Z0-9]+$/),
      }),
    })
    .required(),
  shipping_value: Yup.object()
    .shape({
      size: Yup.string().required(),
      package_sizes: Yup.object()
        .shape({
          weight: Yup.string().required(),
          width: Yup.string().required(),
          height: Yup.string().required(),
          length: Yup.string().required(),
        })
        .required(),
      bx_shipping_service: Yup.mixed()
        .oneOf(['STANDARD', 'NEXT DAY'])
        .nullable(),
      value: Yup.number(),
      tax: Yup.number(),
      billing_type: Yup.string().required(),
    })
    .required(),
  save_frequent_package: Yup.boolean(),
  frequent_alias_package: Yup.string(),
});
