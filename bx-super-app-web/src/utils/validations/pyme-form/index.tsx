import * as yup from 'yup';

import { validateRut } from '@bx-design/validate-rut';

declare module 'yup' {
  export interface StringSchema {
    validRut(message?: string): StringSchema;
  }
}

yup.addMethod(
  yup.string,
  'validRut',
  function (this: yup.StringSchema, message: string) {
    return this.test('rut', message, (value) => {
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

export const pymeRut = yup.object().shape({
  rut: yup
    .string()
    .validRut('El rut es incorrecto')
    .required('Este campo es requerido'),
});

export const pymeAddress = yup.object().shape({
  address: yup.string().required('Este campo es requerido'),
});

export const pymeAddressNumber = yup.object().shape({
  address_number: yup.string().required('Este campo es requerido'),
});

export const pymeRegion = yup.object().shape({
  name: yup.string().required('Este campo es requerido'),
  region_iso_3166: yup.string().required('Este campo es requerido'),
  country: yup.number().required('Este campo es requerido'),
});

export const pymeCommune = yup.object().shape({
  base_name: yup.string().required('Este campo es requerido'),
  name: yup.string().required('Este campo es requerido'),
  code: yup.string().required('Este campo es requerido'),
  region: yup.string().required('Este campo es requerido'),
});

export const pymePostalCode = yup.object().shape({
  postal_code: yup.string(),
});

export const pymePhone = yup.object().shape({
  phone: yup
    .string()
    .required('El teléfono móvil es requerido')
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
      'Formato de número incorrecto ej: +56981234567 o 981234567'
    ),
});

export const pymeEmail = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un email')
    .required('Este campo es requerido'),
});

export const pymeBillingInfoSchema = yup.object().shape({
  rut: yup
    .string()
    .validRut('El rut es incorrecto')
    .required('Este campo es requerido'),
  phone: yup
    .string()
    .required('El teléfono móvil es requerido')
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
      'Formato de número incorrecto ej: +56981234567 o 981234567'
    ),
  email: yup
    .string()
    .email('Debe ser un email')
    .required('Este campo es requerido'),
  address: yup.string().required(),
});
