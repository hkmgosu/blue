import * as Joi from 'joi';
import { validateCompanyRut } from '../helpers/rut.helper';

const rutMethod = (value: string, helpers: Joi.CustomHelpers) => {
  if (value.length === 0) {
    return true;
  }
  const validate = validateCompanyRut(value);
  if (!validate) {
    return helpers.error('any.invalid');
  }
  return validate;
};

export const pymeRutSchema = Joi.object({
  rut: Joi.string().required().custom(rutMethod),
});

export const registerPymeV2Schema = Joi.object({
  social_reason: Joi.string().required(),
  rut: Joi.string().custom(rutMethod),
});

export const joinToPymeSchema = Joi.object({
  social_reason: Joi.string().required(),
});

export const registerPymeSchema = Joi.object({
  social_reason: Joi.string().required(),
  rut: Joi.string().custom(rutMethod),
  email: Joi.string().email().required(),
  collaborators: Joi.array().items(
    Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
    }).optional(),
  ),
});

export const updatePymeCollaboratorsSchema = Joi.object({
  rut: Joi.string().required().custom(rutMethod),
  collaborators: Joi.array().items(
    Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
    }).optional(),
  ),
});
