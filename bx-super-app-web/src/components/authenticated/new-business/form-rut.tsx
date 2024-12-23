import { FC } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import {
  newBusinessRutAtom,
  newBusinessRutIsValidAtom,
} from 'atoms/new-business';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const NewBusinessFormRut: FC = () => {
  const [rut, setRut] = useAtom(newBusinessRutAtom);
  const [validate] = useAtom(newBusinessRutIsValidAtom);

  return (
    <>
      <Label htmlFor='business_rut'>
        Rut de la Empresa <Required>*</Required>
      </Label>
      <Input
        type='text'
        name='business_rut'
        id='business_rut'
        value={rut}
        onChange={(e) => setRut(e.target.value)}
        error={validate.isValid === false}
        placeholder='99.666.333-8'
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

export default NewBusinessFormRut;
