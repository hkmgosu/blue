import * as Yup from 'yup';
import { validateRut } from '@bx-design/validate-rut';

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
