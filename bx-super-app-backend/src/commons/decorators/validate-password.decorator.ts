import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PasswordValidation } from '../validations/schemas';

@ValidatorConstraint({ name: 'customText', async: false })
export class PasswordValidate implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(text: string, args: ValidationArguments) {
    return PasswordValidation.isValid(text);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Password is not valid';
  }
}
