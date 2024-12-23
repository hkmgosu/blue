import * as yup from 'yup';

export const packageContentSchema = yup.object().shape({
  content: yup.string().required('Verifica que esté todo correcto'),
});
