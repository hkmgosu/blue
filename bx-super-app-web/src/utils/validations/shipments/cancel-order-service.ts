import * as yup from 'yup';

export const orderServiceValidation = yup.object().shape({
  orderService: yup
    .string()
    .max(10, 'Orden de Seguimiento inválida')
    .required('Campo requerido'),
});

export const bankInformationValidationSchema = yup.object().shape({
  client_name: yup.string().required('Campo requerido'),
  last_name: yup.string().required('Campo requerido'),
  rut: yup.string().required('Campo requerido'),
  bank: yup.string().required('Campo requerido'),
  account_type: yup.string(),
  account_number: yup.string(),
});
