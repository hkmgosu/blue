import { FC } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import { registerNameAtom, registerNameIsValidAtom } from 'atoms/register';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const RegisterFormName: FC = () => {
  const [name, setName] = useAtom(registerNameAtom);
  const [validate] = useAtom(registerNameIsValidAtom);

  return (
    <>
      <Label htmlFor='name'>
        Nombre <Required>*</Required>
      </Label>
      <Input
        type='text'
        name='name'
        maxLength={30}
        id='name'
        placeholder='Introduce un nombre'
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={validate.isValid === false}
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

export default RegisterFormName;
