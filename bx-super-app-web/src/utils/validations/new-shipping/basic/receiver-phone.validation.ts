import * as yup from 'yup';

export const receiverPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('El teléfono móvil es requerido')
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/,
      'Formato de número incorrecto ej: +56981234567 o 981234567'
    ),
});
