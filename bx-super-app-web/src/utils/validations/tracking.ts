import * as yup from 'yup';

export const trackingSearchValidation = yup.object().shape({
  os: yup.number().typeError('Debe ingresar solo números'),
});
