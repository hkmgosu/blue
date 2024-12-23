import * as yup from 'yup';

export const businessRefundSchema = yup.object().shape({});

export const businessRefundDeptoSchema = yup.object().shape({
  depto: yup.string().max(6, 'Máximo 6 caracteres'),
});

export const businessRefundOfficeSchema = yup.object().shape({
  office: yup.string().max(6, 'Máximo 6 caracteres'),
});
