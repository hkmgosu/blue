import * as yup from 'yup';
import { validateRut } from '@bx-design/validate-rut';

declare module 'yup' {
  export interface StringSchema {
    validCompanyRut(message?: string): StringSchema;
  }
}

yup.addMethod(
  yup.string,
  'validCompanyRut',
  function (this: yup.StringSchema, message: string) {
    return this.test('companyRut', message, (value) => {
      if (!value) {
        return true;
      }
      if (value && value.length === 0) {
        return true;
      }
      if (value && value.length > 0) {
        return validateRut(value);
      }
      return false;
    });
  }
);

export const shippingDestinySchema = yup.object().shape({
  receiver: yup.object().shape({
    name: yup
      .string()
      .min(3, 'Nombre: El nombre tener como mínimo 3 caracteres')
      .required('Nombre: El nombre es requerido'),
    lastName: yup.string().required('Apellido: El apellido es requerido'),
    email: yup
      .string()
      .required('Correo Electrónico: El correo electrónico es requerido')
      .email('Correo Electrónico: Formato de correo electrónico incorrecto'),
    phone: yup
      .string()
      .required('Teléfono: El teléfono es requerido')
      .matches(
        /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
        'Teléfono: Formato de número incorrecto ej: +56981234567 o 981234567'
      ),
    rut: yup
      .string()
      .validCompanyRut('RUT: El rut es incorrecto')
      .required('RUT: El rut es requerido'),
  }),
  destiny: yup.object().shape({
    isPickup: yup.boolean(),
    agency_id: yup
      .string()
      .when('isPickup', {
        is: true,
        then: yup.string().required('Destino: El destino es requerido'),
      })
      .nullable(),
    agency_name: yup
      .string()
      .when('isPickup', {
        is: true,
        then: yup.string().required('Destino: El destino es requerido'),
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
        latitude: yup.number().required('Destino: El destino es requerido'),
        longitude: yup.number().required('Destino: El destino es requerido'),
      }),
      region: yup.object().shape({
        name: yup.string().required('Destino: El destino es requerido'),
        region_number: yup
          .string()
          .required('Destino: El destino es requerido'),
        region_iso_3166: yup
          .string()
          .required('Destino: El destino es requerido'),
        country: yup.number().required('Destino: El destino es requerido'),
      }),
      commune: yup.object().shape({
        base_name: yup.string().required('Destino: El destino es requerido'),
        name: yup.string().required('Destino: El destino es requerido'),
        code: yup.string().required('Destino: El destino es requerido'),
        base_post: yup.string().required('Destino: El destino es requerido'),
        zone: yup.string().required('Destino: El destino es requerido'),
      }),
    }),
  }),
  save_frequent_client: yup.boolean(),
  frequent_alias_client: yup.string(),
});
