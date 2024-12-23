import * as yup from 'yup';

export const passwordSchema = yup.object().shape({
  password: yup.string().required().min(10),
});
