import { FC } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';

import {
  newBusinessSocialReasonAtom,
  newBusinessSocialReasonIsValidAtom,
} from 'atoms/new-business';
import { Input, Label, Feedback } from 'components/ui-bx/forms';

const NewBusinessFormSocialReason: FC = () => {
  const [socialReason, setSocialReason] = useAtom(newBusinessSocialReasonAtom);
  const [validate] = useAtom(newBusinessSocialReasonIsValidAtom);

  return (
    <>
      <Label htmlFor='social_reason'>
        Razón Social <Required>*</Required>
      </Label>
      <Input
        type='text'
        name='social_reason'
        id='social_reason'
        placeholder='Nombre Comercial'
        value={socialReason}
        onChange={(e) => setSocialReason(e.target.value)}
        error={validate.isValid === false}
        maxLength={101}
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

export default NewBusinessFormSocialReason;
