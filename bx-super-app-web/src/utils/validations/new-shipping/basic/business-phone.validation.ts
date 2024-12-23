import * as yup from 'yup';

export const businessPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
      'Formato de número incorrecto ej: +56981234567 o 981234567'
    ),
});
