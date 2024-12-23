import * as yup from 'yup';

export const emitterSchema = yup.object().shape({
  emitter: yup.object().shape({
    pyme_id: yup.string().required(),
    pyme_name: yup.string().required(),
    phone: yup
      .string()
      .required()
      .matches(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/),
    email: yup.string().required().email(),
  }),
  refund: yup.object().shape({
    isPickup: yup.boolean(),
    agency_id: yup.string().nullable(),
    agency_name: yup.string().nullable(),
    address: yup.object().shape({
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      street_number: yup.string().required(),
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
        location_code: yup.string().required(),
      }),
    }),
  }),
  origin: yup.object().shape({
    isPickup: yup.boolean().required(),
    agency_id: yup.string().required(),
    agency_name: yup.string().required(),
    address: yup.object().shape({
      country_name: yup.string().required(),
      city_name: yup.string().required(),
      street: yup.string().required(),
      street_number: yup.string().required(),
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
        location_code: yup.string().required(),
      }),
    }),
  }),
});

export const emitterPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('El teléfono móvil es requerido')
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
      'Formato de número incorrecto ej: +56981234567 o 981234567'
    ),
});

export const emitterEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Correo no válido'),
});

export const destinyNameSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
});

export const destinyLastNameSchema = yup.object().shape({
  lastName: yup.string().required('El apellido es requerido'),
});

export const destinyEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Correo no válido'),
});

export const destinyPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('El teléfono móvil es requerido')
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
      'Formato de número incorrecto ej: +56981234567 o 981234567'
    ),
});

export const warrantyValueSchema = yup.object().shape({
  package_value: yup
    .string()
    .matches(/^\d{0,7}$/g, 'Solo se aceptan números')
    .required(),
});
