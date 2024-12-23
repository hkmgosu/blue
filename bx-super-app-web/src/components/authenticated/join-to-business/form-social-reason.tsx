import { FC } from 'react';
import { useAtom } from 'jotai';

import {
  joinToBusinessSocialReasonAtom,
  joinToBusinessSocialReasonIsValidAtom,
} from 'atoms/join-to-business';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import styles from './form-social-reason.module.scss';

const JoinToBusinessFormSocialReason: FC = () => {
  const [socialReason, setSocialReason] = useAtom(
    joinToBusinessSocialReasonAtom
  );
  const [validate] = useAtom(joinToBusinessSocialReasonIsValidAtom);

  return (
    <>
      <Label htmlFor='social_reason'>
        Nombre Empresa <span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='social_reason'
        id='social_reason'
        placeholder='Nombre Comercial'
        value={socialReason}
        onChange={(e) => setSocialReason(e.target.value)}
        error={validate.isValid === false}
        maxLength={100}
      />
      {validate.isValid === false && (
        <Feedback type='invalid' isActive={validate.isValid === false}>
          {validate.error}
        </Feedback>
      )}
    </>
  );
};

export default JoinToBusinessFormSocialReason;
