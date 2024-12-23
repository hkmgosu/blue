import * as yup from 'yup';

export const receiverLastNameSchema = yup.object().shape({
  lastName: yup
    .string()
    .required('Verifica que esté todo correcto')
    .min(3, 'Verifica que esté todo correcto'),
});
