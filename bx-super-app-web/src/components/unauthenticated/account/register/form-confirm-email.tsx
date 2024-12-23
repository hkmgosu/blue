import { FC } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import {
  registerConfirmEmailAtom,
  registerConfirmEmailIsValidAtom,
} from 'atoms/register';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const RegisterFormConfirmEmail: FC = () => {
  const [email, setEmail] = useAtom(registerConfirmEmailAtom);
  const [validate] = useAtom(registerConfirmEmailIsValidAtom);

  return (
    <>
      <Label htmlFor='confirm-email'>
        Confirma correo electrónico <Required>*</Required>
      </Label>
      <Input
        type='email'
        name='confirm-email'
        id='confirm-email'
        placeholder='ejemplo@mail.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={validate.isValid === false}
        maxLength={40}
      />
      {validate.isValid === false && (
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

export default RegisterFormConfirmEmail;
