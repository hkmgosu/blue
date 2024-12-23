import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Input, Label } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymePhone } from 'utils/validations/pyme-form';
import { isBillingEditableAtom, phoneAtom } from 'atoms/pyme-billing-info';
import styles from '../pyme-billing-info-form.module.scss';
import { useEffect } from 'react';
import { usePyme } from 'contexts/pyme/pyme-context';
function PymeFormPhone(): JSX.Element {
  const [phone, setPhone] = useAtom(phoneAtom);
  const [isEditable] = useAtom(isBillingEditableAtom);
  const { isValid, error } = useYupValidate(pymePhone, {
    phone,
  });
  const { defaultPyme } = usePyme();
  useEffect(() => {
    if (defaultPyme) {
      setPhone(defaultPyme?.billing_information?.phone || '');
    }
  }, [defaultPyme, setPhone]);
  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-phone'>
        Teléfono móvil <span className={styles.orange}>*</span>
      </Label>
      <Input
        type='text'
        name='pyme-phone'
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
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

export default PymeFormPhone;
