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

export const emissionStatusSchema = yup.object().shape({
  billingType: yup.string(),
  emitter: yup
    .object()
    .shape({
      email: yup
        .string()
        .required('Correo Electrónico: El correo electrónico es requerido')
        .email('Correo Electrónico: Formato de correo electrónico incorrecto'),
      pyme_id: yup.string().required(),
      pyme_name: yup.string().required(),
      phone: yup
        .string()
        .required()
        .matches(
          /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
          'Teléfono: Formato de número incorrecto ej: +56981234567 o 981234567'
        ),
    })
    .required(),
  shipping: yup.array().of(
    yup.object().shape({
      destiny: yup.object().shape({
        address: yup.object().shape({
          city: yup.string(),
          commune: yup.object().shape({
            base_name: yup
              .string()
              .required('Destino: El destino es requerido'),
            name: yup.string().required('Destino: El destino es requerido'),
            code: yup.string().required('Destino: El destino es requerido'),
            base_post: yup
              .string()
              .required('Destino: El destino es requerido'),
            zone: yup.string().required('Destino: El destino es requerido'),
          }),
          complement: yup.string(),
          country: yup.string(),
          depto: yup.string(),
          geolocation: yup.object().shape({
            latitude: yup.number().required('Destino: El destino es requerido'),
            longitude: yup
              .number()
              .required('Destino: El destino es requerido'),
          }),
          office: yup.string(),
          reference: yup.string(),
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
          street: yup.string(),
          street_number: yup.string(),
        }),
        agency_id: yup.string().nullable(),
        agency_name: yup.string().nullable(),
        isPickup: yup.boolean(),
      }),
      frequent_alias_client: yup.string(),
      frequent_alias_package: yup.string(),
      origin: yup.object().shape({
        address: yup.object().shape({
          city: yup.string(),
          commune: yup.object().shape({
            base_name: yup.string().required('Origen: El origen es requerido'),
            name: yup.string().required('Origen: El origen es requerido'),
            code: yup.string().required('Origen: El origen es requerido'),
            base_post: yup.string().required('Origen: El origen es requerido'),
            zone: yup.string().required('Origen: El origen es requerido'),
          }),
          complement: yup.string(),
          country: yup.string(),
          depto: yup.string(),
          geolocation: yup.object().shape({
            latitude: yup.number().required('Origen: El origen es requerido'),
            longitude: yup.number().required('Origen: El origen es requerido'),
          }),
          office: yup.string(),
          reference: yup.string(),
          region: yup.object().shape({
            name: yup.string().required('Origen: El origen es requerido'),
            region_number: yup
              .string()
              .required('Origen: El origen es requerido'),
            region_iso_3166: yup
              .string()
              .required('Origen: El origen es requerido'),
            country: yup.number().required('Origen: El origen es requerido'),
          }),
          street: yup.string(),
          street_number: yup.string(),
        }),
        agency_id: yup.string().nullable(),
        agency_name: yup.string().nullable(),
        isPickup: yup.boolean(),
      }),
      package: yup.array().of(
        yup.object().shape({
          content: yup
            .string()
            .required('Contenido: El contenido del envío es requerido'),
          dangerous_merchandise: yup
            .boolean()
            .isTrue(
              'Mercancía Peligrosa: Se debe marcar que no se envían mercancías peligrosas'
            ),
          package_sizes: yup.object().shape({
            weight: yup
              .number()
              .required('Envío: Los datos del envío son requeridos')
              .max(16, 'Envío: Los datos del envío son requeridos'),
            width: yup
              .number()
              .required('Envío: Los datos del envío son requeridos')
              .max(60, 'Envío: Los datos del envío son requeridos'),
            height: yup
              .number()
              .required('Envío: Los datos del envío son requeridos')
              .max(60, 'Envío: Los datos del envío son requeridos'),
            length: yup
              .number()
              .required('Envío: Los datos del envío son requeridos')
              .max(60, 'Envío: Los datos del envío son requeridos'),
            volumetricWeight: yup
              .number()
              .max(16, 'Envío: Los datos del envío son requeridos'),
          }),
          shipping_service: yup.object().shape({
            codeDestination: yup
              .string()
              .required(
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              )
              .min(
                3,
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              ),
            codeOrigin: yup
              .string()
              .required(
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              )
              .min(
                3,
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              ),
            price: yup
              .number()
              .required(
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              ),
            service: yup
              .mixed()
              .oneOf(
                ['STANDARD', 'NEXT DAY'],
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              )
              .required(
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              ),
            sla: yup
              .number()
              .required(
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              ),
            weight: yup
              .number()
              .required(
                'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
              ),
          }),
          size: yup
            .mixed()
            .oneOf(
              ['XS', 'S', 'M', 'L'],
              'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
            )
            .required(
              'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
            ),
          tax: yup
            .number()
            .required(
              'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
            ),
          total_value: yup
            .number()
            .required(
              'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio'
            ),
          warranty: yup.boolean(),
          warranty_bill_number: yup.string().when('warranty', {
            is: true,
            then: yup
              .string()
              .matches(
                /^[a-zA-Z0-9]+$/,
                'Nº Boleta/Factura: El Nº de Boleta o la Factura es requerida'
              )
              .required(
                'Nº Boleta/Factura: El Nº de Boleta o la Factura es requerida'
              ),
          }),
          warranty_extended: yup.number(),
          warranty_value: yup
            .number()
            .required('Valor del Contenido: El valor es requerido')
            .min(1, 'Valor del Contenido: El valor es requerido'),
        })
      ),
      receiver: yup.object().shape({
        name: yup.string().required('Nombre: El nombre es requerido'),
        lastName: yup.string().required('Apellido: El apellido es requerido'),
        email: yup
          .string()
          .required('Correo Electrónico: El correo electrónico es requerido')
          .email(
            'Correo Electrónico: Formato de correo electrónico incorrecto'
          ),
        phone: yup
          .string()
          .required(
            'Teléfono: Formato de número incorrecto ej: +56981234567 o 981234567'
          )
          .matches(
            /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
            'Teléfono: Formato de número incorrecto ej: +56981234567 o 981234567'
          ),
        rut: yup
          .string()
          .validCompanyRut('RUT: El rut es incorrecto')
          .required('RUT: El rut es requerido'),
      }),
      refund: yup.object().shape({
        address: yup.object().shape({
          city: yup.string(),
          commune: yup.object().shape({
            base_name: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            name: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            code: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            base_post: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            zone: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
          }),
          complement: yup.string(),
          country: yup.string(),
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
            name: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            region_number: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            region_iso_3166: yup
              .string()
              .required('Remitente: La dirección de remitente es requerida'),
            country: yup
              .number()
              .required('Remitente: La dirección de remitente es requerida'),
          }),
          street: yup.string(),
          street_number: yup.string(),
        }),
        agency_id: yup.string().nullable(),
        agency_name: yup.string().nullable(),
        isPickup: yup.boolean(),
      }),
      save_frequent_client: yup.boolean(),
      save_frequent_origin: yup.boolean(),
      save_frequent_package: yup.boolean(),
      save_refund_address: yup.boolean(),
    })
  ),
  shipping_price: yup.number(),
  tax: yup.number(),
  total_price: yup.number(),
  warranty: yup.number(),
  emission_type: yup.string(),
});
