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

export const receiverRutSchema = yup.object().shape({
  rut: yup.string().validRut('El rut es incorrecto'),
});
