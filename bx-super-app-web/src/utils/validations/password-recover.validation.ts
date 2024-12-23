import * as yup from 'yup';

export const passwordRecoverSchema = yup.object().shape({
  email: yup.string().email().required(),
});
