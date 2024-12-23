import * as yup from 'yup';

export const emitterSchema = yup.object().shape({
  emitter: yup.object().shape({
    email: yup
      .string()
      .required('Correo Electrónico: El correo electrónico es requerido')
      .email('Correo Electrónico: Formato de correo electrónico incorrecto'),
    pyme_id: yup.string().required(),
    pyme_name: yup.string().required(),
    phone: yup
      .string()
      .required('Teléfono: El teléfono es requerido')
      .matches(
        /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
        'Teléfono: Formato de número incorrecto ej: +56981234567 o 981234567'
      ),
  }),
  refund: yup.object().shape({
    address: yup.object().shape({
      city: yup
        .string()
        .required('Remitente: La dirección de remitente es requerida'),
      commune: yup.object().shape({
        base_name: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        base_post: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        code: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        location_code: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        name: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        zone: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
      }),
      complement: yup.string(),
      country: yup
        .string()
        .required('Remitente: La dirección de remitente es requerida'),
      depto: yup.string(),
      geolocation: yup.object().shape({
        latitude: yup
          .number()
          .required('Remitente: La dirección de remitente es requerida'),
        longitude: yup
          .number()
          .required('Remitente: La dirección de remitente es requerida'),
      }),
      office: yup.string(),
      reference: yup.string(),
      region: yup.object().shape({
        country: yup
          .number()
          .required('Remitente: La dirección de remitente es requerida'),
        name: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        region_iso_3166: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
        region_number: yup
          .string()
          .required('Remitente: La dirección de remitente es requerida'),
      }),
      street: yup
        .string()
        .required('Remitente: La dirección de remitente es requerida'),
      street_number: yup
        .string()
        .required('Remitente: La dirección de remitente es requerida'),
    }),
    agency_id: yup.string().nullable(),
    agency_name: yup.string().nullable(),
    isPickup: yup.boolean().nullable(),
  }),
  origin: yup.object().shape({
    address: yup.object().shape({
      city: yup.string().required('Debe seleccionar un punto Blue Express'),
      commune: yup.object().shape({
        base_name: yup
          .string()
          .required('Debe seleccionar un punto Blue Express'),
        base_post: yup
          .string()
          .required('Debe seleccionar un punto Blue Express'),
        code: yup.string().required('Debe seleccionar un punto Blue Express'),
        location_code: yup
          .string()
          .required('Debe seleccionar un punto Blue Express'),
        name: yup.string().required('Debe seleccionar un punto Blue Express'),
        zone: yup.string().required('Debe seleccionar un punto Blue Express'),
      }),
      complement: yup.string(),
      country: yup.string().required('Debe seleccionar un punto Blue Express'),
      depto: yup.string(),
      geolocation: yup.object().shape({
        latitude: yup
          .number()
          .required('Debe seleccionar un punto Blue Express'),
        longitude: yup
          .number()
          .required('Debe seleccionar un punto Blue Express'),
      }),
      office: yup.string(),
      reference: yup.string(),
      region: yup.object().shape({
        country: yup
          .number()
          .required('Debe seleccionar un punto Blue Express'),
        name: yup.string().required('Debe seleccionar un punto Blue Express'),
        region_iso_3166: yup
          .string()
          .required('Debe seleccionar un punto Blue Express'),
        region_number: yup
          .string()
          .required('Debe seleccionar un punto Blue Express'),
      }),
      street: yup.string().required('Debe seleccionar un punto Blue Express'),
      street_number: yup
        .string()
        .required('Debe seleccionar un punto Blue Express'),
    }),
    agency_id: yup.string(),
    agency_name: yup.string(),
    isPickup: yup.boolean().nullable(),
  }),
});
