import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Input, Label } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeEmail } from 'utils/validations/pyme-form';
import { emailAtom, isBillingEditableAtom } from 'atoms/pyme-billing-info';
import styles from '../pyme-billing-info-form.module.scss';
import { useEffect } from 'react';
import { usePyme } from 'contexts/pyme/pyme-context';
function PymeFormEmail(): JSX.Element {
  const [email, setEmail] = useAtom(emailAtom);
  const [isEditable] = useAtom(isBillingEditableAtom);

  const { isValid, error } = useYupValidate(pymeEmail, {
    email,
  });
  const { defaultPyme } = usePyme();
  useEffect(() => {
    if (defaultPyme) {
      setEmail(defaultPyme?.billing_information?.email || '');
    }
  }, [defaultPyme, setEmail]);

  return (
    <Col col='12'>
      <Label htmlFor='pyme-email'>
        Correo electrónico <span className={styles.orange}>*</span>
      </Label>
      <Input
        type='text'
        name='pyme-email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={!isEditable}
      />
      {!isValid && (
        <Feedback type={'invalid'} isActive>
          {error}
        </Feedback>
      )}
    </Col>
  );
}

export default PymeFormEmail;
