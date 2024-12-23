import * as yup from 'yup';

export const newShippingDestinyInfoSchema = yup.object().shape({
  shipping: yup.array().of(
    yup.object().shape({
      receiver: yup.object().shape({
        name: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required(),
        phone: yup.string().required(),
        rut: yup.string().required(),
      }),
      destiny: yup.object().shape({
        isPickup: yup.boolean(),
        agency_id: yup
          .string()
          .when('isPickup', {
            is: true,
            then: yup.string().required(),
          })
          .nullable(),
        agency_name: yup
          .string()
          .when('isPickup', {
            is: true,
            then: yup.string().required(),
          })
          .nullable(),
        address: yup.object().shape({
          country: yup.string(),
          city: yup.string(),
          street: yup.string(),
          street_number: yup.string(),
          depto: yup.string(),
          office: yup.string(),
          complement: yup.string(),
          reference: yup.string(),
          geolocation: yup.object().shape({
            latitude: yup.number().required(),
            longitude: yup.number().required(),
          }),
          region: yup.object().shape({
            name: yup.string().required(),
            region_number: yup.string().required(),
            region_iso_3166: yup.string().required(),
            country: yup.number().required(),
          }),
          commune: yup.object().shape({
            base_name: yup.string().required(),
            name: yup.string().required(),
            code: yup.string().required(),
            base_post: yup.string().required(),
            zone: yup.string().required(),
          }),
        }),
      }),
      save_frequent_client: yup.boolean(),
      frequent_alias_client: yup.string(),
    })
  ),
});
