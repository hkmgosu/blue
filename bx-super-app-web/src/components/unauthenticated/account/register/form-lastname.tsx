import { FC } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import {
  registerLastnameAtom,
  registerLastnameIsValidAtom,
} from 'atoms/register';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const RegisterFormLastname: FC = () => {
  const [lastname, setLastname] = useAtom(registerLastnameAtom);
  const [validate] = useAtom(registerLastnameIsValidAtom);

  return (
    <>
      <Label htmlFor='lastname'>
        Apellido <Required>*</Required>
      </Label>
      <Input
        type='text'
        name='lastname'
        id='lastname'
        placeholder='Introduce un Apellido'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        error={validate.isValid === false}
        maxLength={30}
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

export default RegisterFormLastname;
