import * as yup from 'yup';

export const packageBillNumberSchema = yup.object().shape({
  bill_number: yup
    .string()
    .required('Verifica que esté todo correcto')
    .matches(/^[a-zA-Z0-9]+$/, 'No se permiten caracteres especiales.'),
});
