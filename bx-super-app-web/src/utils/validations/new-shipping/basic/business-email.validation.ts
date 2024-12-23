import * as yup from 'yup';

export const businessEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Correo no válido'),
});
