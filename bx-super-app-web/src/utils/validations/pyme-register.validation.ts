import * as Yup from 'yup';
import { validateRut } from '@bx-design/validate-rut';

declare module 'yup' {
  export interface StringSchema {
    validCompanyRut(message?: string): StringSchema;
  }
}

Yup.addMethod(
  Yup.string,
  'validCompanyRut',
  function (this: Yup.StringSchema, message: string) {
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

export const pymeRegisterSchema = Yup.object().shape({
  social_reason: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'Debe contener mínimo 3 caracteres')
    .max(30),
  rut: Yup.string().validCompanyRut('El rut es incorrecto'),
});

export const pymeRutRegisterSchema = Yup.object().shape({
  rut: Yup.string().validCompanyRut('El rut es incorrecto'),
});
