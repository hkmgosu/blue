import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import ShowPasswordButton from 'components/layout/show-password-button';
import {
  registerConfirmPasswordAtom,
  registerConfirmPasswordIsValidAtom,
} from 'atoms/register';
import { InputWithIcon, Label, Feedback } from 'components/ui-bx/forms';

const RegisterFormConfirmPassword: FC = () => {
  const [email, setConfirmPassword] = useAtom(registerConfirmPasswordAtom);
  const [validate] = useAtom(registerConfirmPasswordIsValidAtom);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor='confirm-password'>
        Confirma contraseña <Required>*</Required>
      </Label>
      <InputWithIcon
        type={showPassword ? 'text' : 'password'}
        name='confirm-password'
        id='confirm-password'
        placeholder='Introduce contraseña'
        value={email}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={validate.isValid === false}
        rightIcon={
          <ShowPasswordButton
            isActive={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        }
      />

      {!validate.isValid && (
        <Feedback type='invalid' isActive={validate.isValid === false}>
          {validate.error}
        </Feedback>
      )}
    </>
  );
};

const Required = styled.span`
  color: var(--bx-color-orange);
`;

export default RegisterFormConfirmPassword;
