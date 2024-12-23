import * as Yup from 'yup';
import i18n from 'i18next';

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

export const joinToBusinessSchema = Yup.object().shape({
  social_reason: Yup.string().required().min(3).max(30).required(),
});

export const joinToBusinessRutSchema = Yup.object().shape({
  rut: Yup.string().validCompanyRut(i18n.t('new_business.form.errors.rut')),
});
