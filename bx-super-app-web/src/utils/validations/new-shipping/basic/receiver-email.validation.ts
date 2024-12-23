import * as yup from 'yup';

export const receiverEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Correo no válido'),
});
