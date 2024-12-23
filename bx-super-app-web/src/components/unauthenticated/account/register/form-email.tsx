import { FC } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { registerEmailAtom, registerEmailIsValidAtom } from 'atoms/register';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const RegisterFormEmail: FC = () => {
  const [email, setEmail] = useAtom(registerEmailAtom);
  const [validate] = useAtom(registerEmailIsValidAtom);
  return (
    <>
      <Label htmlFor='email'>
        Correo electrónico <Required>*</Required>
      </Label>
      <Input
        type='email'
        name='email'
        id='email'
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

export default RegisterFormEmail;
