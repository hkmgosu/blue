import * as yup from 'yup';
import { validateRut } from '../helpers/rut.helper';

declare module 'yup' {
  export interface StringSchema {
    validRut(message?: string): StringSchema;
  }
}

yup.addMethod(
  yup.string,
  'validRut',
  function (this: yup.StringSchema, message: string) {
    return this.test('validRut', message, (value) => validateRut(value));
  },
);

export const SingleLoginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(10),
});

export const EmailValidation = yup.object().shape({
  email: yup.string().email().required(),
});

export const PasswordValidation = yup.object().shape({
  password: yup.string().required().min(10),
});

export const RutValidation = yup.object().shape({
  rut: yup.string().validRut().required(),
});
