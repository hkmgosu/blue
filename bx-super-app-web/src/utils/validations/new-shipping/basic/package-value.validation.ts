import * as yup from 'yup';

export const packageValueSchema = yup.object().shape({
  package_value: yup.string().required(),
});
