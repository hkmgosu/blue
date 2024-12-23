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

export const newBusinessSchema = Yup.object().shape({
  social_reason: Yup.string().required().min(3).max(100).required(),
  rut: Yup.string().validCompanyRut().required(),
  billing_phone: Yup.string().required(),
  billing_email: Yup.string().email().required(),
  billing_address: Yup.string().required(),
  shipping_quantity: Yup.string()
    .oneOf(
      [
        'BEGINNER',
        '10_TO_49',
        '50_TO_100',
        '101_TO_300',
        '301_TO_500',
        '501_TO_1000',
        '1001_TO_5000',
        'MORE_5000',
      ],
      'Debe seleccionar una opcion'
    )
    .required(),
  collaborator_quantity: Yup.string()
    .oneOf(
      ['0_TO_10', '11_TO_50', '51_TO_400', '401_TO_1000', 'MORE_1000'],
      'Debe seleccionar una opcion'
    )
    .required(),
});

export const businessSocialReasonSchema = Yup.object().shape({
  social_reason: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'Debe contener mínimo 3 caracteres')
    .max(100, 'El máximo de caracteres es de 100')
    .required(i18n.t('new_business.form.errors.social_reason')),
});

export const businessRutSchema = Yup.object().shape({
  rut: Yup.string().validCompanyRut(i18n.t('new_business.form.errors.rut')),
});
