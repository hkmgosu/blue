import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import ShowPasswordButton from 'components/layout/show-password-button';
import {
  registerPasswordAtom,
  registerPasswordIsValidAtom,
} from 'atoms/register';
import {
  InputWithIcon,
  Label,
  FormText,
  Feedback,
} from 'components/ui-bx/forms';

const RegisterFormPassword: FC = () => {
  const [email, setPassword] = useAtom(registerPasswordAtom);
  const [validate] = useAtom(registerPasswordIsValidAtom);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor='password'>
        Contraseña <Required>*</Required>
      </Label>
      <InputWithIcon
        type={showPassword ? 'text' : 'password'}
        name='password'
        id='password'
        placeholder='Introduce contraseña'
        value={email}
        error={validate.isValid === false}
        onChange={(e) => setPassword(e.target.value)}
        rightIcon={
          <ShowPasswordButton
            isActive={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        }
      />
      {!email.trim().length && (
        <FormText>
          Debe contener mayúscula o un número y ser mayor a 8 caracteres.
        </FormText>
      )}
      {!validate.isValid && (
        <Feedback isActive={!validate.isValid} type='invalid'>
          {validate.error}
        </Feedback>
      )}
    </>
  );
};

const Required = styled.span`
  color: var(--bx-color-orange);
`;

export default RegisterFormPassword;
