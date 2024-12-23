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

export const singleShippingStatusSchema = yup.object().shape({
  receiver: yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup
      .string()
      .required()
      .matches(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/),
    rut: yup.string().validCompanyRut('El rut es incorrecto').required(),
  }),
  destiny: yup.object().shape({
    isPickup: yup.boolean(),
    agency_id: yup.string().nullable(),
    agency_name: yup.string().nullable(),
    address: yup.object().shape({
      country: yup.string(),
      city: yup.string(),
      street: yup.string(),
      street_number: yup.string(),
      complement: yup.string().nullable(),
      reference: yup.string().nullable(),
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
  package: yup.object().shape({
    dangerous_merchandise: yup.boolean().isTrue(),
    content: yup.string(),
    warranty: yup.boolean(),
    warranty_value: yup.number().required().min(1),
    warranty_bill_number: yup.string().when('warranty', {
      is: true,
      then: yup
        .string()
        .matches(/^[a-zA-Z0-9]+$/)
        .required('Verifica que esté todo correcto'),
    }),
    warranty_extended: yup.number(),
    size: yup.mixed().oneOf(['XS', 'S', 'M', 'L']).required(),
    package_sizes: yup.object().shape({
      weight: yup.number().required().max(16),
      width: yup.number().required().max(60),
      height: yup.number().required().max(60),
      length: yup.number().required().max(60),
      volumetricWeight: yup.number().max(16),
    }),
    shipping_service: yup.object().shape({
      codeOrigin: yup.string().required().min(3),
      codeDestination: yup.string().required().min(3),
      price: yup.number().required(),
      weight: yup.number().required(),
      service: yup.mixed().oneOf(['STANDARD', 'NEXT DAY']).required(),
      sla: yup.number().required(),
    }),
    total_value: yup.number().required(),
    tax: yup.number().required(),
  }),
  save_frequent_package: yup.boolean(),
  frequent_alias_package: yup.string(),
});
