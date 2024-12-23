import * as yup from 'yup';

export const receiverNameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Verifica que esté todo correcto')
    .min(3, 'Verifica que esté todo correcto')
    .max(30, 'Verifica que esté todo correcto'),
});
